import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Pricing – LandIQ Plans & Features',
  description: 'Choose the right plan for your land investment needs. Start free, upgrade anytime. Pro plan includes 100 AI analyses per month.',
};

export default function PricingPage() {
  return (
    <MainLayout>
      <div className="pt-10">
        <div className="page-container text-center mb-4">
          <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Transparent Pricing</p>
          <h1 className="font-display font-bold text-5xl text-white mb-4">Simple, Honest Plans</h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            No hidden fees. No long-term contracts. Start free and scale as you grow.
          </p>
        </div>
        <PricingSection />
        <CTASection />
      </div>
    </MainLayout>
  );
}
