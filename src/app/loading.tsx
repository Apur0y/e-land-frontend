import { Brain } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-brand-900 animate-spin" style={{ borderTopColor: '#22c55e' }} />
          <div className="absolute inset-3 flex items-center justify-center">
            <Brain className="w-6 h-6 text-brand-400 animate-pulse" />
          </div>
        </div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}
