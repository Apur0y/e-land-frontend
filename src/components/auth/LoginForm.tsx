'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Loader2, Eye, EyeOff, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Email Address</label>
        <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="input" placeholder="you@email.com" required autoComplete="email" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="label mb-0">Password</label>
          <Link href="/forgot-password" className="text-xs text-brand-400 hover:text-brand-300">Forgot password?</Link>
        </div>
        <div className="relative">
          <input type={showPass ? 'text' : 'password'} value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            className="input pr-12" placeholder="••••••••" required autoComplete="current-password" />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5 text-base">
        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : <><LogIn className="w-5 h-5" /> Sign In</>}
      </button>
      <div className="relative flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-surface-border" />
        <span className="text-xs text-gray-600">OR TRY DEMO</span>
        <div className="flex-1 h-px bg-surface-border" />
      </div>
      <button type="button" onClick={() => setForm({ email: 'admin@eland.com', password: 'Admin@123456' })}
        className="btn-secondary w-full text-sm py-2.5 text-gray-400">
        Fill Admin Credentials
      </button>
    </form>
  );
}
