'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import LandCard from '@/components/land/LandCard';
import { Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SavedPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated]);

  const { data, isLoading } = useQuery({
    queryKey: ['saved-properties'],
    queryFn: () => authAPI.me(),
    enabled: isAuthenticated,
  });

  const saved = data?.data?.user?.savedProperties || [];

  return (
    <MainLayout>
      <div className="py-10 page-container">
        <h1 className="font-display font-bold text-3xl text-white mb-8">Saved Properties</h1>
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-brand-400 animate-spin" /></div>
        ) : saved.length === 0 ? (
          <div className="card p-16 text-center max-w-lg mx-auto">
            <Heart className="w-14 h-14 text-gray-700 mx-auto mb-4" />
            <h3 className="font-bold text-white text-xl mb-2">No Saved Properties</h3>
            <p className="text-gray-500 mb-6">Heart any listing to save it here for later reference.</p>
            <Link href="/listings" className="btn-primary">Browse Listings</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {saved.map((land: any) => (
              <LandCard key={land._id || land} land={land} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
