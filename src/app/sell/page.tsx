import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import SellClient from '@/components/land/SellClient';

export const metadata: Metadata = {
  title: 'List Your Land – Sell or Lease Land in Bangladesh | Eland',
  description: 'List your land for sale or lease on Eland. Reach thousands of verified investors. AI-verified listings get 5x more inquiries.',
};

export default function SellPage() {
  return (
    <MainLayout>
      <div className="py-10">
        <div className="page-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-4xl text-white mb-3">List Your Land</h1>
            <p className="text-gray-400 text-lg">Reach 5,000+ verified investors across Bangladesh.</p>
          </div>
          <SellClient />
        </div>
      </div>
    </MainLayout>
  );
}
