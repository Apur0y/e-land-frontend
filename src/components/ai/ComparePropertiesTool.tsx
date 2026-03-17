'use client';
import { useState } from 'react';
import { aiAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { GitCompare, Loader2, Sparkles, Plus, Trash2, Lock, Trophy, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import ScoreRing from './ScoreRing';

const emptyProp = () => ({
  title: '', city: '', district: '', area: '', areaUnit: 'katha',
  landType: 'residential', price: '', status: 'for_sale',
  roadAccess: false, floodZone: false, cornerPlot: false,
  location: { city: '', district: '' }, features: {},
});

export default function ComparePropertiesTool() {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [props, setProps] = useState([emptyProp(), emptyProp()]);

  const addProp = () => { if (props.length < 3) setProps(p => [...p, emptyProp()]); };
  const removeProp = (i: number) => { if (props.length > 2) setProps(p => p.filter((_, idx) => idx !== i)); };
  const updateProp = (i: number, k: string, v: any) => {
    setProps(p => p.map((prop, idx) => idx === i ? { ...prop, [k]: v } : prop));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login'); return; }
    const prepared = props.map(p => ({
      ...p,
      price: Number(p.price),
      area: Number(p.area),
      location: { city: p.city, district: p.district, address: p.city },
      features: { roadAccess: p.roadAccess, floodZone: p.floodZone, cornerPlot: p.cornerPlot },
    }));
    setLoading(true);
    try {
      const res = await aiAPI.compareProperties({ properties: prepared });
      setResult(res.data);
      toast.success('Comparison ready!');
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

  const propColors = ['brand', 'blue', 'purple'];
  const propTextColors = ['text-brand-400', 'text-blue-400', 'text-purple-400'];
  const propBgColors = ['bg-brand-950 border-brand-900', 'bg-blue-950 border-blue-900', 'bg-purple-950 border-purple-900'];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className={`grid gap-5 ${props.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          {props.map((prop, i) => (
            <div key={i} className={`card p-5 border-t-2 ${i === 0 ? 'border-t-brand-600' : i === 1 ? 'border-t-blue-600' : 'border-t-purple-600'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`font-bold text-sm ${propTextColors[i]}`}>Property {i + 1}</span>
                {i >= 2 && (
                  <button type="button" onClick={() => removeProp(i)} className="w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center">
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <input value={prop.title} onChange={e => updateProp(i, 'title', e.target.value)} className="input text-sm py-2" placeholder="Property name" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={prop.city} onChange={e => updateProp(i, 'city', e.target.value)} className="input text-sm py-2" placeholder="City *" required />
                  <input value={prop.district} onChange={e => updateProp(i, 'district', e.target.value)} className="input text-sm py-2" placeholder="District" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input value={prop.area} onChange={e => updateProp(i, 'area', e.target.value)} className="input text-sm py-2" type="number" placeholder="Area *" required />
                  <select value={prop.areaUnit} onChange={e => updateProp(i, 'areaUnit', e.target.value)} className="input text-sm py-2">
                    {['katha', 'decimal', 'bigha', 'sqft'].map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <input value={prop.price} onChange={e => updateProp(i, 'price', e.target.value)} className="input text-sm py-2" type="number" placeholder="Price (৳) *" required />
                <select value={prop.landType} onChange={e => updateProp(i, 'landType', e.target.value)} className="input text-sm py-2">
                  {['residential', 'commercial', 'agricultural', 'industrial'].map(t => <option key={t}>{t}</option>)}
                </select>
                <div className="flex gap-2 flex-wrap">
                  {[{ k: 'roadAccess', l: 'Road' }, { k: 'floodZone', l: '⚠️ Flood' }, { k: 'cornerPlot', l: 'Corner' }].map(({ k, l }) => (
                    <label key={k} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border cursor-pointer text-xs transition-all ${(prop as any)[k] ? `${propBgColors[i]} ${propTextColors[i]}` : 'border-surface-border text-gray-500'}`}>
                      <input type="checkbox" checked={(prop as any)[k]} onChange={e => updateProp(i, k, e.target.checked)} className="hidden" />
                      {l}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {props.length < 3 && (
            <button type="button" onClick={addProp} className="btn-secondary text-sm">
              <Plus className="w-4 h-4" /> Add 3rd Property
            </button>
          )}
          <button type="submit" disabled={loading} className="btn-primary flex-1 py-3">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Comparing...</> : <><Sparkles className="w-4 h-4" /> Run AI Comparison</>}
          </button>
        </div>
      </form>

      {result?.comparison && (
        <div className="space-y-5">
          {/* Winner banner */}
          <div className="card p-5 bg-brand-950 border-brand-800 flex items-center gap-4">
            <Trophy className="w-8 h-8 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-400">AI Recommendation</p>
              <p className="font-bold text-white text-lg">
                Property {result.comparison.winner} wins — {result.properties?.[result.comparison.winner - 1]?.title || `Property ${result.comparison.winner}`}
              </p>
              <p className="text-sm text-brand-300 mt-0.5">{result.comparison.winnerReason}</p>
            </div>
          </div>

          {/* Score comparison */}
          <div className="card p-5">
            <h3 className="font-bold text-white mb-5">AI Score Comparison</h3>
            <div className={`grid gap-5 ${result.properties?.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {result.properties?.map((_: any, i: number) => {
                const scores = result.comparison.scores?.[`property${i + 1}`];
                if (!scores) return null;
                const isWinner = result.comparison.winner === i + 1;
                return (
                  <div key={i} className={`text-center p-4 rounded-xl border ${isWinner ? 'bg-brand-950 border-brand-700' : 'bg-surface border-surface-border'}`}>
                    {isWinner && <p className="text-xs text-yellow-400 mb-2 font-medium">🏆 Winner</p>}
                    <ScoreRing score={scores.overall} size={72} />
                    <p className={`text-sm font-semibold mt-2 ${propTextColors[i]}`}>Property {i + 1}</p>
                    <div className="mt-3 space-y-1 text-xs text-gray-500">
                      <div className="flex justify-between"><span>Investment</span><span className={propTextColors[i]}>{scores.investment}</span></div>
                      <div className="flex justify-between"><span>Value</span><span className={propTextColors[i]}>{scores.value}</span></div>
                      <div className="flex justify-between"><span>Growth</span><span className={propTextColors[i]}>{scores.growth}</span></div>
                      <div className="flex justify-between"><span>Risk</span><span className={propTextColors[i]}>{scores.risk}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className={`grid gap-5 ${result.properties?.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {result.properties?.map((_: any, i: number) => (
              <div key={i} className="card p-4">
                <p className={`font-bold text-sm mb-3 ${propTextColors[i]}`}>Property {i + 1}</p>
                <div className="space-y-1.5 mb-3">
                  {result.comparison.pros?.[`property${i + 1}`]?.map((p: string, j: number) => (
                    <div key={j} className="flex items-start gap-1.5 text-xs text-gray-300">
                      <CheckCircle className="w-3 h-3 text-brand-400 mt-0.5 flex-shrink-0" /> {p}
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {result.comparison.cons?.[`property${i + 1}`]?.map((c: string, j: number) => (
                    <div key={j} className="flex items-start gap-1.5 text-xs text-gray-400">
                      <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" /> {c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          {result.comparison.summary && (
            <div className="card p-5">
              <h3 className="font-bold text-white mb-2">Full AI Summary</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{result.comparison.summary}</p>
            </div>
          )}

          {/* Investor profiles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">For Conservative Investor</p>
              <p className={`font-bold text-lg ${propTextColors[result.comparison.forConservativeInvestor - 1] || 'text-white'}`}>
                Property {result.comparison.forConservativeInvestor}
              </p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">For Aggressive Investor</p>
              <p className={`font-bold text-lg ${propTextColors[result.comparison.forAggressiveInvestor - 1] || 'text-white'}`}>
                Property {result.comparison.forAggressiveInvestor}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
