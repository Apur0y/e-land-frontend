'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '@/lib/api';
import { Loader2, MessageCircle, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminInquiriesClient() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-inquiries', page, statusFilter],
    queryFn: () => adminAPI.inquiries({ page, limit: 20, status: statusFilter }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: any) => adminAPI.updateInquiry(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-inquiries'] }); toast.success('Inquiry updated'); },
    onError: () => toast.error('Update failed'),
  });

  const inquiries = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display font-bold text-2xl text-white">Inquiries</h1>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="input py-2 text-sm w-40">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-brand-400 animate-spin" /></div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface">
                  {['From', 'Property', 'Type', 'Budget', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq: any) => (
                  <tr key={inq._id} className="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-white">{inq.name}</p>
                      <p className="text-xs text-gray-500">{inq.email}</p>
                      {inq.phone && <p className="text-xs text-gray-600">{inq.phone}</p>}
                    </td>
                    <td className="py-3 px-4">
                      {inq.land ? (
                        <Link href={`/listings/${inq.land.slug}`} target="_blank"
                          className="text-brand-400 hover:text-brand-300 text-xs flex items-center gap-1">
                          {inq.land.title?.substring(0, 30)}...
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : <span className="text-gray-600 text-xs">—</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge text-xs capitalize ${
                        inq.type === 'buy' ? 'badge-green' :
                        inq.type === 'lease' ? 'badge-blue' :
                        inq.type === 'visit' ? 'badge-yellow' : 'bg-gray-800 text-gray-400 border-gray-700 badge'
                      }`}>{inq.type}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs">
                      {inq.budget ? `৳${Number(inq.budget).toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <select value={inq.status}
                        onChange={e => updateMut.mutate({ id: inq._id, data: { status: e.target.value } })}
                        className="bg-surface border border-surface-border rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <a href={`mailto:${inq.email}?subject=Re: ${inq.land?.title || 'Property Inquiry'}`}
                        className="btn-secondary text-xs py-1 px-3">
                        Reply
                      </a>
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
          <span>Showing {inquiries.length} of {pagination.total}</span>
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
