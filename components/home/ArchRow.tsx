'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * 7 columns spanning full width (px 4vw), items-end, justify-items-center.
 * Column centres at about 8%, 22%, 35%, 50% (mascot slot), 64%, 77%, 91%.
 *
 * Arch sizes (width x visible height above the scallop line):
 * 170x110, 208x185, 184x138, SLOT 200x175, 188x150, 212x194, 166x103.
 * Each arch element is taller than what shows; its bottom is hidden behind
 * the scallop (negative bottom margin so the scallop overlaps ~40px).
 *
 * 6 DIFFERENT cute close-up PUPPY photos.
 */
interface ArchConfig {
  isSlot?: boolean;
  width: number;
  visibleHeight: number;
  totalHeight: number;
  src: string;
  alt: string;
  priority?: boolean;
  className: string;
}

const ARCHES: ArchConfig[] = [
  {
    width: 170,
    visibleHeight: 110,
    totalHeight: 150,
    src: '/media/hero-1.jpg',
    alt: 'Teacup Maltipoo puppy with soft cream fur',
    priority: true,
    className: 'block',
  },
  {
    width: 208,
    visibleHeight: 185,
    totalHeight: 225,
    src: '/media/hero-2.jpg',
    alt: 'Snow White Pomeranian puppy close-up',
    priority: true,
    className: 'block',
  },
  {
    width: 184,
    visibleHeight: 138,
    totalHeight: 178,
    src: '/media/hero-3.jpg',
    alt: 'Red Toy Poodle puppy portrait',
    priority: true,
    className: 'block',
  },
  // ── Centre slot 4: empty <div id="pup-slot" aria-hidden> 200x175 ──
  {
    isSlot: true,
    width: 200,
    visibleHeight: 175,
    totalHeight: 215,
    src: '',
    alt: '',
    className: 'block',
  },
  {
    width: 188,
    visibleHeight: 150,
    totalHeight: 190,
    src: '/media/hero-5.jpg',
    alt: 'Fluffy Bichon Frisé puppy',
    className: 'hidden md:block',
  },
  {
    width: 212,
    visibleHeight: 194,
    totalHeight: 234,
    src: '/media/hero-6.jpg',
    alt: 'Teacup Yorkie puppy with bow',
    className: 'hidden lg:block',
  },
  {
    width: 166,
    visibleHeight: 103,
    totalHeight: 143,
    src: '/media/hero-7.jpg',
    alt: 'Imperial Shih Tzu puppy',
    className: 'hidden lg:block',
  },
];

export function ArchRow() {
  return (
    <div
      className="relative z-10 w-full overflow-hidden -mb-10"
      style={{ paddingLeft: '4vw', paddingRight: '4vw' }}
    >
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 w-full items-end justify-items-center">
        {ARCHES.map((arch, index) => {
          if (arch.isSlot) {
            return (
              <div
                key="pup-slot"
                id="pup-slot"
                aria-hidden="true"
                className={`relative flex-shrink-0 ${arch.className}`}
                style={{ width: arch.width, height: arch.visibleHeight }}
              />
            );
          }

          const radius = arch.width / 2;

          return (
            <motion.div
              key={index}
              initial={{ y: arch.totalHeight, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 16,
                delay: 0.15 + index * 0.08,
              }}
              className={`relative overflow-hidden border-2 border-ink bg-cream flex-shrink-0 ${arch.className}`}
              style={{
                width: arch.width,
                height: arch.totalHeight,
                borderRadius: `${radius}px ${radius}px 0 0`,
              }}
            >
              <Image
                src={arch.src}
                alt={arch.alt}
                fill
                priority={arch.priority}
                sizes={`${arch.width}px`}
                className="object-cover"
                style={{ objectPosition: '50% 30%' }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
