'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Brain, TrendingUp, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Search, step: '01', title: 'Find or Enter Land Details', desc: 'Browse our listings or manually enter location, area, price, and features of any land you are considering.', color: 'text-brand-400', bg: 'bg-brand-950 border-brand-900' },
  { icon: Brain, step: '02', title: 'Run AI Analysis', desc: 'Our Gemini AI analyzes the land across 20+ parameters including market trends, risks, infrastructure, and government projects.', color: 'text-purple-400', bg: 'bg-purple-950 border-purple-900' },
  { icon: TrendingUp, step: '03', title: 'Get Deep Insights', desc: 'Receive a comprehensive report with overall score, price projections, risk factors, rental yield, and investment verdict.', color: 'text-blue-400', bg: 'bg-blue-950 border-blue-900' },
  { icon: CheckCircle, step: '04', title: 'Invest with Confidence', desc: 'Use AI-backed data to negotiate better prices, compare properties, and make the most profitable decision.', color: 'text-emerald-400', bg: 'bg-emerald-950 border-emerald-900' },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section ref={ref} className="py-24 bg-surface-card/20">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="text-brand-400 font-medium mb-3 text-sm uppercase tracking-wider">Simple Process</p>
          <h2 className="section-title mb-4">How LandIQ Works</h2>
          <p className="section-subtitle mx-auto">From raw land data to investment-grade insights in under a minute.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-surface-border to-transparent z-0" />
              )}
              <div className="card p-6 relative z-10 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl border ${step.bg} flex items-center justify-center`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <span className="font-display font-bold text-3xl text-surface-border">{step.step}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
