import type { Metadata, Viewport } from 'next';
import { Sora, Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Toaster } from 'react-hot-toast';

const interSans = Inter({ variable: '--font-geist-sans', subsets: ['latin'] });
const robotoMono = Roboto_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const sora = Sora({ variable: '--font-sora', subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eland.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Eland – AI-Powered Land Intelligence & Investment Platform',
    template: '%s | Eland',
  },
  description: 'Discover, analyze, and invest in land with AI-powered insights. Get price predictions, risk assessments, rental yield calculations, and smart property comparisons.',
  keywords: [
    'land investment Bangladesh', 'AI property analysis', 'land price prediction',
    'real estate investment', 'property risk analysis', 'land buy sell Bangladesh',
    'Dhaka land price', 'property rental yield', 'construction ROI calculator',
    'smart land comparison', 'plot for sale Bangladesh', 'land intelligence platform'
  ],
  authors: [{ name: 'Eland', url: siteUrl }],
  creator: 'Eland',
  publisher: 'Eland',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Eland',
    title: 'Eland – AI-Powered Land Intelligence Platform',
    description: 'Make smarter land investments with AI analysis, price predictions, and risk assessment.',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: 'Eland Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eland – AI Land Intelligence Platform',
    description: 'AI-powered land analysis, price predictions, and investment insights.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@eland',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f1117',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/eland.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Eland',
              url: siteUrl,
              description: 'AI-powered land intelligence and investment platform',
              potentialAction: {
                '@type': 'SearchAction',
                target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/listings?search={search_term_string}` },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${interSans.variable} ${robotoMono.variable} ${sora.variable} font-sans bg-surface text-white antialiased`}>
        <Providers>
          {children}
          <Toaster position="top-right" toastOptions={{
            style: { background: '#161b27', color: '#fff', border: '1px solid #1e2736' },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }} />
        </Providers>
      </body>
    </html>
  );
}
