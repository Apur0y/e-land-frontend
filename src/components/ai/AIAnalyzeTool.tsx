'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { aiAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Brain, Loader2, Sparkles, Lock } from 'lucide-react';
import AIAnalysisCard from './AIAnalysisCard';
import Link from 'next/link';

const districts = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh', 'Gazipur', 'Narayanganj', 'Comilla', "Cox's Bazar", 'Jessore', 'Bogra', 'Dinajpur'];

export default function AIAnalyzeTool() {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    address: '', city: '', district: 'Dhaka', country: 'Bangladesh',
    area: '', areaUnit: 'katha', price: '', landType: 'residential',
    roadAccess: false, electricity: false, water: false, gas: false,
    wallBoundary: false, cornerPlot: false, floodZone: false,
    nearGovtProject: false, roadWidth: '', facingDirection: '',
  });

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login to use AI analysis'); return; }
    if (!form.address || !form.city || !form.area || !form.price) {
      toast.error('Please fill address, city, area and price');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await aiAPI.analyzeLand({
        landData: {
          location: { address: form.address, city: form.city, district: form.district, country: form.country },
          area: Number(form.area), areaUnit: form.areaUnit,
          price: Number(form.price), landType: form.landType,
          features: {
            roadAccess: form.roadAccess, electricity: form.electricity, water: form.water,
            gas: form.gas, wallBoundary: form.wallBoundary, cornerPlot: form.cornerPlot,
            floodZone: form.floodZone, nearGovtProject: form.nearGovtProject,
            roadWidth: form.roadWidth ? Number(form.roadWidth) : undefined,
            facingDirection: form.facingDirection || undefined,
          },
        }
      });
      setResult(res.data.analysis);
      toast.success('AI analysis complete!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Analysis failed. Please try again.');
    }
    setLoading(false);
  };

  if (!isAuthenticated) return (
    <div className="card p-10 text-center">
      <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <h3 className="font-bold text-white text-xl mb-2">Login Required</h3>
      <p className="text-gray-400 mb-6">Create a free account to access AI land analysis.</p>
      <div className="flex gap-3 justify-center">
        <Link href="/register" className="btn-primary">Create Free Account</Link>
        <Link href="/login" className="btn-secondary">Sign In</Link>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-brand-400" />
          <h2 className="font-bold text-white">Enter Land Details</h2>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="label">Full Address *</label>
            <input value={form.address} onChange={e => set('address', e.target.value)} className="input" placeholder="e.g. Plot 12, Road 5, Banani" required />
          </div>
          <div>
            <label className="label">City *</label>
            <input value={form.city} onChange={e => set('city', e.target.value)} className="input" placeholder="e.g. Dhaka" required />
          </div>
          <div>
            <label className="label">District</label>
            <select value={form.district} onChange={e => set('district', e.target.value)} className="input">
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Area & Price */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Area *</label>
            <input value={form.area} onChange={e => set('area', e.target.value)} className="input" type="number" placeholder="e.g. 5" required />
          </div>
          <div>
            <label className="label">Unit</label>
            <select value={form.areaUnit} onChange={e => set('areaUnit', e.target.value)} className="input">
              {['katha', 'decimal', 'bigha', 'sqft', 'sqm', 'acre', 'hectare'].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Land Type</label>
            <select value={form.landType} onChange={e => set('landType', e.target.value)} className="input">
              {['residential', 'commercial', 'agricultural', 'industrial', 'mixed', 'plot'].map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Asking Price (৳) *</label>
            <input value={form.price} onChange={e => set('price', e.target.value)} className="input" type="number" placeholder="e.g. 5000000" required />
          </div>
          <div>
            <label className="label">Road Width (ft)</label>
            <input value={form.roadWidth} onChange={e => set('roadWidth', e.target.value)} className="input" type="number" placeholder="e.g. 20" />
          </div>
        </div>

        <div>
          <label className="label">Facing Direction</label>
          <select value={form.facingDirection} onChange={e => set('facingDirection', e.target.value)} className="input">
            <option value="">Select direction</option>
            {['north', 'south', 'east', 'west', 'north-east', 'north-west', 'south-east', 'south-west'].map(d => (
              <option key={d} value={d} className="capitalize">{d}</option>
            ))}
          </select>
        </div>

        {/* Features checkboxes */}
        <div>
          <label className="label">Available Features</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: 'roadAccess', label: 'Road Access' },
              { key: 'electricity', label: 'Electricity' },
              { key: 'water', label: 'Water Supply' },
              { key: 'gas', label: 'Gas Line' },
              { key: 'wallBoundary', label: 'Wall Boundary' },
              { key: 'cornerPlot', label: 'Corner Plot' },
              { key: 'nearGovtProject', label: 'Near Govt Project' },
              { key: 'floodZone', label: 'Flood Zone ⚠️' },
            ].map(({ key, label }) => (
              <label key={key} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                (form as any)[key] ? 'bg-brand-950 border-brand-700 text-brand-300' : 'bg-surface border-surface-border text-gray-400 hover:border-gray-600'
              }`}>
                <input type="checkbox" checked={(form as any)[key]} onChange={e => set(key, e.target.checked)} className="hidden" />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${(form as any)[key] ? 'bg-brand-600 border-brand-600' : 'border-gray-600'}`}>
                  {(form as any)[key] && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                {label}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base">
          {loading
            ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing with AI...</>
            : <><Sparkles className="w-5 h-5" /> Run Full AI Analysis</>
          }
        </button>
        <p className="text-xs text-gray-600 text-center">Uses 1 AI credit • Analysis takes ~15 seconds</p>
      </form>

      {loading && (
        <div className="card p-10 text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-brand-900 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border-2 border-brand-700 animate-spin" style={{ animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-8 h-8 text-brand-400 animate-pulse" />
            </div>
          </div>
          <p className="font-semibold text-white mb-2">Gemini AI is analyzing your land...</p>
          <p className="text-sm text-gray-500">Checking location data, market trends, risk factors...</p>
        </div>
      )}

      {result && <AIAnalysisCard analysis={result} landTitle={`${form.address}, ${form.city}`} />}
    </div>
  );
}
