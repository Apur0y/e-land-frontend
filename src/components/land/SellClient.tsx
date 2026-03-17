'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { landAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { MapPin, Loader2, Plus, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const steps = ['Location', 'Details', 'Features', 'Media'];

export default function SellClient() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', price: '', area: '', areaUnit: 'katha',
    landType: 'residential', status: 'for_sale',
    address: '', city: '', district: '', state: '', zipCode: '',
    roadAccess: false, electricity: false, water: false, gas: false,
    drainage: false, wallBoundary: false, cornerPlot: false,
    facingDirection: '', roadWidth: '', floodZone: false, nearGovtProject: false,
    images: [] as string[], tags: '',
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!isAuthenticated) { toast.error('Please login to list property'); return; }
    if (!form.title || !form.description || !form.price || !form.area || !form.address || !form.city) {
      toast.error('Please fill all required fields'); return;
    }
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        area: Number(form.area),
        areaUnit: form.areaUnit,
        landType: form.landType,
        status: form.status,
        location: { address: form.address, city: form.city, district: form.district, state: form.state, zipCode: form.zipCode },
        features: {
          roadAccess: form.roadAccess, electricity: form.electricity, water: form.water,
          gas: form.gas, drainage: form.drainage, wallBoundary: form.wallBoundary,
          cornerPlot: form.cornerPlot, facingDirection: form.facingDirection || undefined,
          roadWidth: form.roadWidth ? Number(form.roadWidth) : undefined,
          floodZone: form.floodZone, nearGovtProject: form.nearGovtProject,
        },
        images: form.images.filter(Boolean).map(url => ({ url, isPrimary: false })),
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      const res = await landAPI.create(payload);
      toast.success('Listing created successfully!');
      setSubmitted(true);
      setTimeout(() => router.push(`/listings/${res.data.data.slug}`), 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create listing');
    }
    setLoading(false);
  };

  if (!isAuthenticated) return (
    <div className="card p-10 text-center">
      <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <h3 className="font-bold text-white text-xl mb-2">Login Required</h3>
      <p className="text-gray-400 mb-6">Create an account to list your property.</p>
      <div className="flex gap-3 justify-center">
        <Link href="/register" className="btn-primary">Create Free Account</Link>
        <Link href="/login" className="btn-secondary">Sign In</Link>
      </div>
    </div>
  );

  if (submitted) return (
    <div className="card p-12 text-center">
      <CheckCircle className="w-16 h-16 text-brand-400 mx-auto mb-4" />
      <h3 className="font-bold text-white text-2xl mb-2">Listing Created!</h3>
      <p className="text-gray-400">Your property is now live. Redirecting...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <button onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 text-sm font-medium transition-all ${
                i === step ? 'text-white' : i < step ? 'text-brand-400 cursor-pointer' : 'text-gray-600'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                i < step ? 'bg-brand-600 text-white' : i === step ? 'bg-brand-600 text-white ring-2 ring-brand-400 ring-offset-2 ring-offset-surface-card' : 'bg-surface-hover text-gray-500 border border-surface-border'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-brand-700' : 'bg-surface-border'}`} />}
          </div>
        ))}
      </div>

      <div className="card p-6 space-y-4">
        {/* Step 0: Location */}
        {step === 0 && (
          <>
            <h2 className="font-bold text-white flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-400" /> Location Details</h2>
            <div>
              <label className="label">Full Address *</label>
              <input value={form.address} onChange={e => set('address', e.target.value)} className="input" placeholder="Plot 12, Road 5, Banani" required />
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
                <label className="label">State / Division</label>
                <input value={form.state} onChange={e => set('state', e.target.value)} className="input" placeholder="Dhaka Division" />
              </div>
              <div>
                <label className="label">ZIP / Post Code</label>
                <input value={form.zipCode} onChange={e => set('zipCode', e.target.value)} className="input" placeholder="1213" />
              </div>
            </div>
          </>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <>
            <h2 className="font-bold text-white">Property Details</h2>
            <div>
              <label className="label">Listing Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} className="input" placeholder="e.g. Prime Residential Plot in Gulshan-2" required />
            </div>
            <div>
              <label className="label">Description *</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)}
                className="input resize-none" rows={5} placeholder="Describe the land, its surroundings, nearby amenities, legal status, development potential..." required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Price (৳) *</label>
                <input value={form.price} onChange={e => set('price', e.target.value)} className="input" type="number" placeholder="5000000" required />
              </div>
              <div>
                <label className="label">Listing Type</label>
                <select value={form.status} onChange={e => set('status', e.target.value)} className="input">
                  <option value="for_sale">For Sale</option>
                  <option value="for_lease">For Lease</option>
                </select>
              </div>
              <div>
                <label className="label">Area *</label>
                <input value={form.area} onChange={e => set('area', e.target.value)} className="input" type="number" placeholder="5" required />
              </div>
              <div>
                <label className="label">Area Unit</label>
                <select value={form.areaUnit} onChange={e => set('areaUnit', e.target.value)} className="input">
                  {['katha', 'decimal', 'bigha', 'sqft', 'sqm', 'acre', 'hectare'].map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Land Type</label>
                <select value={form.landType} onChange={e => set('landType', e.target.value)} className="input">
                  {['residential', 'commercial', 'agricultural', 'industrial', 'mixed', 'plot'].map(t => <option key={t} className="capitalize">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Tags <span className="text-gray-600 font-normal">— comma separated</span></label>
                <input value={form.tags} onChange={e => set('tags', e.target.value)} className="input" placeholder="gulshan, corner plot, near metro" />
              </div>
            </div>
          </>
        )}

        {/* Step 2: Features */}
        {step === 2 && (
          <>
            <h2 className="font-bold text-white">Available Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: 'roadAccess', label: '🛣️ Road Access' },
                { key: 'electricity', label: '⚡ Electricity' },
                { key: 'water', label: '💧 Water Supply' },
                { key: 'gas', label: '🔥 Gas Line' },
                { key: 'drainage', label: '🌊 Drainage' },
                { key: 'wallBoundary', label: '🧱 Wall Boundary' },
                { key: 'cornerPlot', label: '📐 Corner Plot' },
                { key: 'nearGovtProject', label: '🏗️ Near Govt Project' },
                { key: 'floodZone', label: '⚠️ Flood Zone' },
              ].map(({ key, label }) => (
                <label key={key} className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Facing Direction</label>
                <select value={form.facingDirection} onChange={e => set('facingDirection', e.target.value)} className="input">
                  <option value="">Select direction</option>
                  {['north', 'south', 'east', 'west', 'north-east', 'north-west', 'south-east', 'south-west'].map(d => (
                    <option key={d} value={d} className="capitalize">{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Road Width (ft)</label>
                <input value={form.roadWidth} onChange={e => set('roadWidth', e.target.value)} className="input" type="number" placeholder="20" />
              </div>
            </div>
          </>
        )}

        {/* Step 3: Media */}
        {step === 3 && (
          <>
            <h2 className="font-bold text-white">Photos & Media</h2>
            <p className="text-sm text-gray-400">Add image URLs for your property photos. Use Imgur, Cloudinary, or any image hosting.</p>
            <div className="space-y-3">
              {[0, 1, 2, 3].map(i => (
                <div key={i}>
                  <label className="label">Image {i + 1} URL {i === 0 && <span className="text-gray-600 font-normal">— primary</span>}</label>
                  <input
                    value={form.images[i] || ''}
                    onChange={e => {
                      const imgs = [...form.images];
                      imgs[i] = e.target.value;
                      set('images', imgs);
                    }}
                    className="input" placeholder="https://example.com/image.jpg"
                  />
                </div>
              ))}
            </div>
            <div className="p-4 bg-brand-950 border border-brand-900 rounded-xl">
              <p className="text-sm text-brand-300 font-medium mb-1">💡 Pro Tip</p>
              <p className="text-xs text-brand-400">After creating your listing, you can run an AI analysis to get a full investment report that will be shown to potential buyers — increasing inquiries by up to 5x.</p>
            </div>
          </>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          className="btn-secondary text-sm disabled:opacity-40">
          ← Previous
        </button>
        <span className="text-sm text-gray-500">Step {step + 1} of {steps.length}</span>
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} className="btn-primary text-sm">
            Next →
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className="btn-primary text-sm">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : <><Plus className="w-4 h-4" /> Create Listing</>}
          </button>
        )}
      </div>
    </div>
  );
}
