import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { Brain, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="relative mb-8">
            <p className="font-display font-bold text-[120px] text-surface-border leading-none select-none">404</p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-brand-600 flex items-center justify-center shadow-glow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-3">Page Not Found</h1>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Link href="/listings" className="btn-secondary">
              <Search className="w-4 h-4" /> Browse Listings
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
