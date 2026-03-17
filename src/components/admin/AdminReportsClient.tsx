'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminAPI } from '@/lib/api';
import { Loader2, Brain, FileText } from 'lucide-react';

const typeColors: any = {
  full_analysis: 'badge-green',
  price_prediction: 'badge-blue',
  risk_assessment: 'badge-yellow',
  comparison: 'bg-purple-950 text-purple-400 border-purple-800 badge',
  roi_calculator: 'bg-orange-950 text-orange-400 border-orange-800 badge',
};

export default function AdminReportsClient() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['admin-reports', page],
    queryFn: () => adminAPI.reports({ page, limit: 20 }),
  });

  const reports = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-5">
      <h1 className="font-display font-bold text-2xl text-white">AI Reports</h1>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-brand-400 animate-spin" /></div>
        ) : reports.length === 0 ? (
          <div className="text-center py-16">
            <Brain className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No AI reports generated yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface">
                  {['Report', 'User', 'Type', 'Property', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r: any) => (
                  <tr key={r._id} className="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-brand-950 border border-brand-900 flex items-center justify-center flex-shrink-0">
                          <Brain className="w-3.5 h-3.5 text-brand-400" />
                        </div>
                        <p className="text-white font-medium text-xs line-clamp-1 max-w-xs">{r.title}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-gray-300 text-xs">{r.user?.name}</p>
                      <p className="text-gray-600 text-xs">{r.user?.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge text-xs capitalize ${typeColors[r.type] || 'badge-green'}`}>
                        {r.type?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs">
                      {r.land?.title ? r.land.title.substring(0, 25) + '...' : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge text-xs ${r.status === 'completed' ? 'badge-green' : r.status === 'failed' ? 'badge-red' : 'badge-yellow'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString()}
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
          <span>Showing {reports.length} of {pagination.total} reports</span>
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
