'use client';

import React, { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { PUPPIES } from '@/data/puppies';

export const DOOR_W = 240;
export const DOOR_H = 300;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function clamp(t: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, t));
}

export interface DoorProps {
  index: number;
  p: MotionValue<number>;
  total: number;
  puppy: (typeof PUPPIES)[number];
  lazy: boolean;
}

export function Door({ index, p, total, puppy, lazy }: DoorProps) {
  const doorRef = useRef<HTMLDivElement>(null);

  const angle = useTransform(p, (pv: number) => {
    const W = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const dogX = 24 + pv * (W - 150 - 48);

    let doorCenter = 0;
    if (doorRef.current) {
      const rect = doorRef.current.getBoundingClientRect();
      doorCenter = rect.left + rect.width / 2;
    }

    const t = clamp((dogX + 380 - doorCenter) / 300);
    return 78 * smoothstep(t);
  });

  const colors = ['#a14a1c', '#7a4a2f', '#b8644d', '#5a3a2a', '#c88a45'];
  const color = puppy.doorColor || colors[index % colors.length];

  return (
    <div
      ref={doorRef}
      className="flex-shrink-0 flex flex-col items-center relative z-10"
      style={{ width: DOOR_W }}
    >
      <div className="font-display font-extrabold text-xl text-ink text-center mb-2" style={{ minHeight: 48 }}>
        {puppy.name}
      </div>
      <div className="text-xs text-ink/70 font-medium mb-2 text-center">
        {puppy.breed}, {puppy.sex}, {puppy.age}
      </div>
      <div className="relative" style={{ width: DOOR_W, height: DOOR_H, perspective: 900 }}>
        <div
          className="absolute inset-0 rounded-t-[120px] rounded-b-xl overflow-hidden"
          style={{ width: DOOR_W, height: DOOR_H }}
        >
          <Image
            src={puppy.image}
            alt={`${puppy.name} the ${puppy.breed}`}
            fill
            sizes="240px"
            className="object-cover"
            loading={lazy ? 'lazy' : 'eager'}
          />
        </div>
        <motion.div
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            rotateY: angle,
            backgroundColor: color,
          }}
          className="absolute inset-0 rounded-t-[120px] rounded-b-xl border-[2.5px] border-ink overflow-hidden z-10"
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 40px)',
            }}
          />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-6 rounded-t-full border-2 border-ink/30 bg-ink/10" />
          <div className="absolute top-6 right-4 rotate-[-6deg] bg-white border border-ink/20 px-2 py-0.5 text-[10px] font-black uppercase shadow-sm">
            Available
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-400 border-2 border-ink flex items-center justify-center">
            <span className="text-xs">🐾</span>
          </div>
          <div className="absolute bottom-10 right-4 w-4 h-4 rounded-full bg-amber-300 border-2 border-ink" />
        </motion.div>
      </div>
    </div>
  );
}

export default Door;

