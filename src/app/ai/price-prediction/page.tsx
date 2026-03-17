import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PricePredictionTool from '@/components/ai/PricePredictionTool';

export const metadata: Metadata = {
  title: 'AI Price Prediction – 5-Year Land Price Forecast Bangladesh',
  description: 'Get AI-powered 5-year land price predictions for any area in Bangladesh based on market trends, infrastructure development, and economic indicators.',
};

export default function PricePredictionPage() {
  return (
    <MainLayout>
      <div className="py-10">
        <div className="page-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-4xl text-white mb-3">Price Prediction</h1>
            <p className="text-gray-400 text-lg">AI-powered 5-year land price forecast for any location.</p>
          </div>
          <PricePredictionTool />
        </div>
      </div>
    </MainLayout>
  );
}
