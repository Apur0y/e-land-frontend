'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Loader2, Eye, EyeOff, UserPlus } from 'lucide-react';

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      toast.success('Account created! Welcome to LandIQ 🎉');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Full Name *</label>
        <input value={form.name} onChange={e => set('name', e.target.value)} className="input" placeholder="Rafiqul Islam" required />
      </div>
      <div>
        <label className="label">Email Address *</label>
        <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input" placeholder="you@email.com" required />
      </div>
      <div>
        <label className="label">Phone Number <span className="text-gray-600 font-normal">— optional</span></label>
        <input value={form.phone} onChange={e => set('phone', e.target.value)} className="input" placeholder="+880 1700-000000" />
      </div>
      <div>
        <label className="label">Password *</label>
        <div className="relative">
          <input type={showPass ? 'text' : 'password'} value={form.password}
            onChange={e => set('password', e.target.value)}
            className="input pr-12" placeholder="Min. 6 characters" required minLength={6} />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div>
        <label className="label">Confirm Password *</label>
        <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)}
          className="input" placeholder="Repeat password" required />
      </div>
      <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5 text-base mt-2">
        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</> : <><UserPlus className="w-5 h-5" /> Create Free Account</>}
      </button>
      <div className="flex items-center gap-3 p-3 bg-brand-950 border border-brand-900 rounded-xl">
        <div className="text-brand-400 text-lg">🎁</div>
        <p className="text-xs text-brand-300">You get <strong>10 free AI analyses</strong> immediately after signup — no payment needed.</p>
      </div>
    </form>
  );
}
