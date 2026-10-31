import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Sparkles,
  Plane,
  ShieldCheck,
  Truck,
  Heart,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';
import { PawIcon } from '@/components/ui/PawIcon';

export const metadata: Metadata = {
  title: 'How It Works & VIP Delivery',
  description:
    'Learn how our ethical teacup puppy adoption and flight nanny delivery works in Dubai and across the UAE.',
};

export default function HowItWorksPage() {
  return (
    <div className="py-12 sm:py-20 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <PawIcon className="w-4 h-4 fill-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">our adoption process</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-ink tracking-tight mb-4">
            How it works
          </h1>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            Adopting a teacup companion should be transparent, exciting, and filled with confidence.
            Here is our detailed three-step process from initial consultation to homecoming.
          </p>
        </div>

        {/* The 3 Steps in Detail */}
        <div className="space-y-16 sm:space-y-24 mb-24">
          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream text-caramel-dark text-xs font-bold mb-3">
                <span>Step 01</span>
                <span>• Matchmaking</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-ink mb-4">
                Choose your breed & lifestyle fit
              </h2>
              <p className="text-sm sm:text-base text-ink/80 leading-relaxed mb-6">
                Every family dynamic is unique. Whether you live in a Downtown apartment looking for a
                calm, hypoallergenic Maltipoo or desire an energetic miniature Pomeranian for your villa,
                our concierge discusses your preferences, allergies, travel habits, and nursery expectations.
              </p>
              <ul className="space-y-2.5 text-sm text-ink/85 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>Curated pedigree bloodlines from South Korea and Europe</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>Hypoallergenic single-coat consultations for sensitive families</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>Adult size and weight projections backed by parent lineage</span>
                </li>
              </ul>
              <Button href="/puppies" variant="primary" size="md">
                Browse available breeds
              </Button>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative w-full h-80 sm:h-96 rounded-3xl border-2 border-ink overflow-hidden bg-cream-100 shadow-card">
                <Image
                  src="/media/hero-1.jpg"
                  alt="Choosing a puppy breed"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative w-full h-80 sm:h-96 rounded-3xl border-2 border-ink overflow-hidden bg-cream-100 shadow-card">
                <Image
                  src="/media/showroom.jpg"
                  alt="Private showroom playdate"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream text-caramel-dark text-xs font-bold mb-3">
                <span>Step 02</span>
                <span>• Verification</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-ink mb-4">
                Get nursery 4K videos & veterinary checks
              </h2>
              <p className="text-sm sm:text-base text-ink/80 leading-relaxed mb-6">
                Transparency is at the heart of everything we do. Before making any commitment, you
                receive high-definition 4K videos of your puppy playing, eating, and interacting.
                You can also visit our sanitized Bay Square showroom for a private 1-on-1 play session.
              </p>
              <ul className="space-y-2.5 text-sm text-ink/85 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>Official veterinary passport, microchip number & vaccine verification</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>1-Year Genetic Health Warranty documentation signed upfront</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>Live WhatsApp video calls directly with your prospective puppy</span>
                </li>
              </ul>
              <Button href="/contact" variant="secondary" size="md">
                Schedule showroom viewing
              </Button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream text-caramel-dark text-xs font-bold mb-3">
                <span>Step 03</span>
                <span>• Homecoming</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-ink mb-4">
                White-glove delivery & lifetime aftercare
              </h2>
              <p className="text-sm sm:text-base text-ink/80 leading-relaxed mb-6">
                Your puppy arrives at your home relaxed, clean, and accompanied by a comprehensive luxury
                starter kit. Our specialist spends time showing you initial feeding routines, crate
                placement, and welcomes you into our 24/7 client care circle.
              </p>
              <ul className="space-y-2.5 text-sm text-ink/85 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>Luxury homecoming hamper with blankets, food starter, and essentials</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>Direct 24/7 WhatsApp concierge hotline for questions anytime</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span>Complimentary first veterinary wellness consultation in Dubai</span>
                </li>
              </ul>
              <a
                href="#delivery"
                className="text-sm font-bold text-caramel hover:text-caramel-dark underline decoration-caramel/30 underline-offset-4"
              >
                Read full VIP Delivery specifications below ↓
              </a>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative w-full h-80 sm:h-96 rounded-3xl border-2 border-ink overflow-hidden bg-cream-100 shadow-card">
                <Image
                  src="/media/import.jpg"
                  alt="White-glove puppy handover"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Anchor Section: #delivery */}
        <section
          id="delivery"
          className="scroll-mt-24 rounded-3xl border-2 border-ink bg-cream-50 p-8 sm:p-14 mb-20 shadow-card"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
              <Truck className="w-4 h-4 text-caramel" />
              <span className="font-accent text-xl text-caramel font-bold">safe transit standards</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-4">
              VIP delivery across Dubai, UAE & GCC
            </h2>
            <p className="text-ink/80 text-sm sm:text-base leading-relaxed">
              We understand that transporting young teacup companions requires extraordinary gentleness.
              Here is how we protect your puppy’s comfort every kilometer of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
            <div className="rounded-2xl border-2 border-ink bg-white p-6">
              <div className="w-12 h-12 rounded-xl bg-cream border border-caramel/20 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-caramel" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                Climate-Controlled Dubai Transit
              </h3>
              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                Local handovers travel in sanitized, temperature-regulated Mercedes/Range Rover fleet
                vehicles maintained at a constant 22°C to prevent any heat stress.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-ink bg-white p-6">
              <div className="w-12 h-12 rounded-xl bg-cream border border-caramel/20 flex items-center justify-center mb-4">
                <Plane className="w-6 h-6 text-caramel" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                In-Cabin Flight Nanny
              </h3>
              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                Imported puppies NEVER travel in airline cargo holds. Our flight nannies keep them inside
                the passenger cabin directly beside their seat for constant hydration and comfort.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-ink bg-white p-6">
              <div className="w-12 h-12 rounded-xl bg-cream border border-caramel/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-caramel" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                MOCCAE Ministry Clearances
              </h3>
              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                We handle all official UAE Ministry of Climate Change & Environment import permits,
                quarantine documentation, and microchip registration on your behalf.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              href={getWhatsAppLink('Hi! I would like to enquire about delivery options to my location.')}
              isExternal
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-5 h-5 fill-white/20" />}
            >
              Enquire about delivery to your address
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

