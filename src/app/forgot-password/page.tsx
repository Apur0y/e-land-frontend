'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Brain, Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }
    setLoading(true);
    // Simulate API call - connect to real reset endpoint when email is configured
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2.5 mb-10 justify-center">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl">Land<span className="gradient-text">IQ</span></span>
        </Link>

        {sent ? (
          <div className="card p-10 text-center">
            <CheckCircle className="w-14 h-14 text-brand-400 mx-auto mb-4" />
            <h2 className="font-bold text-white text-2xl mb-2">Check Your Email</h2>
            <p className="text-gray-400 mb-6">
              If <strong className="text-white">{email}</strong> has an account, we've sent password reset instructions.
            </p>
            <Link href="/login" className="btn-primary w-full text-center block">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <div className="card p-8">
            <h1 className="font-display font-bold text-2xl text-white mb-2">Reset Password</h1>
            <p className="text-gray-400 text-sm mb-6">Enter your email and we'll send reset instructions.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="input pl-11" placeholder="you@email.com" required
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>
            </form>
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-300 mt-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
