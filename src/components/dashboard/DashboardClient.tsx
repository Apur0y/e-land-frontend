'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { reportAPI, landAPI, inquiryAPI, aiAPI } from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain, FileText, MapPin, Heart, TrendingUp, Loader2,
  Plus, ArrowRight, BarChart3, Shield, GitCompare, Briefcase
} from 'lucide-react';
import LandCard from '@/components/land/LandCard';

export default function DashboardClient() {
  const router = useRouter();
  const { user, isAuthenticated, fetchMe } = useAuthStore();

  // useEffect(() => {
  //   if (!isAuthenticated) { router.push('/login'); return; }
  //   fetchMe();
  // }, [isAuthenticated]);

  const { data: reportsData, isLoading: reportsLoading } = useQuery({
    queryKey: ['my-reports'],
    queryFn: () => reportAPI.myReports(),
    enabled: isAuthenticated,
  });

  const { data: listingsData } = useQuery({
    queryKey: ['my-listings'],
    queryFn: () => landAPI.myListings(),
    enabled: isAuthenticated,
  });

  const { data: creditsData } = useQuery({
    queryKey: ['ai-credits'],
    queryFn: () => aiAPI.credits(),
    enabled: isAuthenticated,
  });

  const { data: inquiriesData } = useQuery({
    queryKey: ['my-inquiries'],
    queryFn: () => inquiryAPI.myInquiries(),
    enabled: isAuthenticated,
  });

  const reports = reportsData?.data?.data || [];
  const listings = listingsData?.data?.data || [];
  const credits = creditsData?.data;
  const inquiries = inquiriesData?.data?.data || [];
  const creditPct = credits ? Math.min(100, (credits.used / credits.limit) * 100) : 0;

  const aiTools = [
    { icon: Brain, label: 'Analyze Land', href: '/ai/analyze', color: 'text-brand-400', bg: 'bg-brand-950 border-brand-900' },
    { icon: TrendingUp, label: 'Price Predict', href: '/ai/price-prediction', color: 'text-blue-400', bg: 'bg-blue-950 border-blue-900' },
    { icon: Shield, label: 'Risk Analysis', href: '/ai/risk', color: 'text-yellow-400', bg: 'bg-yellow-950 border-yellow-900' },
    { icon: BarChart3, label: 'Rental Yield', href: '/ai/rental-yield', color: 'text-emerald-400', bg: 'bg-emerald-950 border-emerald-900' },
    { icon: GitCompare, label: 'Compare', href: '/ai/compare', color: 'text-purple-400', bg: 'bg-purple-950 border-purple-900' },
    { icon: Briefcase, label: 'Build ROI', href: '/ai/construction-roi', color: 'text-orange-400', bg: 'bg-orange-950 border-orange-900' },
  ];

  if (!isAuthenticated) return (
    <div className="flex items-center justify-center min-h-96">
      <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
    </div>
  );

  return (
    <div className="py-8">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-white">
              Welcome, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-400 mt-1">Here's your investment dashboard</p>
          </div>
          <div className="flex gap-3 flex-col">
            <Link href="/sell" className="btn-secondary text-sm">
              <Plus className="w-4 h-4" /> List Property
            </Link>
            <Link href="/ai/analyze" className="btn-primary text-sm">
              <Brain className="w-4 h-4" /> Run Analysis
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <FileText className="w-5 h-5 text-brand-400" />
              <span className="badge-green text-xs">Reports</span>
            </div>
            <p className="text-3xl font-bold text-white">{reports.length}</p>
            <p className="text-sm text-gray-500">AI Reports</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="badge-blue text-xs">Listings</span>
            </div>
            <p className="text-3xl font-bold text-white">{listings.length}</p>
            <p className="text-sm text-gray-500">My Listings</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="badge text-xs bg-red-950 text-red-400 border border-red-800">Saved</span>
            </div>
            <p className="text-3xl font-bold text-white">{user?.savedProperties?.length || 0}</p>
            <p className="text-sm text-gray-500">Saved Properties</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className={`badge text-xs ${creditPct >= 80 ? 'badge-red' : 'badge-green'}`}>
                {credits?.plan || 'free'}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{credits?.used || 0}<span className="text-lg text-gray-500">/{credits?.limit || 10}</span></p>
            <p className="text-sm text-gray-500">AI Credits Used</p>
            <div className="mt-2 bg-surface rounded-full h-1.5">
              <div className={`h-1.5 rounded-full transition-all ${creditPct >= 80 ? 'bg-red-500' : 'bg-brand-500'}`} style={{ width: `${creditPct}%` }} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Tools quick access */}
            <div className="card p-5">
              <h2 className="font-bold text-white mb-4">AI Tools</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {aiTools.map(tool => (
                  <Link key={tool.href} href={tool.href}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-surface-border hover:border-brand-700 bg-surface hover:bg-surface-hover transition-all group text-center"
                  >
                    <div className={`w-9 h-9 rounded-xl border ${tool.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <tool.icon className={`w-4.5 h-4.5 ${tool.color}`} />
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors leading-tight">{tool.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">Recent AI Reports</h2>
                <Link href="/dashboard/reports" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {reportsLoading ? (
                <div className="flex items-center justify-center py-8"><Loader2 className="w-6 h-6 text-brand-400 animate-spin" /></div>
              ) : reports.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No reports yet. Run your first AI analysis!</p>
                  <Link href="/ai/analyze" className="btn-primary text-sm mt-4">Run AI Analysis</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {reports.slice(0, 5).map((report: any) => (
                    <div key={report._id} className="flex items-center justify-between p-3 bg-surface rounded-xl border border-surface-border hover:border-brand-800 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          report.type === 'full_analysis' ? 'bg-brand-950 border border-brand-900' :
                          report.type === 'price_prediction' ? 'bg-blue-950 border border-blue-900' :
                          'bg-yellow-950 border border-yellow-900'
                        }`}>
                          <Brain className="w-4 h-4 text-brand-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white line-clamp-1">{report.title}</p>
                          <p className="text-xs text-gray-500 capitalize">{report.type?.replace('_', ' ')} · {new Date(report.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Link href={`/dashboard/reports/${report._id}`} className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
                        View <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Listings */}
            {listings.length > 0 && (
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-white">My Listings</h2>
                  <Link href="/sell" className="btn-secondary text-xs py-1.5"><Plus className="w-3.5 h-3.5" /> Add New</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listings.slice(0, 4).map((land: any) => <LandCard key={land._id} land={land} showSave={false} />)}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Plan card */}
            <div className={`card p-5 ${user?.plan === 'pro' ? 'bg-gradient-to-b from-brand-950 to-surface-card border-brand-800' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-white">Current Plan</p>
                <span className={`badge text-xs capitalize ${user?.plan === 'pro' ? 'badge-green' : user?.plan === 'enterprise' ? 'bg-purple-950 text-purple-400 border-purple-800 badge' : 'bg-gray-800 text-gray-400 border-gray-700 badge'}`}>
                  {user?.plan}
                </span>
              </div>
              {user?.plan === 'free' && (
                <>
                  <p className="text-sm text-gray-400 mb-4">Upgrade to Pro for 100 AI analyses/month and advanced features.</p>
                  <Link href="/pricing" className="btn-primary w-full text-sm text-center block">Upgrade to Pro →</Link>
                </>
              )}
              {user?.plan === 'pro' && (
                <p className="text-sm text-brand-300">You have full access to all Pro features. {100 - (credits?.used || 0)} analyses remaining this month.</p>
              )}
            </div>

            {/* Recent inquiries */}
            {inquiries.length > 0 && (
              <div className="card p-5">
                <h2 className="font-bold text-white mb-4">My Inquiries</h2>
                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq: any) => (
                    <div key={inq._id} className="flex items-start gap-3 p-3 bg-surface rounded-xl border border-surface-border">
                      <div className="w-8 h-8 rounded-full bg-brand-950 border border-brand-900 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-brand-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white line-clamp-1">{inq.land?.title}</p>
                        <p className="text-xs text-gray-500 capitalize">{inq.type} · {inq.status} · {new Date(inq.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick links */}
            <div className="card p-5">
              <h2 className="font-bold text-white mb-3">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { href: '/listings', label: 'Browse Listings', icon: MapPin },
                  { href: '/ai/analyze', label: 'New AI Analysis', icon: Brain },
                  { href: '/sell', label: 'List My Land', icon: Plus },
                  { href: '/dashboard/profile', label: 'Edit Profile', icon: FileText },
                ].map(item => (
                  <Link key={item.href} href={item.href}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-hover transition-colors text-sm text-gray-300 hover:text-white"
                  >
                    <item.icon className="w-4 h-4 text-gray-500" /> {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
