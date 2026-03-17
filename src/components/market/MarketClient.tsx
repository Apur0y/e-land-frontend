'use client';
import { useQuery } from '@tanstack/react-query';
import { landAPI } from '@/lib/api';
import { Loader2, TrendingUp, MapPin, BarChart3, Home } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899'];

export default function MarketClient() {
  const { data, isLoading } = useQuery({
    queryKey: ['market-stats'],
    queryFn: () => landAPI.stats(),
    staleTime: 5 * 60 * 1000,
  });

  const stats = data?.data?.data;

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
    </div>
  );

  const cityData = stats?.cityStats?.map((c: any) => ({ name: c._id, listings: c.count, avgPrice: Math.round(c.avgPrice) })) || [];
  const typeData = stats?.typeStats?.map((t: any) => ({ name: t._id, value: t.count })) || [];

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Listings', value: stats?.totalListings?.toLocaleString() || '0', icon: MapPin, color: 'text-brand-400', bg: 'bg-brand-950 border-brand-900' },
          { label: 'Available for Sale', value: stats?.forSale?.toLocaleString() || '0', icon: Home, color: 'text-blue-400', bg: 'bg-blue-950 border-blue-900' },
          { label: 'Sold Properties', value: stats?.sold?.toLocaleString() || '0', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-950 border-emerald-900' },
          { label: 'Avg. Price', value: stats?.priceStats?.avgPrice ? `৳${Math.round(stats.priceStats.avgPrice / 100000).toLocaleString()}L` : 'N/A', icon: BarChart3, color: 'text-yellow-400', bg: 'bg-yellow-950 border-yellow-900' },
        ].map(card => (
          <div key={card.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl border ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Listings by city */}
        <div className="card p-5">
          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-400" /> Listings by City
          </h3>
          {cityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={cityData} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2736" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }}
                  formatter={(v: any, n: string) => [v, n === 'listings' ? 'Listings' : 'Avg Price']} />
                <Bar dataKey="listings" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-600">No data yet</div>
          )}
        </div>

        {/* Listings by type */}
        <div className="card p-5">
          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-400" /> Listings by Type
          </h3>
          {typeData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={typeData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3} dataKey="value">
                    {typeData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {typeData.map((t: any, i: number) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="capitalize">{t.name}</span>
                    <span className="text-gray-600">({t.value})</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-600">No data yet</div>
          )}
        </div>
      </div>

      {/* City price table */}
      {cityData.length > 0 && (
        <div className="card p-5">
          <h3 className="font-bold text-white mb-5">Average Prices by City</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  {['City', 'Listings', 'Avg. Price', 'Action'].map(h => (
                    <th key={h} className="text-left py-2.5 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cityData.map((city: any, i: number) => (
                  <tr key={i} className="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors">
                    <td className="py-3 px-3 font-medium text-white">{city.name}</td>
                    <td className="py-3 px-3 text-gray-400">{city.listings}</td>
                    <td className="py-3 px-3 text-brand-400 font-medium">
                      {city.avgPrice ? `৳${Math.round(city.avgPrice).toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3 px-3">
                      <Link href={`/listings?city=${encodeURIComponent(city.name)}`}
                        className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                        Browse →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Investment zones banner */}
      <div className="card p-6 bg-gradient-to-r from-brand-950 to-surface-card border-brand-900">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-8 h-8 text-brand-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-white text-lg mb-2">Want AI-Powered Area Predictions?</h3>
            <p className="text-gray-400 text-sm mb-4">
              Our AI can predict which areas will see the highest growth over the next 5 years based on infrastructure development, government projects, and economic indicators.
            </p>
            <Link href="/ai/price-prediction" className="btn-primary text-sm">
              Run Price Prediction
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
