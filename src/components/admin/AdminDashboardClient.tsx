'use client';
import { useQuery } from '@tanstack/react-query';
import { adminAPI } from '@/lib/api';
import { Loader2, Users, MapPin, FileText, MessageCircle, TrendingUp, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

export default function AdminDashboardClient() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => adminAPI.dashboard(),
    refetchInterval: 60000,
  });

  const stats = data?.data?.data;

  if (isLoading) return (
    <div className="flex items-center justify-center h-96">
      <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
    </div>
  );

  if (!stats) return null;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const userGrowthData = stats.charts.monthlyUsers.map((m: any) => ({
    month: monthNames[m._id.month - 1],
    users: m.count,
  }));
  const listingGrowthData = stats.charts.monthlyListings.map((m: any) => ({
    month: monthNames[m._id.month - 1],
    listings: m.count,
  }));
  const typeData = stats.charts.landsByType.map((t: any) => ({
    name: t._id, value: t.count
  }));

  const statCards = [
    { label: 'Total Users', value: stats.totals.users, today: stats.today.users, icon: Users, color: 'text-blue-400', bg: 'bg-blue-950 border-blue-900' },
    { label: 'Total Listings', value: stats.totals.lands, today: stats.today.lands, icon: MapPin, color: 'text-brand-400', bg: 'bg-brand-950 border-brand-900' },
    { label: 'AI Reports', value: stats.totals.reports, today: 0, icon: Brain, color: 'text-purple-400', bg: 'bg-purple-950 border-purple-900' },
    { label: 'Inquiries', value: stats.totals.inquiries, today: stats.today.inquiries, icon: MessageCircle, color: 'text-yellow-400', bg: 'bg-yellow-950 border-yellow-900' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleTimeString()}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl border ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
              </div>
              {card.today > 0 && (
                <span className="badge-green text-xs">+{card.today} today</span>
              )}
            </div>
            <p className="text-3xl font-bold text-white">{card.value?.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User growth */}
        <div className="card p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" /> User Growth
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2736" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Listings growth */}
        <div className="card p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-400" /> Listings Growth
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={listingGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2736" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }} />
              <Line type="monotone" dataKey="listings" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Land types pie */}
        <div className="card p-5">
          <h3 className="font-bold text-white mb-4">Listings by Type</h3>
          {typeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {typeData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500 text-sm py-8 text-center">No data yet</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            {typeData.map((t: any, i: number) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="capitalize">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent users */}
        <div className="card p-5">
          <h3 className="font-bold text-white mb-4">Recent Users</h3>
          <div className="space-y-3">
            {stats.recent.users?.map((u: any) => (
              <div key={u._id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-xs font-bold text-brand-200 flex-shrink-0">
                  {u.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{u.name}</p>
                  <p className="text-xs text-gray-500 truncate">{u.email}</p>
                </div>
                <span className={`badge text-xs capitalize ${u.plan === 'pro' ? 'badge-green' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>{u.plan}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent inquiries */}
        <div className="card p-5">
          <h3 className="font-bold text-white mb-4">Recent Inquiries</h3>
          <div className="space-y-3">
            {stats.recent.inquiries?.map((inq: any) => (
              <div key={inq._id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-950 border border-yellow-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{inq.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{inq.type} · {inq.land?.title?.substring(0, 20)}...</p>
                </div>
                <span className={`badge text-xs capitalize ${inq.status === 'new' ? 'badge-blue' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>{inq.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent listings table */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">Recent Listings</h3>
          <a href="/admin/listings" className="text-sm text-brand-400 hover:text-brand-300">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border">
                {['Title', 'Owner', 'Price', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recent.listings?.map((land: any) => (
                <tr key={land._id} className="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors">
                  <td className="py-3 px-3 text-white font-medium max-w-xs truncate">{land.title}</td>
                  <td className="py-3 px-3 text-gray-400">{land.owner?.name}</td>
                  <td className="py-3 px-3 text-brand-400 font-medium">৳{land.price?.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className={`badge text-xs capitalize ${land.status === 'for_sale' ? 'badge-green' : land.status === 'sold' ? 'badge-red' : 'badge-yellow'}`}>
                      {land.status?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">{new Date(land.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
