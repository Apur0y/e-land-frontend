import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import FeaturedListings from '@/components/home/FeaturedListings';
import AIShowcase from '@/components/home/AIShowcase';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Eland – AI-Powered Land Intelligence & Investment Platform Bangladesh',
  description: 'Find, analyze, and invest in land across Bangladesh with AI. Get price predictions, risk analysis, rental yield estimates, and smart property comparisons.',
};

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <FeaturedListings />
      <AIShowcase />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <CTASection />
    </MainLayout>
  );
}
