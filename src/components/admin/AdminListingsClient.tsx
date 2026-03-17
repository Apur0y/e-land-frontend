'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '@/lib/api';
import { Loader2, Search, CheckCircle, Star, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminListingsClient() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-listings', search, page, statusFilter],
    queryFn: () => adminAPI.listings({ search, page, limit: 20, status: statusFilter }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: any) => adminAPI.updateListing(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-listings'] }); toast.success('Updated'); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => adminAPI.deleteListing(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-listings'] }); toast.success('Deleted'); },
    onError: () => toast.error('Failed'),
  });

  const lands = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display font-bold text-2xl text-white">Listings</h1>
        <div className="flex items-center gap-3">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="input py-2 text-sm w-36">
            <option value="">All Status</option>
            <option value="for_sale">For Sale</option>
            <option value="sold">Sold</option>
            <option value="for_lease">For Lease</option>
          </select>
          <div className="flex items-center gap-3 bg-surface-card border border-surface-border rounded-xl px-4 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search listings..." className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-40" />
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-brand-400 animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface">
                  {['Title', 'Owner', 'Price', 'Type', 'Status', 'Flags', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lands.map((land: any) => (
                  <tr key={land._id} className="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors">
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-medium text-white truncate">{land.title}</p>
                      <p className="text-xs text-gray-500">{land.location?.city}, {land.location?.district}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs">{land.owner?.name}</td>
                    <td className="py-3 px-4 text-brand-400 font-medium whitespace-nowrap">৳{land.price?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-400 capitalize">{land.landType}</td>
                    <td className="py-3 px-4">
                      <select value={land.status}
                        onChange={e => updateMut.mutate({ id: land._id, data: { status: e.target.value } })}
                        className="bg-surface border border-surface-border rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value="for_sale">For Sale</option>
                        <option value="for_lease">For Lease</option>
                        <option value="sold">Sold</option>
                        <option value="off_market">Off Market</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1.5">
                        <button onClick={() => updateMut.mutate({ id: land._id, data: { isVerified: !land.isVerified } })}
                          title="Toggle verified"
                          className={`w-6 h-6 rounded flex items-center justify-center transition-all ${land.isVerified ? 'text-brand-400' : 'text-gray-600 hover:text-brand-400'}`}>
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateMut.mutate({ id: land._id, data: { isFeatured: !land.isFeatured } })}
                          title="Toggle featured"
                          className={`w-6 h-6 rounded flex items-center justify-center transition-all ${land.isFeatured ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}>
                          <Star className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(land.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/listings/${land.slug}`} target="_blank"
                          className="w-7 h-7 rounded-lg flex items-center justify-center border border-surface-border hover:border-brand-700 transition-all">
                          <Eye className="w-3.5 h-3.5 text-gray-400" />
                        </Link>
                        <button onClick={() => { if(confirm('Delete listing?')) deleteMut.mutate(land._id); }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center border border-surface-border hover:border-red-700 transition-all">
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Showing {lands.length} of {pagination.total} listings</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border border-surface-border disabled:opacity-40 hover:border-brand-700 transition-all">← Prev</button>
            <span className="px-3 py-1.5">Page {page} of {pagination.pages}</span>
            <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
              className="px-3 py-1.5 rounded-lg border border-surface-border disabled:opacity-40 hover:border-brand-700 transition-all">Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}
