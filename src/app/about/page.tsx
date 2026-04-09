import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { Brain, Target, Users, Shield, TrendingUp, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Eland – AI Land Intelligence for Bangladesh',
  description: 'Learn about Eland — our mission to democratize land investment in Bangladesh using AI technology.',
};

const team = [
  { name: 'Karim Uddin', role: 'CEO & Co-Founder', avatar: 'KU', bg: 'bg-brand-800' },
  { name: 'Nasreen Rahman', role: 'CTO & Co-Founder', avatar: 'NR', bg: 'bg-blue-800' },
  { name: 'Tanvir Hossain', role: 'Head of AI', avatar: 'TH', bg: 'bg-purple-800' },
  { name: 'Sabrina Ahmed', role: 'Head of Operations', avatar: 'SA', bg: 'bg-emerald-800' },
];

const values = [
  { icon: Target, title: 'Data-Driven', desc: 'Every recommendation is backed by real data, not gut feelings.' },
  { icon: Shield, title: 'Transparent', desc: 'We show you risks alongside opportunities — no sugar-coating.' },
  { icon: Users, title: 'Investor-First', desc: 'Our tools are designed for investors of all sizes, from first-timers to developers.' },
  { icon: Brain, title: 'AI-Powered', desc: 'Gemini AI processes thousands of data points so you don\'t have to.' },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="py-16">
        <div className="page-container">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 shadow-glow-lg mb-6 mx-auto">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-5xl text-white mb-6">
              Democratizing Land Investment in Bangladesh
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Eland was founded with a simple belief: every Bangladeshi deserves access to the same quality of investment intelligence that was previously only available to wealthy insiders. We built the tools we wished we had.
            </p>
          </div>

          {/* Mission */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Our Mission</p>
              <h2 className="font-display font-bold text-4xl text-white mb-6">Making Smart Land Investment Accessible to All</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Bangladesh's land market is one of the most complex in South Asia — with fragmented data, opaque pricing, and hidden risks. We built Eland to change that.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Using Google's Gemini AI, we analyze land from every angle — price trends, flood risks, infrastructure development, government projects, and investment potential — delivering insights in seconds that would take experts weeks to compile.
              </p>
              <div className="flex gap-4">
                <Link href="/register" className="btn-primary">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/ai/analyze" className="btn-secondary">Try AI Analysis</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10K+', label: 'Listings Indexed', icon: MapPin, color: 'text-brand-400' },
                { value: '50K+', label: 'AI Reports Generated', icon: Brain, color: 'text-purple-400' },
                { value: '5K+', label: 'Active Investors', icon: Users, color: 'text-blue-400' },
                { value: '98%', label: 'Prediction Accuracy', icon: TrendingUp, color: 'text-yellow-400' },
              ].map(stat => (
                <div key={stat.label} className="card p-5 text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className={`font-display font-bold text-3xl ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">What We Stand For</p>
              <h2 className="font-display font-bold text-4xl text-white">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map(v => (
                <div key={v.title} className="card p-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-950 border border-brand-900 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">The Team</p>
              <h2 className="font-display font-bold text-4xl text-white">Built by Bangladeshis, for Bangladesh</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
              {team.map(member => (
                <div key={member.name} className="card p-5 text-center">
                  <div className={`w-16 h-16 rounded-full ${member.bg} flex items-center justify-center text-xl font-bold text-white mx-auto mb-3`}>
                    {member.avatar}
                  </div>
                  <p className="font-semibold text-white text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="card p-10 text-center bg-gradient-to-br from-brand-950 to-surface-card border-brand-900">
            <h2 className="font-display font-bold text-3xl text-white mb-4">Join the Eland Community</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">Be part of Bangladesh's fastest growing land investment platform. Start with 10 free AI analyses.</p>
            <Link href="/register" className="btn-primary mx-auto inline-flex">
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
