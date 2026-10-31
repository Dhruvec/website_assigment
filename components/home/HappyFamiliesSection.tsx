'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { PawIcon } from '@/components/ui/PawIcon';

export function HappyFamiliesSection() {
  const featured = TESTIMONIALS[0];
  // 8 photos for the infinite marquee
  const marqueeItems = TESTIMONIALS.slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <Heart className="w-4 h-4 fill-caramel text-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">forever love stories</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-4">
            Happy families
          </h2>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            See our beloved alumni thriving in their forever homes across Dubai and the Emirates.
            Nothing brings us deeper fulfillment than seeing each little tail wag.
          </p>
        </div>

        {/* One Large Featured Quote Card */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl border-2 border-ink bg-cream-50 p-6 sm:p-10 shadow-card mb-16 relative overflow-hidden"
        >
          <Quote className="absolute top-6 right-6 w-20 h-20 text-caramel/10 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 shrink-0 rounded-2xl border-2 border-ink overflow-hidden shadow-md">
              <Image
                src={featured.image}
                alt={`${featured.customerName} with ${featured.puppyName}`}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/95 text-xs font-bold shadow-sm">
                {featured.emoji} {featured.puppyName}
              </span>
            </div>

            <div className="flex flex-col text-center md:text-left">
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1 mb-3 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
                ))}
              </div>

              <blockquote className="font-display text-lg sm:text-xl md:text-2xl text-ink font-semibold italic leading-relaxed mb-4">
                “{featured.quote}”
              </blockquote>

              <div>
                <div className="font-bold text-base text-ink">{featured.customerName}</div>
                <div className="text-xs sm:text-sm text-ink-muted">
                  {featured.location} • Adopter of {featured.puppyName} ({featured.breed})
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Horizontal Scrolling Marquee of 8 photos with emoji captions */}
      <div className="relative w-full overflow-hidden py-4 border-y border-caramel/15 bg-cream/30">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4 sm:gap-6">
          {/* Double items for seamless infinite scroll */}
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-56 sm:w-64 rounded-2xl border-2 border-ink overflow-hidden bg-white shadow-card flex-shrink-0 group cursor-pointer"
            >
              <div className="relative w-full h-56 sm:h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.puppyName} in forever home`}
                  fill
                  sizes="260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-ink shadow-sm">
                  {item.emoji} {item.puppyName}
                </div>
              </div>

              <div className="p-3 bg-white">
                <div className="text-xs font-bold text-ink truncate">{item.customerName}</div>
                <div className="text-[11px] text-ink/65 truncate">{item.breed} • {item.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          href="/happy-families"
          className="inline-flex items-center gap-2 text-base font-bold text-caramel hover:text-caramel-dark transition-colors underline decoration-caramel/30 underline-offset-4"
        >
          <span>See every happy family & photo wall</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
