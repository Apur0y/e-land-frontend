'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, ArrowRight, MapPin } from 'lucide-react';

export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <section ref={ref} className="py-24">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-950 to-surface-card border border-brand-800 p-12 lg:p-20 text-center"
        >
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 mb-6 shadow-glow-lg mx-auto">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
              Ready to Invest Smarter?
            </h2>
            <p className="text-xl text-brand-200 mb-10 max-w-2xl mx-auto">
              Join 5,000+ investors who use LandIQ to make confident land investment decisions backed by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary text-base px-8 py-4">
                <Brain className="w-5 h-5" />
                Start Free Today <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/listings" className="btn-secondary text-base px-8 py-4 border-brand-700 hover:border-brand-500">
                <MapPin className="w-5 h-5" />
                Browse Listings
              </Link>
            </div>
            <p className="text-brand-400 text-sm mt-6">No credit card required • 10 free AI analyses included</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
