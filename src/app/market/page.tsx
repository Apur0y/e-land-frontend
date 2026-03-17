import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import MarketClient from '@/components/market/MarketClient';

export const metadata: Metadata = {
  title: 'Market Insights – Bangladesh Land Price Trends | LandIQ',
  description: 'Track land price trends, market statistics, and investment hotspots across all 64 districts of Bangladesh with real-time data.',
};

export default function MarketPage() {
  return (
    <MainLayout>
      <div className="py-10">
        <div className="page-container">
          <div className="mb-10">
            <h1 className="font-display font-bold text-4xl text-white mb-3">Market Insights</h1>
            <p className="text-gray-400 text-lg">Live land market data across Bangladesh.</p>
          </div>
          <MarketClient />
        </div>
      </div>
    </MainLayout>
  );
}
