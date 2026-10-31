'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/ui/Mascot';
import { Scallop } from '@/components/ui/Scallop';

const HERO_ARCHES = [
  { src: '/media/hero-1.jpg', alt: 'Teacup Maltipoo puppy', heightClass: 'h-48 sm:h-64 lg:h-72', mobileVisible: false },
  { src: '/media/hero-2.jpg', alt: 'Snow White Pomeranian puppy', heightClass: 'h-56 sm:h-72 lg:h-84', mobileVisible: true },
  { src: '/media/hero-3.jpg', alt: 'Red Toy Poodle puppy', heightClass: 'h-52 sm:h-68 lg:h-76', mobileVisible: true },
  { src: '/media/hero-4.jpg', alt: 'Ruby Cavapoo puppy', heightClass: 'h-60 sm:h-76 lg:h-88', mobileVisible: true },
  { src: '/media/hero-5.jpg', alt: 'Fluffy Bichon Frise puppy', heightClass: 'h-52 sm:h-68 lg:h-80', mobileVisible: false },
  { src: '/media/hero-6.jpg', alt: 'Teacup Yorkie puppy', heightClass: 'h-56 sm:h-72 lg:h-84', mobileVisible: true },
  { src: '/media/hero-7.jpg', alt: 'Imperial Shih Tzu puppy', heightClass: 'h-48 sm:h-64 lg:h-72', mobileVisible: false },
];

export function Hero() {
  const headlineWordsLine1 = ['Premium', 'teacup', 'puppies'];
  const headlineWordsLine2 = ['in', `${SITE_CONFIG.city}`];

  return (
    <section className="relative pt-8 sm:pt-14 pb-0 overflow-hidden bg-bg">
      {/* Subtle Floating Paw Prints in Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-[10%] text-caramel/40"
        >
          🐾
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 right-[12%] text-caramel/30 text-2xl"
        >
          🐾
        </motion.div>
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-64 left-[18%] text-caramel/25 text-lg"
        >
          🐾
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Handwritten Tagline with Animated Hand-drawn Underline */}
        <div className="inline-flex flex-col items-center mb-4">
          <div className="inline-flex items-center gap-2 bg-cream/70 px-4 py-1.5 rounded-full border border-caramel/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-caramel" />
            <span className="font-accent text-2xl sm:text-3xl text-caramel-dark font-bold tracking-wide -rotate-1">
              every puppy is family
            </span>
          </div>

          {/* Hand-drawn SVG Underline */}
          <svg
            viewBox="0 0 220 18"
            fill="none"
            className="w-44 sm:w-56 h-3 -mt-1 text-caramel"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.path
              d="M3 14 C45 3, 160 2, 217 10 C175 14, 85 16, 25 15"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
            />
          </svg>
        </div>

        {/* Display Headline with Staggered Word Reveal */}
        <h1 className="font-display font-black text-ink tracking-tight mb-6 leading-[1.08] text-[clamp(2.75rem,7vw,5.75rem)] max-w-4xl mx-auto">
          <span className="block">
            {headlineWordsLine1.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-3 sm:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block text-caramel">
            {headlineWordsLine2.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.45 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-3 sm:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-base sm:text-lg md:text-xl text-ink/80 max-w-2xl mx-auto mb-8 font-normal leading-relaxed"
        >
          Boutique showroom visits in Business Bay and world-class ethical imports from Korea & Europe.
          Hypoallergenic, health-warrantied companions with VIP door-to-door delivery.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button href="/puppies" variant="primary" size="lg" className="w-full sm:w-auto shadow-chunky-caramel">
            View available puppies
          </Button>

          <Button
            href={getWhatsAppLink('Hi Petite Paws! I would like to enquire on WhatsApp about your available puppies.')}
            isExternal
            variant="secondary"
            size="lg"
            icon={<MessageCircle className="w-5 h-5 text-whatsapp" />}
            className="w-full sm:w-auto"
          >
            Enquire on WhatsApp
          </Button>
        </motion.div>

        {/* Bottom-aligned Row of Arched Frames Peeking Over Scalloped Edge */}
        <div className="relative pt-6 max-w-6xl mx-auto">
          {/* Centered Mascot Sitting atop/in the center of the Arches */}
          <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 z-20">
            <Mascot pose="peek" className="w-28 h-24 sm:w-36 sm:h-32" />
          </div>

          {/* Arches Row */}
          <div className="flex items-end justify-center gap-2.5 sm:gap-4 md:gap-5 px-2">
            {HERO_ARCHES.map((arch, index) => {
              // Hide some arches on smaller screens
              const visibilityClass = arch.mobileVisible ? 'flex' : 'hidden sm:flex';

              return (
                <motion.div
                  key={index}
                  initial={{ y: 80, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                    delay: 0.85 + index * 0.08,
                  }}
                  className={`relative flex-1 max-w-[150px] sm:max-w-[170px] lg:max-w-[190px] ${arch.heightClass} ${visibilityClass} arch-frame`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={arch.src}
                      alt={arch.alt}
                      fill
                      priority={index === 1 || index === 3}
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 180px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scalloped Divider Beneath Hero with Argyle Strip */}
      <div className="w-full -mt-2 sm:-mt-4 relative z-20">
        <Scallop position="bottom" fillColor="#fde8c4" showArgyle={true} />
      </div>
    </section>
  );
}
