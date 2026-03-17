'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '@/lib/api';
import { Loader2, Search, UserCheck, UserX, Crown, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsersClient() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', search, page],
    queryFn: () => adminAPI.users({ search, page, limit: 20 }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: any) => adminAPI.updateUser(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-users'] }); toast.success('User updated'); },
    onError: () => toast.error('Update failed'),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => adminAPI.deleteUser(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-users'] }); toast.success('User deactivated'); },
    onError: () => toast.error('Failed'),
  });

  const users = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl text-white">Users</h1>
        <div className="flex items-center gap-3 bg-surface-card border border-surface-border rounded-xl px-4 py-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search users..." className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-48" />
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
                  {['User', 'Role', 'Plan', 'AI Credits', 'Status', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user._id} className="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-xs font-bold text-brand-200 flex-shrink-0">
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select value={user.role}
                        onChange={e => updateMut.mutate({ id: user._id, data: { role: e.target.value } })}
                        className="bg-surface border border-surface-border rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value="user">User</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select value={user.plan}
                        onChange={e => updateMut.mutate({ id: user._id, data: { plan: e.target.value } })}
                        className="bg-surface border border-surface-border rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value="free">Free</option>
                        <option value="pro">Pro</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs">
                      {user.aiCreditsUsed}/{user.aiCreditsLimit}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge text-xs ${user.isActive ? 'badge-green' : 'badge-red'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateMut.mutate({ id: user._id, data: { isActive: !user.isActive } })}
                          className="w-7 h-7 rounded-lg flex items-center justify-center border border-surface-border hover:border-brand-700 transition-all"
                          title={user.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {user.isActive ? <UserX className="w-3.5 h-3.5 text-red-400" /> : <UserCheck className="w-3.5 h-3.5 text-brand-400" />}
                        </button>
                        <button onClick={() => updateMut.mutate({ id: user._id, data: { aiCreditsLimit: 100, plan: 'pro' } })}
                          className="w-7 h-7 rounded-lg flex items-center justify-center border border-surface-border hover:border-yellow-700 transition-all"
                          title="Upgrade to Pro"
                        >
                          <Crown className="w-3.5 h-3.5 text-yellow-400" />
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

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Showing {users.length} of {pagination.total} users</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border border-surface-border hover:border-brand-700 disabled:opacity-40 transition-all">← Prev</button>
            <span className="px-3 py-1.5">Page {page} of {pagination.pages}</span>
            <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
              className="px-3 py-1.5 rounded-lg border border-surface-border hover:border-brand-700 disabled:opacity-40 transition-all">Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}
