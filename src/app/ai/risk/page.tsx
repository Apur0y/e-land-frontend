import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import RiskAnalysisTool from '@/components/ai/RiskAnalysisTool';
export const metadata: Metadata = { title: 'Risk Analysis – Land Investment Risk Assessment | LandIQ', description: 'Identify flood risks, legal issues, infrastructure gaps, and market risks for any land in Bangladesh using AI.' };
export default function RiskPage() {
  return <MainLayout><div className="py-10"><div className="page-container max-w-3xl mx-auto"><div className="text-center mb-10"><h1 className="font-display font-bold text-4xl text-white mb-3">Risk Analysis</h1><p className="text-gray-400 text-lg">Identify all risks before you invest.</p></div><RiskAnalysisTool /></div></div></MainLayout>;
}
