'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Search, ArrowRight, MapPin, TrendingUp, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const floatingCards = [
  { icon: TrendingUp, label: 'Price Growth', value: '+24.5%', color: 'text-brand-400', bg: 'bg-brand-950 border-brand-900', pos: 'top-20 -left-4 lg:left-8' },
  { icon: Shield, label: 'Risk Score', value: 'Low Risk', color: 'text-yellow-400', bg: 'bg-yellow-950 border-yellow-900', pos: 'top-32 -right-4 lg:right-8' },
  { icon: Brain, label: 'AI Score', value: '87/100', color: 'text-purple-400', bg: 'bg-purple-950 border-purple-900', pos: 'bottom-20 left-4 lg:left-16' },
];

export default function HeroSection() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/listings?search=${encodeURIComponent(search)}`);
    else router.push('/listings');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface" />
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-900/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-950/30 rounded-full blur-3xl" />
      </div>

      <div className="page-container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-950 border border-brand-900 rounded-full text-sm text-brand-300 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse-slow" />
              Powered by Gemini AI • Bangladesh's #1 Land Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Invest in Land{' '}
              <span className="gradient-text">Smarter</span>{' '}
              with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed mb-8 max-w-xl"
            >
              Get AI-powered land analysis, 5-year price predictions, risk assessments, and smart investment insights — all in one platform.
            </motion.p>

            {/* Search bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSearch}
              className="flex gap-3 mb-8 bg-surface-card border border-surface-border rounded-2xl p-2 shadow-card"
            >
              <div className="flex items-center gap-3 flex-1 px-3">
                <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by city, district, or area..."
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                />
              </div>
              <button type="submit" className="btn-primary px-5 py-2.5 text-sm rounded-xl">
                Search <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              <span className="text-sm text-gray-500">Popular:</span>
              {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Gazipur'].map(city => (
                <Link key={city} href={`/listings?city=${city}`}
                  className="text-sm px-3 py-1 bg-surface-card border border-surface-border rounded-full text-gray-300 hover:text-brand-400 hover:border-brand-700 transition-all"
                >
                  {city}
                </Link>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/ai/analyze" className="btn-primary">
                <Brain className="w-4 h-4" />
                Try AI Analysis Free
              </Link>
              <Link href="/listings" className="btn-secondary">
                Browse Listings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-surface-border"
            >
              {[
                { value: '10K+', label: 'Listings' },
                { value: '5K+', label: 'Investors' },
                { value: '50K+', label: 'AI Reports' },
                { value: '64', label: 'Districts' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-xl text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - AI Analysis mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative bg-surface-card border border-surface-border rounded-3xl p-6 shadow-card-hover">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">AI Land Analysis</p>
                    <p className="text-xs text-gray-500">Gulshan, Dhaka</p>
                  </div>
                </div>
                <span className="badge-green text-xs">Analyzed</span>
              </div>

              {/* Score circle */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#1e2736" strokeWidth="10" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#22c55e" strokeWidth="10"
                      strokeDasharray="339.3" strokeDashoffset="61.1" strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-bold text-4xl text-white">82</span>
                    <span className="text-xs text-brand-400 font-medium">Overall Score</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Investment', value: '88', color: 'text-brand-400' },
                  { label: 'Risk', value: 'Low', color: 'text-yellow-400' },
                  { label: 'Growth', value: '+22%', color: 'text-blue-400' },
                ].map(m => (
                  <div key={m.label} className="bg-surface rounded-xl p-3 text-center border border-surface-border">
                    <p className={`font-bold text-lg ${m.color}`}>{m.value}</p>
                    <p className="text-xs text-gray-500">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Price projection mini chart */}
              <div className="bg-surface rounded-xl p-4 border border-surface-border">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-white">5-Year Price Projection</p>
                  <TrendingUp className="w-4 h-4 text-brand-400" />
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 52, 60, 72, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm transition-all duration-500"
                      style={{
                        height: `${h}%`,
                        background: i === 5 ? '#22c55e' : `rgba(34, 197, 94, ${0.2 + i * 0.12})`
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {['Now', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'].map(y => (
                    <span key={y} className="text-xs text-gray-600">{y}</span>
                  ))}
                </div>
              </div>

              {/* Verdict */}
              <div className="mt-4 p-3 bg-brand-950 border border-brand-900 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">AI Verdict</p>
                  <p className="font-bold text-brand-400">Strong Buy ✓</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Fair Value</p>
                  <p className="font-bold text-white">৳2.4 Cr</p>
                </div>
              </div>
            </div>

            {/* Floating mini cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
                className={`absolute ${card.pos} bg-surface-card border ${card.bg} rounded-2xl px-4 py-3 shadow-card flex items-center gap-3`}
              >
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <div>
                  <p className="text-xs text-gray-400">{card.label}</p>
                  <p className={`font-bold text-sm ${card.color}`}>{card.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-600" />
      </div>
    </section>
  );
}
