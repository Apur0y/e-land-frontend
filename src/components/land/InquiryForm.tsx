'use client';
import { useState } from 'react';
import { inquiryAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { MessageCircle, Loader2, CheckCircle } from 'lucide-react';

export default function InquiryForm({ landId, landTitle }: { landId: string; landTitle: string }) {
  const { user } = useAuthStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '',
    message: '', type: 'info', budget: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    try {
      await inquiryAPI.submit({ ...form, landId, budget: form.budget ? Number(form.budget) : undefined });
      setSubmitted(true);
      toast.success('Inquiry sent successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send inquiry');
    }
    setLoading(false);
  };

  if (submitted) return (
    <div className="card p-10 text-center">
      <CheckCircle className="w-14 h-14 text-brand-400 mx-auto mb-4" />
      <h3 className="font-bold text-white text-xl mb-2">Inquiry Sent!</h3>
      <p className="text-gray-400">The property owner will contact you shortly at {form.email}</p>
    </div>
  );

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-5">
        <MessageCircle className="w-5 h-5 text-brand-400" />
        <h3 className="font-bold text-white">Send Inquiry</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input" placeholder="Your name" required />
          </div>
          <div>
            <label className="label">Email *</label>
            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input" type="email" placeholder="you@email.com" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Phone</label>
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input" placeholder="+880..." />
          </div>
          <div>
            <label className="label">Inquiry Type</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="input">
              <option value="info">General Info</option>
              <option value="buy">Buy / Purchase</option>
              <option value="lease">Lease / Rent</option>
              <option value="visit">Site Visit</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Budget (৳) <span className="text-gray-600 font-normal">— optional</span></label>
          <input value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} className="input" type="number" placeholder="Your budget" />
        </div>
        <div>
          <label className="label">Message *</label>
          <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className="input resize-none" rows={4} placeholder={`I am interested in "${landTitle}"...`} required
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><MessageCircle className="w-4 h-4" /> Send Inquiry</>}
        </button>
      </form>
    </div>
  );
}
