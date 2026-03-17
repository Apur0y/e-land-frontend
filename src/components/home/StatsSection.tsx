'use client';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, MapPin, Users, FileText, Brain, Star } from 'lucide-react';

const stats = [
  { icon: MapPin, value: 10000, suffix: '+', label: 'Land Listings', color: 'text-brand-400' },
  { icon: Users, value: 5000, suffix: '+', label: 'Active Investors', color: 'text-blue-400' },
  { icon: Brain, value: 50000, suffix: '+', label: 'AI Reports Generated', color: 'text-purple-400' },
  { icon: TrendingUp, value: 98, suffix: '%', label: 'Prediction Accuracy', color: 'text-yellow-400' },
  { icon: FileText, value: 64, suffix: '', label: 'Districts Covered', color: 'text-emerald-400' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'User Rating', color: 'text-orange-400', decimals: 1 },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <section ref={ref} className="py-16 border-y border-surface-border bg-surface-card/30">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <p className={`font-display font-bold text-2xl lg:text-3xl ${stat.color}`}>
                {inView ? (
                  <CountUp end={stat.value} duration={2} decimals={stat.decimals || 0} suffix={stat.suffix} />
                ) : '0'}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
