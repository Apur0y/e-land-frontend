'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { landAPI, aiAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Brain, Shield, CheckCircle, Heart,
  Eye, Phone, MessageCircle, Loader2,
  Home, Zap, Droplets, Flame, Car, Wind, ArrowLeft, AlertTriangle
} from 'lucide-react';
import ScoreRing from '@/components/ai/ScoreRing';
import AIAnalysisCard from '@/components/ai/AIAnalysisCard';
import InquiryForm from '@/components/land/InquiryForm';

type Tab = 'overview' | 'analysis' | 'contact';

const TabButton = ({ tab, active, onClick }: { tab: Tab; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
      active ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white'
    }`}
  >
    {tab === 'analysis' ? 'AI Analysis' : tab.charAt(0).toUpperCase() + tab.slice(1)}
  </button>
);

const FeatureBadge = ({ icon: Icon, label, active }: { icon: any; label: string; active?: boolean }) => (
  <div className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm ${
    active ? 'bg-brand-950 border-brand-900 text-brand-300' : 'bg-surface border-surface-border text-gray-600'
  }`}>
    <Icon className="w-4 h-4 flex-shrink-0" />
    {label}
  </div>
);

export default function LandDetailClient({ slug }: { slug: string }) {
  const { isAuthenticated } = useAuthStore();
  const [activeImg, setActiveImg] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const { data, isLoading } = useQuery({
    queryKey: ['land', slug],
    queryFn: () => landAPI.get(slug),
  });

  const land = data?.data?.data;

  const handleAnalyze = async () => {
    if (!isAuthenticated) { toast.error('Please login to use AI analysis'); return; }
    setAnalyzing(true);
    try {
      await aiAPI.analyzeLand({ landId: land._id });
      toast.success('AI analysis complete!');
      window.location.reload();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Analysis failed');
    }
    setAnalyzing(false);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-96">
      <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
    </div>
  );

  if (!land) return (
    <div className="page-container py-20 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Listing Not Found</h2>
      <Link href="/listings" className="btn-primary">Back to Listings</Link>
    </div>
  );

  const imgs = land.images?.length > 0 ? land.images : [];
  const hasAnalysis = !!land.aiAnalysis?.overallScore;

  const features = [
    { icon: Car,  label: 'Road Access',    active: land.features?.roadAccess },
    { icon: Zap,  label: 'Electricity',    active: land.features?.electricity },
    { icon: Droplets, label: 'Water Supply', active: land.features?.water },
    { icon: Flame, label: 'Gas Line',      active: land.features?.gas },
    { icon: Home, label: 'Wall Boundary',  active: land.features?.wallBoundary },
    { icon: Wind, label: 'Corner Plot',    active: land.features?.cornerPlot },
  ];

  const stats = [
    { value: land.area?.toLocaleString(), label: land.areaUnit },
    { value: land.landType,               label: 'Type', capitalize: true },
    { value: land.views || 0,             label: 'Views',     icon: Eye },
    { value: land.inquiries || 0,         label: 'Inquiries', icon: MessageCircle },
  ];

  const AnalyzeCTA = ({ className = '' }: { className?: string }) => (
    <button onClick={handleAnalyze} disabled={analyzing} className={`btn-outline w-full text-sm ${className}`}>
      {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
      {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
    </button>
  );

  return (
    <div className="py-8">
      <div className="page-container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/listings" className="hover:text-brand-400 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Listings
          </Link>
          <span>/</span>
          <span className="text-gray-400">{land.location?.city}</span>
          <span>/</span>
          <span className="text-white line-clamp-1">{land.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="card overflow-hidden">
              <div className="relative h-80 bg-surface-hover">
                {imgs[activeImg] ? (
                  <Image src={imgs[activeImg].url} alt={land.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-grid opacity-20 flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-surface-border" />
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`badge text-xs ${land.status === 'for_sale' ? 'badge-green' : 'badge-red'}`}>
                    {land.status?.replace('_', ' ')}
                  </span>
                  {land.isVerified && (
                    <span className="badge-green text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                {hasAnalysis && (
                  <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-brand-400" />
                    <span className="font-bold text-white">{land.aiAnalysis.overallScore}/100</span>
                  </div>
                )}
              </div>
              {imgs.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {imgs.map((img: any, i: number) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        i === activeImg ? 'border-brand-500' : 'border-transparent'
                      }`}
                    >
                      <Image src={img.url} alt="" width={64} height={48} className="object-cover w-full h-full" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-surface-card border border-surface-border rounded-xl p-1">
              {(['overview', 'analysis', 'contact'] as Tab[]).map(tab => (
                <TabButton key={tab} tab={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
              ))}
            </div>

            {/* Tab content */}
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              {activeTab === 'overview' && (
                <>
                  <div className="card p-5">
                    <h3 className="font-semibold text-white mb-3">Description</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{land.description}</p>
                  </div>
                  <div className="card p-5">
                    <h3 className="font-semibold text-white mb-4">Property Features</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {features.map(f => <FeatureBadge key={f.label} {...f} />)}
                    </div>
                    {land.features?.facingDirection && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                        <Wind className="w-4 h-4" />
                        Facing: <span className="text-white capitalize">{land.features.facingDirection}</span>
                      </div>
                    )}
                    {land.features?.roadWidth && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                        <Car className="w-4 h-4" />
                        Road Width: <span className="text-white">{land.features.roadWidth} ft</span>
                      </div>
                    )}
                    {land.features?.floodZone && (
                      <div className="mt-3 flex items-center gap-2 text-sm bg-yellow-950 border border-yellow-900 rounded-xl p-3">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-300">Located in flood-prone area</span>
                      </div>
                    )}
                  </div>
                  <div className="card p-5">
                    <h3 className="font-semibold text-white mb-3">Location</h3>
                    <div className="flex items-start gap-2 text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                      <span>{land.location?.address}, {land.location?.city}, {land.location?.district}, {land.location?.country}</span>
                    </div>
                    <div className="h-48 bg-surface-hover rounded-xl mt-4 flex items-center justify-center border border-surface-border">
                      <p className="text-gray-600 text-sm">Map view — Google Maps integration</p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'analysis' && (
                hasAnalysis ? (
                  <AIAnalysisCard analysis={land.aiAnalysis} landTitle={land.title} />
                ) : (
                  <div className="card p-10 text-center ai-gradient">
                    <Brain className="w-14 h-14 text-brand-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-xl mb-2">No AI Analysis Yet</h3>
                    <p className="text-gray-400 mb-6">
                      Get a comprehensive AI report including score, price projection, risk factors, and investment verdict.
                    </p>
                    <button onClick={handleAnalyze} disabled={analyzing} className="btn-primary mx-auto">
                      {analyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Brain className="w-4 h-4" /> Run AI Analysis</>}
                    </button>
                    <p className="text-xs text-gray-600 mt-3">Uses 1 AI credit</p>
                  </div>
                )
              )}

              {activeTab === 'contact' && (
                <InquiryForm landId={land._id} landTitle={land.title} />
              )}
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            <div className="card p-5 sticky top-20">
              {/* Price */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-white">৳{land.price?.toLocaleString()}</p>
                  {land.pricePerSqft && (
                    <p className="text-sm text-gray-500 mt-0.5">৳{land.pricePerSqft?.toLocaleString()} per sqft</p>
                  )}
                </div>
                <button className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center hover:border-brand-700 transition-all">
                  <Heart className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {stats.map(({ value, label, capitalize, icon: Icon }) => (
                  <div key={label} className="bg-surface rounded-xl p-3 border border-surface-border text-center">
                    <p className={`font-bold text-white ${capitalize ? 'capitalize' : ''}`}>{value}</p>
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      {Icon && <Icon className="w-3 h-3" />} {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* AI score */}
              {hasAnalysis && (
                <div className="bg-brand-950 border border-brand-900 rounded-xl p-4 mb-5 flex items-center gap-4">
                  <ScoreRing score={land.aiAnalysis.overallScore} size={60} />
                  <div>
                    <p className="text-xs text-gray-400">AI Overall Score</p>
                    <p className="font-bold text-white">{land.aiAnalysis.verdict?.replace('_', ' ')}</p>
                    <p className="text-xs text-brand-400">{land.aiAnalysis.marketTrend} market</p>
                  </div>
                </div>
              )}

              {/* Agent contact */}
              {land.owner && (
                <div className="border-t border-surface-border pt-4">
                  <p className="text-xs text-gray-500 mb-3">Listed by</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center font-bold text-brand-200">
                      {land.owner.name?.[0]}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{land.owner.name}</p>
                      <p className="text-xs text-gray-500">{land.owner.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {land.owner.phone && (
                      <a href={`tel:${land.owner.phone}`} className="btn-primary flex-1 text-sm py-2.5">
                        <Phone className="w-4 h-4" /> Call
                      </a>
                    )}
                    <button onClick={() => setActiveTab('contact')} className="btn-secondary flex-1 text-sm py-2.5">
                      <MessageCircle className="w-4 h-4" /> Enquire
                    </button>
                  </div>
                </div>
              )}

              {!hasAnalysis && <AnalyzeCTA className="mt-4" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}