'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, ChevronDown, Menu, X, User, LogOut, 
  LayoutDashboard, MapPin, TrendingUp, Shield,
  BarChart3, GitCompare, Home, Briefcase
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/listings', label: 'Browse Land' },
  { href: '/sell', label: 'Sell Land' },
  {
    label: 'AI Tools',
    children: [
      { href: '/ai/analyze', label: 'Land Analyzer', icon: Brain, desc: 'Full AI analysis' },
      { href: '/ai/price-prediction', label: 'Price Prediction', icon: TrendingUp, desc: '5-year forecast' },
      { href: '/ai/risk', label: 'Risk Analysis', icon: Shield, desc: 'Flood, legal & more' },
      { href: '/ai/rental-yield', label: 'Rental Yield', icon: BarChart3, desc: 'ROI calculator' },
      { href: '/ai/compare', label: 'Compare Properties', icon: GitCompare, desc: 'Smart comparison' },
      { href: '/ai/construction-roi', label: 'Construction ROI', icon: Briefcase, desc: 'Build & profit' },
    ],
  },
  { href: '/market', label: 'Market Insights' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setIsOpen(false); setAiOpen(false); }, [pathname]);

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-surface/95 backdrop-blur-xl border-b border-surface-border shadow-card' : 'bg-transparent'
    )}>
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">
              Land<span className="gradient-text">IQ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" onMouseEnter={() => setAiOpen(true)} onMouseLeave={() => setAiOpen(false)}>
                  <button className={clsx(
                    'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    aiOpen ? 'text-white bg-surface-card' : 'text-gray-300 hover:text-white hover:bg-surface-card'
                  )}>
                    <Brain className="w-4 h-4 text-brand-400" />
                    {link.label}
                    <ChevronDown className={clsx('w-3.5 h-3.5 transition-transform', aiOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {aiOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-surface-card border border-surface-border rounded-2xl shadow-card-hover overflow-hidden"
                      >
                        <div className="p-2">
                          <div className="px-3 py-2 mb-1">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI-Powered Tools</p>
                          </div>
                          {link.children.map((child) => (
                            <Link key={child.href} href={child.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-brand-950 border border-brand-900 flex items-center justify-center flex-shrink-0 group-hover:border-brand-700 transition-colors">
                                <child.icon className="w-4 h-4 text-brand-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">{child.label}</p>
                                <p className="text-xs text-gray-500">{child.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    pathname === link.href ? 'text-white bg-surface-card' : 'text-gray-300 hover:text-white hover:bg-surface-card'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <Link href="/admin" className="btn-ghost text-sm">
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="btn-ghost text-sm">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-surface-border hover:border-brand-700 transition-all bg-surface-card">
                    <div className="w-7 h-7 rounded-full bg-brand-800 flex items-center justify-center text-xs font-bold text-brand-300">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{user.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-surface-card border border-surface-border rounded-xl shadow-card-hover opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-1">
                      <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link href="/sell" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                        <MapPin className="w-4 h-4" /> List Property
                      </Link>
                      <hr className="border-surface-border my-1" />
                      <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-surface-hover rounded-lg transition-colors w-full">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-sm">Sign In</Link>
                <Link href="/register" className="btn-primary text-sm">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-surface-card transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface border-t border-surface-border overflow-hidden"
          >
            <div className="page-container py-4 space-y-1">
              <Link href="/listings" className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-surface-card transition-colors">
                <Home className="w-4 h-4 text-gray-400" /> Browse Land
              </Link>
              <Link href="/sell" className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-surface-card transition-colors">
                <MapPin className="w-4 h-4 text-gray-400" /> Sell Land
              </Link>
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">AI Tools</p>
                <div className="space-y-1 pl-2">
                  {[
                    { href: '/ai/analyze', label: 'Land Analyzer' },
                    { href: '/ai/price-prediction', label: 'Price Prediction' },
                    { href: '/ai/risk', label: 'Risk Analysis' },
                    { href: '/ai/rental-yield', label: 'Rental Yield' },
                    { href: '/ai/compare', label: 'Compare Properties' },
                    { href: '/ai/construction-roi', label: 'Construction ROI' },
                  ].map(item => (
                    <Link key={item.href} href={item.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-surface-card transition-colors">
                      <Brain className="w-3.5 h-3.5 text-brand-400" /> {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/market" className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-surface-card transition-colors">
                <TrendingUp className="w-4 h-4 text-gray-400" /> Market Insights
              </Link>
              <div className="pt-2 border-t border-surface-border flex gap-3">
                {isAuthenticated ? (
                  <button onClick={logout} className="btn-secondary flex-1 text-sm">Sign Out</button>
                ) : (
                  <>
                    <Link href="/login" className="btn-secondary flex-1 text-sm text-center">Sign In</Link>
                    <Link href="/register" className="btn-primary flex-1 text-sm text-center">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
