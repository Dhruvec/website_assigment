import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MessageCircle,
  ShieldCheck,
  MapPin,
  Plane,
  Heart,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Calendar,
  FileCheck,
} from 'lucide-react';
import { PUPPIES, Puppy } from '@/data/puppies';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';
import { PuppyCard } from '@/components/puppies/PuppyCard';
import { PuppyDetailClient } from './PuppyDetailClient';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PUPPIES.map((puppy) => ({
    slug: puppy.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const puppy = PUPPIES.find((p) => p.slug === params.slug);
  if (!puppy) return { title: 'Puppy Not Found' };

  return {
    title: `${puppy.name} — ${puppy.breed} (${puppy.age})`,
    description: `Meet ${puppy.name}, a healthy, vet-checked ${puppy.breed} in Dubai. ${puppy.description}`,
    openGraph: {
      title: `${puppy.name} the ${puppy.breed} | ${SITE_CONFIG.name}`,
      description: puppy.description,
      images: [{ url: puppy.image, width: 800, height: 800, alt: puppy.name }],
    },
  };
}

export default function PuppyDetailPage({ params }: PageProps) {
  const puppy = PUPPIES.find((p) => p.slug === params.slug);

  if (!puppy) {
    notFound();
  }

  // Related puppies (same breed or available, excluding current)
  const relatedPuppies = PUPPIES.filter(
    (p) => p.id !== puppy.id && (p.breedCategory === puppy.breedCategory || p.status === 'available')
  ).slice(0, 3);

  const whatsappMessage = `Hi Petite Paws! I am interested in ${puppy.name} the ${puppy.breed} (${puppy.price}). Is ${puppy.name} still available for a nursery visit?`;

  return (
    <div className="py-10 sm:py-16 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/puppies"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-caramel transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all available puppies</span>
          </Link>
        </div>

        {/* Main Details Grid: Left Gallery + Right Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
          {/* Left Column: Interactive Image Gallery & Video Player */}
          <div className="lg:col-span-7">
            <PuppyDetailClient puppy={puppy} />
          </div>

          {/* Right Column: Puppy Specifications & Handover Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Status and Origin Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    puppy.status === 'available'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : puppy.status === 'reserved'
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  ● {puppy.status === 'available' ? 'Available' : puppy.status === 'reserved' ? 'Reserved' : 'Gone Home'}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cream text-caramel-dark flex items-center gap-1 border border-caramel/20">
                  {puppy.origin === 'local' ? (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-caramel" />
                      <span>{puppy.originDetails}</span>
                    </>
                  ) : (
                    <>
                      <Plane className="w-3.5 h-3.5 text-caramel" />
                      <span>{puppy.originDetails}</span>
                    </>
                  )}
                </span>
              </div>

              {/* Puppy Name and Price */}
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h1 className="font-display font-black text-4xl sm:text-5xl text-ink">
                  {puppy.name}
                </h1>
                <div className="font-display font-black text-2xl sm:text-3xl text-caramel">
                  {puppy.price}
                </div>
              </div>

              <div className="text-base font-bold text-caramel mb-4">
                {puppy.breed} • <span className="text-ink-muted">{puppy.sex === 'Boy' ? 'Boy ♂' : 'Girl ♀'}</span>
              </div>

              <p className="text-sm sm:text-base text-ink/80 leading-relaxed mb-6">
                {puppy.description}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-cream-50 border-2 border-ink/10 mb-6 text-xs sm:text-sm">
                <div>
                  <span className="text-ink-muted block text-xs">Current Age</span>
                  <span className="font-bold text-ink">{puppy.age}</span>
                </div>
                <div>
                  <span className="text-ink-muted block text-xs">Est. Adult Weight</span>
                  <span className="font-bold text-ink">{puppy.weight}</span>
                </div>
                <div>
                  <span className="text-ink-muted block text-xs">Coat Color</span>
                  <span className="font-bold text-ink">{puppy.coatColor}</span>
                </div>
                <div>
                  <span className="text-ink-muted block text-xs">Origin</span>
                  <span className="font-bold text-ink">
                    {puppy.origin === 'local' ? 'Dubai Nursery' : 'Imported Pedigree'}
                  </span>
                </div>
              </div>

              {/* Passport & Health Verification Box */}
              <div className="rounded-2xl border-2 border-dashed border-caramel/40 p-4 bg-white mb-6">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-ink mb-2">
                  <ShieldCheck className="w-4 h-4 text-caramel" />
                  <span>Official Health Certification</span>
                </div>
                <ul className="space-y-1.5 text-xs text-ink/75">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-whatsapp shrink-0" />
                    <span>Microchip ID: <strong className="font-mono text-ink">{puppy.passport.microchip}</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-whatsapp shrink-0" />
                    <span>Vaccines: {puppy.passport.vaccinations}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-whatsapp shrink-0" />
                    <span>Health Guarantee: {puppy.passport.healthWarranty}</span>
                  </li>
                </ul>
              </div>

              {/* Personality Highlights */}
              <div className="mb-8">
                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-2">
                  Personality & Temperament
                </span>
                <div className="flex flex-wrap gap-2">
                  {puppy.personality.map((trait, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-cream text-ink text-xs font-bold border border-caramel/20"
                    >
                      🐾 {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-ink/10">
              <Button
                href={getWhatsAppLink(whatsappMessage)}
                isExternal
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="w-5 h-5 fill-white/20" />}
                className="w-full"
              >
                Enquire on WhatsApp
              </Button>

              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Book showroom nursery playdate
              </Button>
            </div>
          </div>
        </div>

        {/* Related Puppies Section */}
        {relatedPuppies.length > 0 && (
          <div className="pt-16 border-t border-caramel/20">
            <div className="text-center sm:text-left mb-10">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
                Other companions you might adore
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Raised with the same gentle love in our boutique nursery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPuppies.map((p) => (
                <PuppyCard key={p.id} puppy={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
