import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ListingsClient from '@/components/land/ListingsClient';

export const metadata: Metadata = {
  title: 'Browse Land Listings – Buy & Sell Land in Bangladesh',
  description: 'Find the best land for sale across Bangladesh. Filter by city, district, price, area type and get instant AI analysis on any listing.',
  openGraph: { title: 'Browse Land Listings | LandIQ', description: 'AI-powered land listings across Bangladesh.' },
};

export default function ListingsPage() {
  return (
    <MainLayout>
      <ListingsClient />
    </MainLayout>
  );
}
