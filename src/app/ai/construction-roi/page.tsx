import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ConstructionROITool from '@/components/ai/ConstructionROITool';
export const metadata: Metadata = { title: 'Construction ROI Calculator – Build & Profit Analysis | LandIQ' };
export default function ConstructionROIPage() {
  return <MainLayout><div className="py-10"><div className="page-container max-w-3xl mx-auto"><div className="text-center mb-10"><h1 className="font-display font-bold text-4xl text-white mb-3">Construction ROI Calculator</h1><p className="text-gray-400 text-lg">Analyze your full build-and-profit scenario with AI.</p></div><ConstructionROITool /></div></div></MainLayout>;
}
