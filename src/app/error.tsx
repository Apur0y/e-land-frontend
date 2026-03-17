'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-surface text-white min-h-screen flex items-center justify-center font-sans">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-2xl bg-red-950 border border-red-900 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
          <p className="text-gray-400 mb-6 text-sm">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all text-sm">
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
            <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-card border border-surface-border text-white font-semibold rounded-xl transition-all text-sm hover:border-brand-700">
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
