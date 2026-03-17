import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import RentalYieldTool from '@/components/ai/RentalYieldTool';
export const metadata: Metadata = { title: 'Rental Yield Calculator – Land Investment ROI | LandIQ' };
export default function RentalYieldPage() {
  return <MainLayout><div className="py-10"><div className="page-container max-w-3xl mx-auto"><div className="text-center mb-10"><h1 className="font-display font-bold text-4xl text-white mb-3">Rental Yield Estimator</h1><p className="text-gray-400 text-lg">Calculate your expected rental income and ROI.</p></div><RentalYieldTool /></div></div></MainLayout>;
}
