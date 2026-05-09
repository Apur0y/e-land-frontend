'use client';
import { useState } from 'react';
import { aiAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { TrendingUp, Loader2, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PricePredictionTool() {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    city: '', district: 'Dhaka', area: '', areaUnit: 'katha', landType: 'residential',
    currentPrice: '', roadAccess: false, floodZone: false, nearGovtProject: false,
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login'); return; }
    if (!form.city || !form.area || !form.currentPrice) { toast.error('Fill required fields'); return; }
    setLoading(true);
    try {
      const res = await aiAPI.pricePrediction({
        city: form.city, district: form.district, area: Number(form.area), areaUnit: form.areaUnit,
        landType: form.landType, currentPrice: Number(form.currentPrice),
        features: { roadAccess: form.roadAccess, floodZone: form.floodZone, nearGovtProject: form.nearGovtProject }
      });
      setResult(res.data.prediction);
      toast.success('Prediction ready!');
    } catch (err: any) { toast.error(err.response?.data?.message || 'Failed'); }
    setLoading(false);
  };

  const chartData = result ? [
    { year: 'Now', price: result.currentMarketValue },
    { year: 'Y1', price: result.predictions?.year1?.price },
    { year: 'Y2', price: result.predictions?.year2?.price },
    { year: 'Y3', price: result.predictions?.year3?.price },
    { year: 'Y4', price: result.predictions?.year4?.price },
    { year: 'Y5', price: result.predictions?.year5?.price },
  ] : [];

  if (!isAuthenticated) return (
    <div className="card p-10 text-center">
      <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <h3 className="font-bold text-white text-xl mb-2">Login Required</h3>
      <div className="flex gap-3 justify-center">
        <Link href="/register" className="btn-primary">Create Free Account</Link>
        <Link href="/login" className="btn-secondary">Sign In</Link>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h2 className="font-bold text-white">Land Details</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">City *</label>
            <input value={form.city} onChange={e => set('city', e.target.value)} className="input" placeholder="e.g. Dhaka" required />
          </div>
          <div>
            <label className="label">District</label>
            <input value={form.district} onChange={e => set('district', e.target.value)} className="input" placeholder="e.g. Dhaka" />
          </div>
          <div>
            <label className="label">Area *</label>
            <input value={form.area} onChange={e => set('area', e.target.value)} className="input" type="number" placeholder="5" required />
          </div>
          <div>
            <label className="label">Unit</label>
            <select value={form.areaUnit} onChange={e => set('areaUnit', e.target.value)} className="input">
              {['katha', 'decimal', 'bigha', 'sqft', 'sqm', 'acre'].map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Land Type</label>
            <select value={form.landType} onChange={e => set('landType', e.target.value)} className="input">
              {['residential', 'commercial', 'agricultural', 'industrial', 'mixed'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Current Price (৳) *</label>
            <input value={form.currentPrice} onChange={e => set('currentPrice', e.target.value)} className="input" type="number" placeholder="5000000" required />
          </div>
        </div>
        <div className="flex gap-4">
          {[{ k: 'roadAccess', l: 'Road Access' }, { k: 'floodZone', l: 'Flood Zone' }, { k: 'nearGovtProject', l: 'Near Govt Project' }].map(({ k, l }) => (
            <label key={k} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-all ${(form as any)[k] ? 'bg-brand-950 border-brand-700 text-brand-300' : 'border-surface-border text-gray-400'}`}>
              <input type="checkbox" checked={(form as any)[k]} onChange={e => set(k, e.target.checked)} className="hidden" />
              {l}
            </label>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Predicting...</> : <><Sparkles className="w-4 h-4" /> Generate 5-Year Prediction</>}
        </button>
      </form>

      {result && (
        <div className="space-y-5">
          {/* Chart */}
          <div className="card p-5">
            <h3 className="font-bold text-white mb-4">Price Projection (৳)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2736" />
                <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }}
                  formatter={(v: any) => [`৳${Number(v).toLocaleString()}`, 'Price']} />
                <Area type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} fill="url(#priceGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Year by year breakdown */}
          <div className="card p-5">
            <h3 className="font-bold text-white mb-4">Year-by-Year Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(result.predictions || {}).map(([yr, data]: any) => (
                <div key={yr} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                  <span className="text-gray-400 capitalize">{yr.replace('year', 'Year ')}</span>
                  <div className="text-right">
                    <p className="font-bold text-white">৳{data.price?.toLocaleString()}</p>
                    <p className="text-xs text-brand-400">+{data.growth?.toFixed(1)}% from now</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-brand-400">{result.cagr?.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">CAGR</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-lg font-bold text-white capitalize">{result.confidenceLevel}</p>
              <p className="text-xs text-gray-500 mt-1">Confidence</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-lg font-bold text-blue-400 capitalize">{result.marketOutlook?.split(' ').slice(0, 2).join(' ')}</p>
              <p className="text-xs text-gray-500 mt-1">Market Trend</p>
            </div>
          </div>

          {result.keyDrivers?.length > 0 && (
            <div className="card p-5">
              <h3 className="font-semibold text-white mb-3">Key Growth Drivers</h3>
              <ul className="space-y-2">
                {result.keyDrivers.map((d: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-brand-400 mt-0.5">↑</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
