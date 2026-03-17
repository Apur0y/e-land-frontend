'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { landAPI } from '@/lib/api';
import { MapPin, ArrowRight, TrendingUp, Loader2 } from 'lucide-react';
import LandCard from '@/components/land/LandCard';

export default function FeaturedListings() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { data, isLoading } = useQuery({
    queryKey: ['featured-listings'],
    queryFn: () => landAPI.featured(),
    staleTime: 5 * 60 * 1000,
  });

  const listings = data?.data?.data || [];

  return (
    <section ref={ref} className="py-24 bg-surface-card/20">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-brand-400 font-medium mb-3 text-sm uppercase tracking-wider">Top Picks</p>
            <h2 className="section-title">Featured Listings</h2>
          </div>
          <Link href="/listings" className="btn-secondary hidden sm:flex text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listings.map((land: any, i: number) => (
              <motion.div key={land._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 }}
              >
                <LandCard land={land} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Demo cards when no data */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {demoListings.map((land, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                className="card-hover overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-surface-hover to-surface-card relative">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge-green text-xs">{land.type}</span>
                    {land.featured && <span className="badge bg-yellow-950 text-yellow-400 border border-yellow-800 text-xs">Featured</span>}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-surface/80 backdrop-blur-sm rounded-lg px-2 py-1">
                    <p className="text-xs font-bold text-brand-400">{land.score}/100 AI Score</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">{land.title}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5" /> {land.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{land.price}</p>
                      <p className="text-xs text-gray-500">{land.area}</p>
                    </div>
                    <div className="flex items-center gap-1 text-brand-400 text-sm">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{land.growth}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/listings" className="btn-secondary text-sm">
            View All Listings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const demoListings = [
  { title: 'Prime Commercial Plot, Gulshan', location: 'Gulshan-2, Dhaka', price: '৳4.5 Crore', area: '5 Katha', type: 'Commercial', score: 92, growth: '+28%', featured: true },
  { title: 'Residential Land Near Airport', location: 'Uttara, Dhaka', price: '৳1.8 Crore', area: '3 Katha', type: 'Residential', score: 85, growth: '+21%', featured: false },
  { title: 'Agricultural Land, Comilla', location: 'Comilla Sadar', price: '৳45 Lakh', area: '2 Bigha', type: 'Agricultural', score: 73, growth: '+15%', featured: false },
  { title: 'Corner Plot, Bashundhara R/A', location: 'Bashundhara, Dhaka', price: '৳3.2 Crore', area: '5 Katha', type: 'Residential', score: 88, growth: '+24%', featured: true },
  { title: 'Industrial Zone Plot', location: 'Gazipur, Dhaka', price: '৳2.1 Crore', area: '10 Katha', type: 'Industrial', score: 79, growth: '+18%', featured: false },
  { title: 'Beachfront Land, Cox\'s Bazar', location: "Cox's Bazar", price: '৳6.0 Crore', area: '4 Katha', type: 'Commercial', score: 95, growth: '+35%', featured: true },
];
