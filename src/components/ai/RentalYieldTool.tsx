'use client';
import { useState } from 'react';
import { aiAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { BarChart3, Loader2, Sparkles, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RentalYieldTool() {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    city: '', district: '', area: '', areaUnit: 'katha',
    landType: 'residential', purchasePrice: '', constructionCost: '',
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login'); return; }
    if (!form.city || !form.area || !form.purchasePrice) { toast.error('Fill required fields'); return; }
    setLoading(true);
    try {
      const res = await aiAPI.rentalYield({
        city: form.city, district: form.district, area: Number(form.area),
        areaUnit: form.areaUnit, landType: form.landType,
        purchasePrice: Number(form.purchasePrice),
        constructionCost: form.constructionCost ? Number(form.constructionCost) : undefined,
      });
      setResult(res.data.yieldData);
      toast.success('Yield calculation ready!');
    } catch (err: any) { toast.error(err.response?.data?.message || 'Failed'); }
    setLoading(false);
  };

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
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <h2 className="font-bold text-white">Property Details</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">City *</label>
            <input value={form.city} onChange={e => set('city', e.target.value)} className="input" placeholder="Dhaka" required />
          </div>
          <div>
            <label className="label">District</label>
            <input value={form.district} onChange={e => set('district', e.target.value)} className="input" placeholder="Dhaka" />
          </div>
          <div>
            <label className="label">Area *</label>
            <input value={form.area} onChange={e => set('area', e.target.value)} className="input" type="number" placeholder="5" required />
          </div>
          <div>
            <label className="label">Unit</label>
            <select value={form.areaUnit} onChange={e => set('areaUnit', e.target.value)} className="input">
              {['katha', 'decimal', 'bigha', 'sqft', 'sqm'].map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Land Type</label>
            <select value={form.landType} onChange={e => set('landType', e.target.value)} className="input">
              {['residential', 'commercial', 'mixed'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Purchase Price (৳) *</label>
            <input value={form.purchasePrice} onChange={e => set('purchasePrice', e.target.value)} className="input" type="number" placeholder="5000000" required />
          </div>
          <div className="col-span-2">
            <label className="label">Construction Cost (৳) <span className="text-gray-600 font-normal">— optional, if you plan to build</span></label>
            <input value={form.constructionCost} onChange={e => set('constructionCost', e.target.value)} className="input" type="number" placeholder="3000000" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Calculating...</> : <><Sparkles className="w-4 h-4" /> Calculate Rental Yield</>}
        </button>
      </form>

      {result && (
        <div className="space-y-4">
          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Monthly Rent', value: `৳${result.estimatedMonthlyRent?.toLocaleString()}`, color: 'text-brand-400' },
              { label: 'Gross Yield', value: `${result.grossRentalYield?.toFixed(1)}%`, color: 'text-blue-400' },
              { label: 'Net Yield', value: `${result.netRentalYield?.toFixed(1)}%`, color: 'text-emerald-400' },
              { label: 'Payback', value: `${result.paybackPeriod?.toFixed(0)} yrs`, color: 'text-yellow-400' },
            ].map(m => (
              <div key={m.label} className="card p-4 text-center">
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Cash flow */}
          <div className="card p-5">
            <h3 className="font-bold text-white mb-4">Annual Cash Flow</h3>
            <div className="space-y-2">
              {[
                { label: 'Gross Annual Rent', value: result.estimatedAnnualRent, color: 'text-brand-400' },
                { label: 'Maintenance', value: -result.annualExpenses?.maintenance, color: 'text-red-400' },
                { label: 'Property Tax', value: -result.annualExpenses?.tax, color: 'text-red-400' },
                { label: 'Insurance', value: -result.annualExpenses?.insurance, color: 'text-red-400' },
                { label: 'Management Fee', value: -result.annualExpenses?.management, color: 'text-red-400' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-surface-border last:border-0">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className={`font-medium text-sm ${item.color}`}>
                    {item.value < 0 ? '-' : ''}৳{Math.abs(item.value || 0).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-white">Net Annual Income</span>
                <span className="font-bold text-brand-400 text-lg">৳{result.cashflow?.annual?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Comparison */}
          {result.comparison && (
            <div className="card p-5">
              <h3 className="font-bold text-white mb-3">Investment Comparison</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(result.comparison).map(([k, v]: any) => (
                  <div key={k} className="flex items-start gap-2">
                    <span className="text-brand-400 mt-0.5 flex-shrink-0">vs</span>
                    <span className="text-gray-300">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.recommendation && (
            <div className="card p-4 bg-brand-950 border-brand-900">
              <p className="text-xs text-gray-400 mb-1">AI Recommendation</p>
              <p className="text-sm text-brand-300">{result.recommendation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
