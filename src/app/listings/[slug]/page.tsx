import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import LandDetailClient from '@/components/land/LandDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/land/${params.slug}`, { next: { revalidate: 60 } });
    const data = await res.json();
    const land = data?.data;
    if (!land) return { title: 'Land Listing | Eland' };
    return {
      title: `${land.metaTitle || land.title} | Eland`,
      description: land.metaDescription || land.description?.substring(0, 160),
      openGraph: {
        title: land.title,
        description: land.description?.substring(0, 160),
        images: land.images?.[0]?.url ? [{ url: land.images[0].url }] : [],
      },
    };
  } catch {
    return { title: 'Land Listing | Eland' };
  }
}

export default function LandDetailPage({ params }: { params: { slug: string } }) {
  return (
    <MainLayout>
      <LandDetailClient slug={params.slug} />
    </MainLayout>
  );
}
