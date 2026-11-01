import type { Metadata, Viewport } from 'next';
import { Fraunces, Figtree, Caveat } from 'next/font/google';
import './globals.css';
import ScrollPup from '@/components/ScrollPup';
import PawTrail from '@/components/PawTrail';
import SmoothScroll from '@/components/SmoothScroll';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/site-config';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['700', '800', '900'],
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Premium Teacup Puppies in ${SITE_CONFIG.city}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: `Discover healthy, vet-checked teacup & toy puppies in ${SITE_CONFIG.city}. Boutique showroom visits, global pedigree imports, and personalized door-to-door delivery. Every puppy is family.`,
  keywords: [
    'teacup puppies Dubai',
    'toy poodle Dubai',
    'maltipoo puppy Dubai',
    'pomeranian boutique',
    'luxury puppy boutique',
    'cavapoo Dubai',
    'ethical puppy breeders UAE',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — Premium Teacup Puppies in ${SITE_CONFIG.city}`,
    description: `Healthy, registered toy & teacup puppies with comprehensive health warranties, microchips, and VIP delivery across ${SITE_CONFIG.city} & UAE.`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — Luxury Puppy Boutique`,
    description: 'Every puppy is family. Premium teacup & toy companions in Dubai.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#fffdf8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${caveat.variable} selection:bg-peach selection:text-ink`}
    >
      <body className="bg-bg text-ink min-h-screen flex flex-col font-sans antialiased relative">
        <SmoothScroll />
        <PawTrail />
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-caramel focus:text-white focus:font-bold focus:rounded-full focus:shadow-chunky-caramel"
        >
          Skip to main content
        </a>

        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ScrollPup />
      </body>
    </html>
  );
}
