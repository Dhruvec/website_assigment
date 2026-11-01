'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { ArchRow } from '@/components/home/ArchRow';
import { Scallop } from '@/components/ui/Scallop';

/** Staggered word reveal for the headline */
function StaggeredLine({ words, startDelay }: { words: string[]; startDelay: number }) {
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.55,
            delay: startDelay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section className="relative pb-0 overflow-visible bg-bg" style={{ paddingTop: 56 }}>
      {/* Soft radial peach glow behind the hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(253,232,196,0.9) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Centered hero text block */}
      <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* 1. Handwritten tagline — no pill, no border, no sparkle icon */}
        <div className="inline-flex flex-col items-center mb-3">
          <span
            className="font-accent font-bold tracking-wide"
            style={{ fontSize: '2rem', color: '#a14a1c', lineHeight: 1.2 }}
          >
            every puppy is family
          </span>
          {/* Hand-drawn SVG squiggle underline that draws itself */}
          <svg
            viewBox="0 0 260 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ width: '13rem', height: '0.7rem', marginTop: '-2px' }}
          >
            <motion.path
              d="M4 9 C30 3, 80 2, 130 7 C180 12, 230 4, 256 8"
              stroke="#a14a1c"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
        </div>

        {/* 2. Two-line headline — ALL dark ink, words rise with 0.06s stagger */}
        <h1
          className="font-display font-black text-ink"
          style={{
            fontSize: 'clamp(3.2rem, 5.4vw, 6.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            whiteSpace: 'normal',
            maxWidth: 700,
          }}
        >
          <span className="whitespace-nowrap inline-block">
            <StaggeredLine words={['Premium', 'teacup']} startDelay={0.1} />
          </span>
          <br />
          <span className="whitespace-nowrap inline-block">
            <StaggeredLine words={['puppies', 'in', SITE_CONFIG.city]} startDelay={0.22} />
          </span>
        </h1>

        {/* 3. Subtext — two short lines, 1.2rem, max 46ch */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          style={{
            fontSize: '1.2rem',
            color: '#5a3a2a',
            maxWidth: '46ch',
            marginTop: 20,
            lineHeight: 1.55,
          }}
        >
          Meet your new best friend in our {SITE_CONFIG.city} showroom,<br
            className="hidden sm:block"
          /> or order a rare miniature breed from trusted breeders worldwide.
        </motion.p>

        {/* 4. CTA buttons — 56px pill */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.56 }}
          className="flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: 16, marginTop: 28, marginBottom: 40 }}
        >
          {/* Primary: caramel fill, 5px darker offset shadow */}
          <a
            href="/puppies"
            className="inline-flex items-center justify-center rounded-full font-bold text-white transition-all hover:-translate-y-0.5 active:translate-y-0.5"
            style={{
              height: 56,
              paddingLeft: '2rem',
              paddingRight: '2rem',
              backgroundColor: '#a14a1c',
              boxShadow: '0 5px 0 0 #6f2f10',
              fontSize: '1rem',
            }}
          >
            View available puppies
          </a>

          {/* Secondary: cream fill, 1.5px ink border, NO icon, NO heavy shadow */}
          <a
            href={getWhatsAppLink('Hi Petite Paws! I would like to enquire about your available puppies.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full font-bold text-ink transition-all hover:-translate-y-0.5 active:translate-y-0.5"
            style={{
              height: 56,
              paddingLeft: '2rem',
              paddingRight: '2rem',
              backgroundColor: '#fff8ec',
              border: '1.5px solid #2a1a12',
              fontSize: '1rem',
            }}
          >
            Enquire on WhatsApp
          </a>
        </motion.div>
      </div>

      {/* 5. ArchRow — full-width, outside the 700px centered block */}
      <div className="relative z-10 w-full">
        <ArchRow />
      </div>

      {/* 6. Scalloped divider z-30 (paints OVER arch bottoms) + argyle strip */}
      <div className="w-full relative z-30">
        <Scallop position="bottom" fillColor="#fdeccd" showArgyle={true} />
      </div>
    </section>
  );
}
