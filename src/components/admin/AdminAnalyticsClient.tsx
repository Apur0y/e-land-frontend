'use client';
import { useQuery } from '@tanstack/react-query';
import { adminAPI } from '@/lib/api';
import { Loader2, TrendingUp, Users, Brain, MapPin, DollarSign, Activity } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

export default function AdminAnalyticsClient() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: () => adminAPI.dashboard(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-96">
      <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
    </div>
  );

  const stats = data?.data?.data;
  if (!stats) return null;

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const userGrowth = stats.charts.monthlyUsers.map((m: any) => ({
    month: monthNames[m._id.month - 1], users: m.count,
  }));
  const listingGrowth = stats.charts.monthlyListings.map((m: any) => ({
    month: monthNames[m._id.month - 1], listings: m.count,
  }));
  const combined = monthNames.slice(0, Math.max(userGrowth.length, listingGrowth.length)).map((_, i) => ({
    month: userGrowth[i]?.month || listingGrowth[i]?.month || monthNames[i],
    users: userGrowth[i]?.users || 0,
    listings: listingGrowth[i]?.listings || 0,
  }));

  const typeData = stats.charts.landsByType.map((t: any) => ({ name: t._id, value: t.count }));
  const statusData = stats.charts.landsByStatus.map((s: any) => ({ name: s._id?.replace('_', ' '), value: s.count }));

  const kpiCards = [
    {
      label: 'Total Revenue Potential',
      value: '৳—',
      sub: 'Based on active listings',
      icon: DollarSign,
      color: 'text-brand-400',
      bg: 'bg-brand-950 border-brand-900',
    },
    {
      label: 'Platform Activity',
      value: `${stats.totals.reports + stats.totals.inquiries}`,
      sub: 'Total AI reports + inquiries',
      icon: Activity,
      color: 'text-blue-400',
      bg: 'bg-blue-950 border-blue-900',
    },
    {
      label: 'AI Usage Today',
      value: '—',
      sub: 'Reports generated today',
      icon: Brain,
      color: 'text-purple-400',
      bg: 'bg-purple-950 border-purple-900',
    },
    {
      label: 'Conversion Rate',
      value: stats.totals.inquiries && stats.totals.lands
        ? `${((stats.totals.inquiries / stats.totals.lands) * 100).toFixed(1)}%`
        : '—',
      sub: 'Inquiries per listing',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950 border-emerald-900',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Analytics</h1>
        <p className="text-gray-500 text-sm">Platform-wide performance metrics</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map(card => (
          <div key={card.label} className="stat-card">
            <div className={`w-9 h-9 rounded-xl border ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-sm font-medium text-white">{card.label}</p>
            <p className="text-xs text-gray-600">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Combined growth chart */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-400" /> Growth Overview (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={combined}>
            <defs>
              <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="listingsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2736" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }} />
            <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fill="url(#usersGrad)" name="New Users" />
            <Area type="monotone" dataKey="listings" stroke="#22c55e" strokeWidth={2} fill="url(#listingsGrad)" name="New Listings" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-white mb-4">Listings by Type</h3>
          {typeData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={typeData} cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={3} dataKey="value">
                    {typeData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-1">
                {typeData.map((t: any, i: number) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="capitalize">{t.name}</span> ({t.value})
                  </div>
                ))}
              </div>
            </>
          ) : <p className="text-gray-500 text-center py-12">No data yet</p>}
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-white mb-4">Listings by Status</h3>
          {statusData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={statusData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2736" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {statusData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : <p className="text-gray-500 text-center py-12">No data yet</p>}
        </div>
      </div>

      {/* Summary table */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4">Platform Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: stats.totals.users, icon: Users },
            { label: 'Active Listings', value: stats.totals.lands, icon: MapPin },
            { label: 'AI Reports', value: stats.totals.reports, icon: Brain },
            { label: 'Total Inquiries', value: stats.totals.inquiries, icon: Activity },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-surface-border">
              <item.icon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xl font-bold text-white">{item.value?.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
