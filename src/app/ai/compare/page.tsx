import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ComparePropertiesTool from '@/components/ai/ComparePropertiesTool';
export const metadata: Metadata = { title: 'Compare Properties – Smart Land Comparison | LandIQ' };
export default function ComparePage() {
  return <MainLayout><div className="py-10"><div className="page-container max-w-5xl mx-auto"><div className="text-center mb-10"><h1 className="font-display font-bold text-4xl text-white mb-3">Compare Properties</h1><p className="text-gray-400 text-lg">Compare up to 3 properties side-by-side with AI scoring.</p></div><ComparePropertiesTool /></div></div></MainLayout>;
}
