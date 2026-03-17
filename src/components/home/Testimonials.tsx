'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rafiqul Islam', role: 'Real Estate Investor, Dhaka', avatar: 'RI', rating: 5, text: "LandIQ's AI analysis saved me from a bad investment. The risk report flagged a flood zone issue I completely missed. Now I use it before every purchase.", profit: 'Saved ৳40 Lakh' },
  { name: 'Nasrin Begum', role: 'Property Developer, Chittagong', avatar: 'NB', rating: 5, text: 'The price prediction tool is incredibly accurate. I bought land in Patenga based on the AI forecast and sold it 18 months later at exactly the predicted price.', profit: '+৳1.2 Crore Profit' },
  { name: 'Tanvir Ahmed', role: 'Land Agent, Sylhet', avatar: 'TA', rating: 5, text: "I use the comparison tool for all my clients. It makes my job easier and clients trust data-backed recommendations. Best investment I've made for my business.", profit: '3x More Clients' },
  { name: 'Shirin Akter', role: 'Investor, Rajshahi', avatar: 'SA', rating: 5, text: 'The construction ROI calculator helped me decide to build apartments instead of just holding land. The AI was right — rental income is far better than I expected.', profit: '18% Annual Yield' },
  { name: 'Kamal Hossain', role: 'Retired Officer, Comilla', avatar: 'KH', rating: 5, text: 'As someone new to land investment, the AI reports gave me confidence. The language is simple, the data is clear, and the verdict made my decision easy.', profit: 'First Investment Success' },
  { name: 'Farhana Khanam', role: 'NRB Investor, London', avatar: 'FK', rating: 5, text: "Managing investment from abroad is hard. LandIQ lets me analyze Bangladesh land remotely with complete data. The risk analysis is particularly valuable for NRBs.", profit: '৳2.8 Crore Portfolio' },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section ref={ref} className="py-24">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="text-brand-400 font-medium mb-3 text-sm uppercase tracking-wider">Real Results</p>
          <h2 className="section-title mb-4">Trusted by Investors Across Bangladesh</h2>
          <p className="section-subtitle mx-auto">See how LandIQ is transforming land investment decisions.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="card p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-800 flex items-center justify-center font-bold text-brand-200 text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <Quote className="w-5 h-5 text-brand-800 flex-shrink-0" />
              </div>
              <div className="flex gap-0.5">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="pt-3 border-t border-surface-border">
                <span className="badge-green text-xs">{t.profit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
