'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, TrendingUp, Eye, Heart, Brain, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface LandCardProps {
  land: any;
  showSave?: boolean;
}

export default function LandCard({ land, showSave = true }: LandCardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const [isSaved, setIsSaved] = useState(user?.savedProperties?.includes(land._id));
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login to save properties'); return; }
    setSaving(true);
    try {
      const res = await authAPI.saveProperty(land._id);
      setIsSaved(res.data.saved);
      toast.success(res.data.saved ? 'Saved to favourites' : 'Removed from favourites');
    } catch { toast.error('Failed to save'); }
    setSaving(false);
  };

  const img = land.images?.find((i: any) => i.isPrimary)?.url || land.images?.[0]?.url;
  const score = land.aiAnalysis?.overallScore;

  return (
    <Link href={`/listings/${land.slug}`} className="card-hover overflow-hidden block group">
      {/* Image */}
      <div className="relative h-48 bg-surface-hover overflow-hidden">
        {img ? (
          <Image src={img} alt={land.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 bg-grid opacity-30 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-surface-border" />
          </div>
        )}
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`badge text-xs ${land.status === 'for_sale' ? 'badge-green' : land.status === 'sold' ? 'badge-red' : 'badge-yellow'}`}>
            {land.status?.replace('_', ' ')}
          </span>
          {land.isFeatured && <span className="badge bg-yellow-950 text-yellow-400 border border-yellow-800 text-xs">Featured</span>}
          {land.isVerified && <CheckCircle className="w-5 h-5 text-brand-400 bg-brand-950 rounded-full" />}
        </div>
        {/* Save button */}
        {showSave && (
          <button onClick={handleSave} disabled={saving}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isSaved ? 'bg-red-600 text-white' : 'bg-surface/80 backdrop-blur-sm text-gray-300 hover:bg-red-600 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        )}
        {/* AI Score */}
        {score !== undefined && (
          <div className="absolute bottom-3 right-3 bg-surface/85 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <Brain className="w-3 h-3 text-brand-400" />
            <span className="text-xs font-bold text-brand-400">{score}/100</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-tight mb-1.5 line-clamp-1 group-hover:text-brand-400 transition-colors">
          {land.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="line-clamp-1">{land.location?.address}, {land.location?.city}</span>
        </div>

        {/* Price & area */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-bold text-white">৳{land.price?.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{land.area?.toLocaleString()} {land.areaUnit}</p>
          </div>
          {land.aiAnalysis?.annualAppreciation && (
            <div className="flex items-center gap-1 bg-brand-950 border border-brand-900 rounded-lg px-2 py-1">
              <TrendingUp className="w-3 h-3 text-brand-400" />
              <span className="text-xs font-medium text-brand-400">+{land.aiAnalysis.annualAppreciation}%/yr</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="capitalize px-2 py-0.5 bg-surface rounded-md border border-surface-border">{land.landType}</span>
          {land.features?.roadAccess && <span className="px-2 py-0.5 bg-surface rounded-md border border-surface-border">Road Access</span>}
          {land.features?.cornerPlot && <span className="px-2 py-0.5 bg-surface rounded-md border border-surface-border">Corner</span>}
          <span className="ml-auto flex items-center gap-0.5"><Eye className="w-3 h-3" />{land.views || 0}</span>
        </div>
      </div>
    </Link>
  );
}
