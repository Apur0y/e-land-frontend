'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, TrendingUp, Shield, BarChart3, GitCompare, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

const tools = [
  { icon: Brain, title: 'Land Analyzer', desc: 'Full AI-powered land scoring & report', href: '/ai/analyze', color: 'brand' },
  { icon: TrendingUp, title: 'Price Prediction', desc: '5-year price forecast by area', href: '/ai/price-prediction', color: 'blue' },
  { icon: Shield, title: 'Risk Analysis', desc: 'Flood, legal & infrastructure risks', href: '/ai/risk', color: 'yellow' },
  { icon: BarChart3, title: 'Rental Yield', desc: 'ROI & rental income calculator', href: '/ai/rental-yield', color: 'emerald' },
  { icon: GitCompare, title: 'Compare', desc: 'Smart 3-property comparison', href: '/ai/compare', color: 'purple' },
  { icon: Briefcase, title: 'Construction ROI', desc: 'Build & profit calculator', href: '/ai/construction-roi', color: 'orange' },
];

const colorMap: any = {
  brand: { text: 'text-brand-400', bg: 'bg-brand-950 border-brand-900', glow: 'shadow-glow' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-950 border-blue-900', glow: '' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-950 border-yellow-900', glow: '' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-950 border-emerald-900', glow: '' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-950 border-purple-900', glow: '' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-950 border-orange-900', glow: '' },
};

export default function AIShowcase() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section ref={ref} className="py-24">
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-950 border border-brand-900 rounded-full text-sm text-brand-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Gemini AI Powered
            </div>
            <h2 className="section-title mb-6">
              AI Tools That Give You an <span className="gradient-text">Unfair Advantage</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Our suite of 6 AI tools uses Google's Gemini model to analyze land from every angle — price, risk, ROI, and growth potential. Make data-driven decisions, not guesswork.
            </p>
            <ul className="space-y-3 mb-8">
              {['Instant analysis in under 30 seconds', 'Contextual Bangladesh market knowledge', 'Downloadable PDF reports', 'Unlimited comparisons with Pro plan'].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/ai/analyze" className="btn-primary">
              <Brain className="w-4 h-4" /> Try AI Analysis Free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {tools.map((tool, i) => {
              const c = colorMap[tool.color];
              return (
                <motion.div key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={tool.href} className="card-hover p-5 flex flex-col gap-3 group block">
                    <div className={`w-10 h-10 rounded-xl border ${c.bg} flex items-center justify-center ${c.glow} group-hover:scale-110 transition-transform`}>
                      <tool.icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{tool.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${c.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
