'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MapPin, Plane, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function TwoWaysSection() {
  return (
    <section className="py-20 sm:py-28 bg-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">how you meet</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-4">
            Two ways to meet your puppy
          </h2>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            Whether you want to cuddle puppies today in our Dubai boutique or import a rare micro teacup
            pedigree tailored to your exact desires, we guide every step with heartfelt care.
          </p>
        </div>

        {/* Two Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: In Our Showroom */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border-2 border-ink bg-cream-50 p-6 sm:p-8 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all group"
          >
            <div>
              {/* Image Frame */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl border-2 border-ink overflow-hidden mb-6 bg-cream-200">
                <Image
                  src="/media/showroom.jpg"
                  alt="Petite Paws Dubai Boutique Showroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold text-ink flex items-center gap-1.5 shadow-sm border border-ink/10">
                  <MapPin className="w-3.5 h-3.5 text-caramel" />
                  <span>Business Bay, Dubai</span>
                </div>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-cream text-ink text-xs font-bold border border-caramel/20">
                  Ready Same-Day
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-ink text-xs font-bold border border-ink/10">
                  Private Nursery Playdates
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-ink text-xs font-bold border border-ink/10">
                  Vet Inspected
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-ink mb-3">
                In our showroom
              </h3>
              <p className="text-ink/80 text-sm sm:text-base leading-relaxed mb-6">
                Step into our boutique oasis in Bay Square. Interact with our healthy, playful teacup
                puppies in a quiet, sanitized playroom. Receive your puppy’s full health book, pedigree
                registration, and welcome basket on the very same day.
              </p>

              <ul className="space-y-2 mb-8 text-xs sm:text-sm text-ink/85">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-caramel shrink-0" />
                  <span>Immediate companionship — take your puppy home today</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-caramel shrink-0" />
                  <span>Pre-transitioned to Dubai climate & toilet pad habits</span>
                </li>
              </ul>
            </div>

            <Button
              href="/puppies?origin=local"
              variant="primary"
              size="lg"
              className="w-full shadow-chunky-caramel"
            >
              <span>Explore showroom puppies</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </motion.div>

          {/* Card 2: Imported For You */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border-2 border-ink bg-cream-50 p-6 sm:p-8 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all group"
          >
            <div>
              {/* Image Frame */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl border-2 border-ink overflow-hidden mb-6 bg-cream-200">
                <Image
                  src="/media/import.jpg"
                  alt="VIP Puppy Flight Nanny Import"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold text-ink flex items-center gap-1.5 shadow-sm border border-ink/10">
                  <Plane className="w-3.5 h-3.5 text-caramel" />
                  <span>South Korea & Europe</span>
                </div>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-peach text-ink text-xs font-bold border border-caramel/20">
                  Elite Bloodlines
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-ink text-xs font-bold border border-ink/10">
                  VIP Flight Nanny Handover
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-ink text-xs font-bold border border-ink/10">
                  MOCCAE Customs Cleared
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-ink mb-3">
                Imported for you
              </h3>
              <p className="text-ink/80 text-sm sm:text-base leading-relaxed mb-6">
                Looking for a micro baby-doll Pomeranian or an ultra-tiny phantom Toy Poodle? We source
                directly from South Korea’s top champion nurseries. Hand-carried in passenger cabins by our
                professional flight nannies directly to your residence.
              </p>

              <ul className="space-y-2 mb-8 text-xs sm:text-sm text-ink/85">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-caramel shrink-0" />
                  <span>Custom breed, size, coat color & gender matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-caramel shrink-0" />
                  <span>Full MOCCAE Ministry clearances & veterinary passport included</span>
                </li>
              </ul>
            </div>

            <Button
              href="/puppies?origin=imported"
              variant="secondary"
              size="lg"
              className="w-full"
            >
              <span>Explore imported puppies</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
