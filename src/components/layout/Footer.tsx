import Link from 'next/link';
import { Brain, MapPin, Mail, Phone, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-card border-t border-surface-border mt-24">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">Eland<span className="gradient-text"></span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Bangladesh's most advanced AI-powered land intelligence platform. Make smarter investments with data-driven insights.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Facebook, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-gray-400 hover:text-brand-400 hover:border-brand-700 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Gulshan-1, Dhaka-1212, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="mailto:info@eland.com" className="hover:text-white transition-colors">info@eland.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-white transition-colors">+880 1700-000000</a>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/listings', label: 'Browse Listings' },
                { href: '/sell', label: 'List Property' },
                { href: '/market', label: 'Market Insights' },
                { href: '/pricing', label: 'Pricing Plans' },
                { href: '/about', label: 'About Us' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="font-semibold text-white mb-4">AI Tools</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/ai/analyze', label: 'Land Analyzer' },
                { href: '/ai/price-prediction', label: 'Price Prediction' },
                { href: '/ai/risk', label: 'Risk Analysis' },
                { href: '/ai/rental-yield', label: 'Rental Yield' },
                { href: '/ai/compare', label: 'Compare Properties' },
                { href: '/ai/construction-roi', label: 'Construction ROI' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/cookies', label: 'Cookie Policy' },
                { href: '/disclaimer', label: 'Disclaimer' },
                { href: '/contact', label: 'Contact Us' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-surface rounded-xl border border-surface-border">
              <p className="text-xs text-gray-500 leading-relaxed">
                AI analysis is for informational purposes only. Always consult qualified professionals before making investment decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Eland. All rights reserved. Built for Bangladesh 🇧🇩
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Brain className="w-4 h-4 text-brand-400" />
            <span>Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
