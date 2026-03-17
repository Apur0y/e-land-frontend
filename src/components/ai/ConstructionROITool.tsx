'use client';
import { useState } from 'react';
import { aiAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Briefcase, Loader2, Sparkles, Lock, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function ConstructionROITool() {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    city: '', district: '', landPrice: '', landArea: '', areaUnit: 'katha',
    buildingType: 'residential', floors: '4', budget: '',
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login'); return; }
    if (!form.city || !form.landPrice || !form.budget) { toast.error('Fill required fields'); return; }
    setLoading(true);
    try {
      const res = await aiAPI.constructionROI({
        city: form.city, district: form.district,
        landPrice: Number(form.landPrice), landArea: Number(form.landArea),
        areaUnit: form.areaUnit, buildingType: form.buildingType,
        floors: Number(form.floors), budget: Number(form.budget),
      });
      setResult(res.data.roiData);
      toast.success('ROI analysis ready!');
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

  const verdictColors: any = {
    'highly feasible': 'text-brand-400', feasible: 'text-blue-400',
    marginal: 'text-yellow-400', 'not recommended': 'text-red-400',
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-5 h-5 text-orange-400" />
          <h2 className="font-bold text-white">Project Details</h2>
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
            <label className="label">Land Price (৳) *</label>
            <input value={form.landPrice} onChange={e => set('landPrice', e.target.value)} className="input" type="number" placeholder="5000000" required />
          </div>
          <div>
            <label className="label">Land Area</label>
            <input value={form.landArea} onChange={e => set('landArea', e.target.value)} className="input" type="number" placeholder="5" />
          </div>
          <div>
            <label className="label">Area Unit</label>
            <select value={form.areaUnit} onChange={e => set('areaUnit', e.target.value)} className="input">
              {['katha', 'decimal', 'bigha', 'sqft'].map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Building Type</label>
            <select value={form.buildingType} onChange={e => set('buildingType', e.target.value)} className="input">
              {['residential', 'commercial', 'mixed'].map(t => <option key={t} className="capitalize">{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Number of Floors</label>
            <input value={form.floors} onChange={e => set('floors', e.target.value)} className="input" type="number" min="1" max="20" />
          </div>
          <div>
            <label className="label">Construction Budget (৳) *</label>
            <input value={form.budget} onChange={e => set('budget', e.target.value)} className="input" type="number" placeholder="8000000" required />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Calculating ROI...</> : <><Sparkles className="w-4 h-4" /> Calculate Construction ROI</>}
        </button>
      </form>

      {result && (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Investment', value: `৳${result.totalProjectCost?.toLocaleString()}`, color: 'text-white' },
              { label: 'Completion Value', value: `৳${result.completionValue?.toLocaleString()}`, color: 'text-brand-400' },
              { label: 'Net ROI', value: `${result.netROI?.toFixed(1)}%`, color: 'text-blue-400' },
              { label: 'Annualized ROI', value: `${result.annualizedROI?.toFixed(1)}%/yr`, color: 'text-emerald-400' },
            ].map(m => (
              <div key={m.label} className="card p-4 text-center">
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Verdict */}
          <div className={`card p-5 flex items-center justify-between ${result.verdict?.includes('feasible') ? 'bg-brand-950 border-brand-800' : 'bg-yellow-950 border-yellow-900'}`}>
            <div>
              <p className="text-sm text-gray-400">AI Feasibility Verdict</p>
              <p className={`font-bold text-xl capitalize ${verdictColors[result.verdict?.toLowerCase()] || 'text-white'}`}>
                {result.verdict}
              </p>
              <p className="text-sm text-gray-400 mt-1">Break-even via rental: {result.breakEvenTimeline}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{result.feasibilityScore}</p>
              <p className="text-xs text-gray-500">Feasibility Score</p>
            </div>
          </div>

          {/* Two scenarios */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Rental Scenario</p>
              <p className="font-bold text-brand-400 text-lg">৳{result.rentalIncome?.monthlyGross?.toLocaleString()}/mo</p>
              <p className="text-xs text-gray-500">Monthly Gross</p>
              <p className="font-bold text-white mt-2">{result.rentalIncome?.netYield?.toFixed(1)}% yield</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Sale Scenario</p>
              <p className="font-bold text-blue-400 text-lg">৳{result.saleScenario?.estimatedSalePrice?.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Estimated Sale Price</p>
              <p className="font-bold text-white mt-2">{result.saleScenario?.roi?.toFixed(1)}% ROI</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="card p-5">
            <h3 className="font-bold text-white mb-3">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Land Cost', value: result.totalInvestment - result.estimatedConstructionCost },
                { label: 'Construction Cost', value: result.estimatedConstructionCost },
                { label: 'Cost per Sqft', value: result.constructionCostPerSqft, suffix: '/sqft' },
                { label: 'Project Timeline', value: null, text: result.projectTimeline },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-surface-border last:border-0">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="font-medium text-white">
                    {item.text || (item.value ? `৳${item.value?.toLocaleString()}${item.suffix || ''}` : '-')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {result.recommendations?.length > 0 && (
            <div className="card p-5">
              <h3 className="font-bold text-white mb-3">AI Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.risks?.length > 0 && (
            <div className="card p-5">
              <h3 className="font-bold text-white mb-3">Project Risks</h3>
              <ul className="space-y-2">
                {result.risks.map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" /> {r}
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
