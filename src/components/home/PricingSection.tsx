'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Zap, Crown, Building2 } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: '৳0',
    period: 'forever',
    desc: 'Perfect for getting started',
    color: 'text-gray-400',
    features: ['10 AI analyses per month', 'Basic land listing view', 'Price prediction (basic)', 'Email support', '1 saved property'],
    cta: 'Get Started Free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '৳999',
    period: 'per month',
    desc: 'For serious investors',
    color: 'text-brand-400',
    features: ['100 AI analyses per month', 'Full risk analysis', 'Rental yield calculator', 'Construction ROI tool', 'Smart 3-property comparison', 'PDF report downloads', '20 saved properties', 'Priority support'],
    cta: 'Start Pro Plan',
    href: '/register?plan=pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    icon: Building2,
    price: '৳3,999',
    period: 'per month',
    desc: 'For agencies & developers',
    color: 'text-purple-400',
    features: ['Unlimited AI analyses', 'Bulk property analysis', 'API access', 'White-label reports', 'Team collaboration (5 users)', 'Custom market reports', 'Dedicated account manager', 'Custom AI model training'],
    cta: 'Contact Sales',
    href: '/contact',
    highlight: false,
  },
];

export default function PricingSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section ref={ref} className="py-24 bg-surface-card/20" id="pricing">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="text-brand-400 font-medium mb-3 text-sm uppercase tracking-wider">Simple Pricing</p>
          <h2 className="section-title mb-4">Plans That Grow With You</h2>
          <p className="section-subtitle mx-auto">Start free, upgrade when you need more power.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-gradient-to-b from-brand-950 to-surface-card border-2 border-brand-600 shadow-glow-lg'
                  : 'card'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.highlight ? 'bg-brand-600 shadow-glow' : 'bg-surface border border-surface-border'}`}>
                  <plan.icon className={`w-5 h-5 ${plan.highlight ? 'text-white' : plan.color}`} />
                </div>
                <div>
                  <p className="font-bold text-white">{plan.name}</p>
                  <p className="text-xs text-gray-500">{plan.desc}</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="font-display font-bold text-4xl text-white">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-2">/{plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-brand-400' : 'text-gray-500'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={plan.highlight ? 'btn-primary text-center' : 'btn-secondary text-center'}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
