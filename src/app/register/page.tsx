import type { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';
import { Brain } from 'lucide-react';

export const metadata: Metadata = { title: 'Create Account – Eland', description: 'Create a free Eland account and get 10 AI land analyses included.' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">Land<span className="gradient-text">IQ</span></span>
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-white mb-2">Create Free Account</h1>
          <p className="text-gray-400">Get 10 AI analyses free. No credit card required.</p>
        </div>
        <RegisterForm />
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium">Sign in</Link>
        </p>
        <p className="text-center text-gray-600 text-xs mt-4">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link> and{' '}
          <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
