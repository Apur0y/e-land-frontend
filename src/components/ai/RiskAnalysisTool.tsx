'use client';
import { useState } from 'react';
import { aiAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Shield, Loader2, AlertTriangle, CheckCircle, XCircle, Sparkles, Lock } from 'lucide-react';
import Link from 'next/link';

const sev: any = {
  low: { badge: 'badge-green', icon: CheckCircle },
  medium: { badge: 'badge-yellow', icon: AlertTriangle },
  high: { badge: 'badge-red', icon: XCircle },
};

export default function RiskAnalysisTool() {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    address: '', city: '', district: 'Dhaka', area: '', areaUnit: 'katha',
    landType: 'residential', price: '', roadAccess: false, floodZone: false, nearGovtProject: false,
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login'); return; }
    setLoading(true);
    try {
      const res = await aiAPI.riskAnalysis({
        location: { address: form.address, city: form.city, district: form.district },
        features: { roadAccess: form.roadAccess, floodZone: form.floodZone, nearGovtProject: form.nearGovtProject },
        landType: form.landType, price: Number(form.price), area: `${form.area} ${form.areaUnit}`,
      });
      setResult(res.data.riskData);
      toast.success('Risk analysis complete!');
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

  const overallColors: any = { low: 'text-brand-400', medium: 'text-yellow-400', high: 'text-orange-400', very_high: 'text-red-400' };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-yellow-400" />
          <h2 className="font-bold text-white">Enter Land Details</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="label">Address</label>
            <input value={form.address} onChange={e => set('address', e.target.value)} className="input" placeholder="Plot 5, Road 3, Dhanmondi" />
          </div>
          <div>
            <label className="label">City *</label>
            <input value={form.city} onChange={e => set('city', e.target.value)} className="input" placeholder="Dhaka" required />
          </div>
          <div>
            <label className="label">District</label>
            <input value={form.district} onChange={e => set('district', e.target.value)} className="input" />
          </div>
          <div>
            <label className="label">Area</label>
            <input value={form.area} onChange={e => set('area', e.target.value)} className="input" type="number" placeholder="5" />
          </div>
          <div>
            <label className="label">Unit</label>
            <select value={form.areaUnit} onChange={e => set('areaUnit', e.target.value)} className="input">
              {['katha', 'decimal', 'bigha', 'sqft'].map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Land Type</label>
            <select value={form.landType} onChange={e => set('landType', e.target.value)} className="input">
              {['residential', 'commercial', 'agricultural', 'industrial'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Price (৳)</label>
            <input value={form.price} onChange={e => set('price', e.target.value)} className="input" type="number" placeholder="5000000" />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {[{ k: 'roadAccess', l: 'Road Access' }, { k: 'floodZone', l: '⚠️ Flood Zone' }, { k: 'nearGovtProject', l: 'Near Govt Project' }].map(({ k, l }) => (
            <label key={k} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-all ${(form as any)[k] ? 'bg-brand-950 border-brand-700 text-brand-300' : 'border-surface-border text-gray-400'}`}>
              <input type="checkbox" checked={(form as any)[k]} onChange={e => set(k, e.target.checked)} className="hidden" />
              {l}
            </label>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Risks...</> : <><Sparkles className="w-4 h-4" /> Run Risk Analysis</>}
        </button>
      </form>

      {result && (
        <div className="space-y-5">
          {/* Overall risk */}
          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Overall Risk Level</p>
              <p className={`font-bold text-2xl capitalize ${overallColors[result.overallRiskLevel] || 'text-yellow-400'}`}>
                {result.overallRiskLevel?.replace('_', ' ')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{result.safetyScore}</p>
              <p className="text-xs text-gray-500">Safety Score / 100</p>
            </div>
          </div>

          {/* Individual risks */}
          {result.risks?.length > 0 && (
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4">Risk Breakdown</h3>
              <div className="space-y-3">
                {result.risks.map((risk: any, i: number) => {
                  const s = sev[risk.severity] || sev.medium;
                  return (
                    <div key={i} className="bg-surface rounded-xl p-4 border border-surface-border">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <s.icon className={`w-4 h-4 flex-shrink-0 ${s.badge.includes('green') ? 'text-brand-400' : s.badge.includes('yellow') ? 'text-yellow-400' : 'text-red-400'}`} />
                          <p className="font-medium text-white text-sm">{risk.name}</p>
                        </div>
                        <span className={`badge ${s.badge} text-xs capitalize`}>{risk.severity}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{risk.impact}</p>
                      <p className="text-xs text-brand-400">→ {risk.mitigation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Due diligence checklist */}
          {result.dueDiligenceChecklist?.length > 0 && (
            <div className="card p-5">
              <h3 className="font-bold text-white mb-3">Due Diligence Checklist</h3>
              <ul className="space-y-2">
                {result.dueDiligenceChecklist.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                    {item}
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
