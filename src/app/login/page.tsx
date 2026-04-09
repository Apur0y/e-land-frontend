import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import { Brain } from 'lucide-react';

export const metadata: Metadata = { title: 'Sign In – Eland', description: 'Sign in to your Eland account to access AI land analysis tools.' };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-950 via-surface-card to-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">Eland<span className="gradient-text"></span></span>
          </Link>
          <div>
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              Bangladesh's Smartest<br />Land Investment Platform
            </h2>
            <p className="text-brand-200 text-lg mb-8">AI-powered analysis, price predictions, and risk assessment for every land in Bangladesh.</p>
            <div className="space-y-3">
              {['10 free AI analyses on signup', '5-year price prediction engine', 'Real-time risk assessment', 'Smart 3-property comparison'].map(f => (
                <div key={f} className="flex items-center gap-3 text-brand-200">
                  <div className="w-5 h-5 rounded-full bg-brand-600/30 border border-brand-700 flex items-center justify-center">
                    <svg className="w-3 h-3 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <p className="text-brand-800 text-sm">© {new Date().getFullYear()} Eland. All rights reserved.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">Land<span className="gradient-text">IQ</span></span>
            </Link>
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 mb-8">Sign in to access your AI tools and reports.</p>
          <LoginForm />
          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-brand-400 hover:text-brand-300 font-medium">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
