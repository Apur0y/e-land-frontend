'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, TrendingUp, Shield, BarChart3, GitCompare, Briefcase, MapPin, Bell, FileText } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Land Analysis',
    description: 'Get a comprehensive 100-point AI score covering investment potential, risk, location quality, and growth outlook.',
    color: 'text-brand-400',
    bg: 'bg-brand-950 border-brand-900',
    badge: 'Core Feature',
  },
  {
    icon: TrendingUp,
    title: '5-Year Price Prediction',
    description: 'AI-powered price forecasting based on historical data, infrastructure development, and market trends.',
    color: 'text-blue-400',
    bg: 'bg-blue-950 border-blue-900',
    badge: 'Popular',
  },
  {
    icon: Shield,
    title: 'Risk Analysis',
    description: 'Identify flood zones, legal risks, road development impact, government projects, and environmental hazards.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-950 border-yellow-900',
    badge: null,
  },
  {
    icon: BarChart3,
    title: 'Rental Yield Estimator',
    description: 'Calculate expected rental income, net yield, occupancy rates, and payback periods for any property.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950 border-emerald-900',
    badge: null,
  },
  {
    icon: GitCompare,
    title: 'Smart Comparison',
    description: 'Compare up to 3 properties side-by-side with AI-scored metrics to find the best investment.',
    color: 'text-purple-400',
    bg: 'bg-purple-950 border-purple-900',
    badge: null,
  },
  {
    icon: Briefcase,
    title: 'Construction ROI',
    description: 'Calculate full ROI for building on land — construction costs, rental income, resale value, and break-even timeline.',
    color: 'text-orange-400',
    bg: 'bg-orange-950 border-orange-900',
    badge: null,
  },
  {
    icon: MapPin,
    title: 'Market Intelligence',
    description: 'Track price trends by district, city growth rates, upcoming infrastructure projects, and hot investment zones.',
    color: 'text-red-400',
    bg: 'bg-red-950 border-red-900',
    badge: null,
  },
  {
    icon: Bell,
    title: 'Price Alerts',
    description: 'Set price alerts for specific areas and get notified when land prices match your investment criteria.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-950 border-cyan-900',
    badge: 'Coming Soon',
  },
  {
    icon: FileText,
    title: 'Downloadable Reports',
    description: 'Generate and download professional PDF reports of any AI analysis to share with partners or banks.',
    color: 'text-teal-400',
    bg: 'bg-teal-950 border-teal-900',
    badge: null,
  },
];

export default function FeaturesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-24">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-brand-400 font-medium mb-3 text-sm uppercase tracking-wider">Everything You Need</p>
          <h2 className="section-title mb-4">Platform Features</h2>
          <p className="section-subtitle mx-auto">
            A complete land intelligence ecosystem powered by Gemini AI — from analysis to action.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="card-hover p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl border ${feat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feat.icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                {feat.badge && (
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    feat.badge === 'Core Feature' ? 'bg-brand-950 text-brand-400 border border-brand-800' :
                    feat.badge === 'Popular' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                    'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}>
                    {feat.badge}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{feat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
