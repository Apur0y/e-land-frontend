'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import {
  Brain, LayoutDashboard, Users, MapPin, MessageCircle,
  FileText, LogOut, Menu, X, BarChart3, Settings, ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/listings', label: 'Listings', icon: MapPin },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageCircle },
  { href: '/admin/reports', label: 'AI Reports', icon: FileText },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout, fetchMe } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return; }
    fetchMe().then(() => {
      const u = useAuthStore.getState().user;
      if (u && u.role !== 'admin') router.push('/dashboard');
    });
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full" />
    </div>
  );

  if (user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className={clsx(
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface-card border-r border-surface-border flex flex-col transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg">Land<span className="gradient-text">IQ</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-4 py-3 mx-3 mt-3 bg-brand-950 border border-brand-900 rounded-xl text-center">
          <p className="text-xs font-bold text-brand-300 uppercase tracking-wider">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                pathname === item.href
                  ? 'bg-brand-600 text-white shadow-glow'
                  : 'text-gray-400 hover:text-white hover:bg-surface-hover'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {pathname === item.href && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          ))}
        </nav>

        {/* User & logout */}
        <div className="p-3 border-t border-surface-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-sm font-bold text-brand-200">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
            <Settings className="w-4 h-4" /> View Site
          </Link>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-surface-hover rounded-lg transition-colors w-full">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-surface-card border-b border-surface-border flex items-center px-6 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            System Online
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
