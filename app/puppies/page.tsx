import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { PuppyGalleryClient } from '@/components/puppies/PuppyGalleryClient';
import { SITE_CONFIG } from '@/lib/site-config';
import { PawIcon } from '@/components/ui/PawIcon';

export const metadata: Metadata = {
  title: 'Available Teacup & Toy Puppies',
  description:
    'Browse our available Maltipoo, Pomeranian, Toy Poodle, Cavapoo, and Shih Tzu puppies in Dubai. Filter by breed, showroom status, or imported pedigrees.',
  openGraph: {
    title: `Available Puppies | ${SITE_CONFIG.name}`,
    description: `Healthy, registered toy & teacup puppies ready for forever homes in ${SITE_CONFIG.city}.`,
  },
};

export default function PuppiesPage() {
  return (
    <div className="py-12 sm:py-20 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <PawIcon className="w-4 h-4 fill-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">our nursery collection</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-ink tracking-tight mb-4">
            Available puppies in {SITE_CONFIG.city}
          </h1>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            Every puppy is family. Filter by breed, showroom availability, or gender. Book a private
            nursery viewing in Business Bay or request a high-res 4K nursery video.
          </p>
        </div>

        {/* Client Gallery with Suspense */}
        <Suspense
          fallback={
            <div className="h-96 rounded-3xl bg-cream-100/50 animate-pulse border-2 border-ink/15 flex items-center justify-center">
              <span className="font-accent text-2xl text-caramel">Loading companions...</span>
            </div>
          }
        >
          <PuppyGalleryClient />
        </Suspense>
      </div>
    </div>
  );
}

