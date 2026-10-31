'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface MascotProps {
  pose?: 'idle' | 'walk' | 'peek';
  className?: string;
  animated?: boolean;
}

export function Mascot({
  pose = 'idle',
  className = 'w-24 h-24',
  animated = true,
}: MascotProps) {
  if (pose === 'peek') {
    return (
      <div className={`relative inline-block ${className}`} aria-label="Petite Paws puppy mascot peeking">
        <svg
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Peeking Mascot Head & Paws */}
          <g>
            {/* Left Ear */}
            <path
              d="M38 75 C18 45, 25 15, 52 28 C64 34, 60 70, 48 85 Z"
              fill="#d9822b"
            />
            <path
              d="M40 68 C28 46, 32 25, 48 34 C55 38, 52 64, 44 75 Z"
              fill="#efa250"
            />

            {/* Right Ear */}
            <path
              d="M162 75 C182 45, 175 15, 148 28 C136 34, 140 70, 152 85 Z"
              fill="#d9822b"
            />
            <path
              d="M160 68 C172 46, 168 25, 152 34 C145 38, 148 64, 156 75 Z"
              fill="#efa250"
            />

            {/* Fluffy Apricot Head */}
            <ellipse cx="100" cy="80" rx="66" ry="60" fill="#f7b76d" />
            {/* Fluff Top Tuft */}
            <path
              d="M84 26 C90 14, 110 14, 116 26 C124 22, 130 30, 122 36 C105 32, 95 32, 78 36 C70 30, 76 22, 84 26 Z"
              fill="#f7b76d"
            />
            {/* Lighter Muzzle Patch */}
            <ellipse cx="100" cy="95" rx="34" ry="26" fill="#fef0d8" />

            {/* Big Expressive Dark Eyes */}
            <ellipse cx="78" cy="74" rx="9" ry="11" fill="#2a1a12" />
            <circle cx="75" cy="70" r="3.5" fill="#ffffff" />
            <circle cx="81" cy="77" r="1.5" fill="#ffffff" />

            <ellipse cx="122" cy="74" rx="9" ry="11" fill="#2a1a12" />
            <circle cx="119" cy="70" r="3.5" fill="#ffffff" />
            <circle cx="125" cy="77" r="1.5" fill="#ffffff" />

            {/* Rosy Pink Cheeks */}
            <ellipse cx="62" cy="86" rx="9" ry="6" fill="#ff9999" opacity="0.65" />
            <ellipse cx="138" cy="86" rx="9" ry="6" fill="#ff9999" opacity="0.65" />

            {/* Cute Chocolate Nose */}
            <path
              d="M93 87 C93 84, 107 84, 107 87 C107 92, 100 96, 100 96 C100 96, 93 92, 93 87 Z"
              fill="#2a1a12"
            />
            <circle cx="98" cy="86" r="1" fill="#ffffff" opacity="0.7" />

            {/* Sweet Smile */}
            <path
              d="M94 98 C97 101, 100 101, 100 98 C100 101, 103 101, 106 98"
              stroke="#2a1a12"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Collar peek */}
            <path
              d="M72 130 C86 138, 114 138, 128 130"
              stroke="#6f2f10"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="100" cy="136" r="5" fill="#f59e0b" />

            {/* Two Front Paws Resting on Edge */}
            {/* Left Paw */}
            <g>
              <ellipse cx="60" cy="142" rx="14" ry="11" fill="#fef0d8" stroke="#2a1a12" strokeWidth="2" />
              <path d="M55 137 L55 147" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M63 137 L63 147" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            {/* Right Paw */}
            <g>
              <ellipse cx="140" cy="142" rx="14" ry="11" fill="#fef0d8" stroke="#2a1a12" strokeWidth="2" />
              <path d="M135 137 L135 147" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M143 137 L143 147" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  if (pose === 'walk') {
    return (
      <div className={`relative inline-block ${className}`} aria-label="Petite Paws puppy mascot walking">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Animated Tail */}
          <motion.g
            animate={
              animated
                ? {
                    rotate: [-15, 20, -15],
                    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
                  }
                : undefined
            }
            style={{ transformOrigin: '35px 115px' }}
          >
            <path
              d="M36 115 C20 100, 15 75, 28 62 C34 56, 44 65, 38 78 C32 91, 40 105, 46 112 Z"
              fill="#efa250"
            />
          </motion.g>

          {/* Back Paws */}
          <ellipse cx="58" cy="170" rx="10" ry="8" fill="#e89840" />
          <ellipse cx="120" cy="170" rx="10" ry="8" fill="#e89840" />

          {/* Round Fluffy Apricot Body */}
          <ellipse cx="90" cy="125" rx="55" ry="46" fill="#f7b76d" />
          {/* Fluffy Chest Accent */}
          <ellipse cx="108" cy="132" rx="30" ry="26" fill="#fef0d8" />

          {/* Front Left Paw (Moving) */}
          <motion.g
            animate={
              animated
                ? {
                    y: [0, -5, 0],
                    x: [0, 4, 0],
                    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
                  }
                : undefined
            }
          >
            <ellipse cx="80" cy="172" rx="11" ry="9" fill="#fef0d8" stroke="#2a1a12" strokeWidth="1.5" />
            <line x1="77" y1="168" x2="77" y2="175" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="83" y1="168" x2="83" y2="175" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>

          {/* Front Right Paw (Stepping forward) */}
          <motion.g
            animate={
              animated
                ? {
                    y: [-4, 2, -4],
                    x: [3, -2, 3],
                    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
                  }
                : undefined
            }
          >
            <ellipse cx="140" cy="168" rx="11" ry="9" fill="#fef0d8" stroke="#2a1a12" strokeWidth="1.5" />
            <line x1="137" y1="164" x2="137" y2="171" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="143" y1="164" x2="143" y2="171" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>

          {/* Head & Neck */}
          <ellipse cx="125" cy="78" rx="46" ry="42" fill="#f7b76d" />

          {/* Left Ear */}
          <path
            d="M85 75 C72 50, 78 26, 96 35 C105 40, 102 70, 93 82 Z"
            fill="#d9822b"
          />

          {/* Right Ear */}
          <path
            d="M155 70 C172 45, 178 25, 160 30 C150 34, 142 60, 148 78 Z"
            fill="#d9822b"
          />

          {/* Muzzle */}
          <ellipse cx="138" cy="88" rx="24" ry="18" fill="#fef0d8" />

          {/* Eyes */}
          <ellipse cx="118" cy="70" rx="7" ry="9" fill="#2a1a12" />
          <circle cx="116" cy="67" r="2.8" fill="#ffffff" />
          <circle cx="120" cy="72" r="1.2" fill="#ffffff" />

          <ellipse cx="148" cy="70" rx="7" ry="9" fill="#2a1a12" />
          <circle cx="146" cy="67" r="2.8" fill="#ffffff" />
          <circle cx="150" cy="72" r="1.2" fill="#ffffff" />

          {/* Pink Cheeks */}
          <ellipse cx="108" cy="80" rx="7" ry="5" fill="#ff9999" opacity="0.65" />
          <ellipse cx="158" cy="80" rx="7" ry="5" fill="#ff9999" opacity="0.65" />

          {/* Nose & Mouth */}
          <path
            d="M136 82 C136 80, 144 80, 144 82 C144 86, 140 89, 140 89 C140 89, 136 86, 136 82 Z"
            fill="#2a1a12"
          />
          <path
            d="M136 91 C138 93, 140 93, 140 91 C140 93, 142 93, 144 91"
            stroke="#2a1a12"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Brown Collar with Gold Tag */}
          <path
            d="M102 110 C116 118, 136 116, 146 106"
            stroke="#6f2f10"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="126" cy="116" r="4.5" fill="#f59e0b" />
        </svg>
      </div>
    );
  }

  // Default: 'idle'
  return (
    <div className={`relative inline-block ${className}`} aria-label="Petite Paws puppy mascot idle">
      <motion.div
        animate={
          animated
            ? {
                y: [0, -5, 0],
                transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
              }
            : undefined
        }
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Animated Wagging Tail */}
          <motion.g
            animate={
              animated
                ? {
                    rotate: [-18, 22, -18],
                    transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
                  }
                : undefined
            }
            style={{ transformOrigin: '42px 145px' }}
          >
            <path
              d="M40 148 C22 135, 12 108, 24 92 C32 82, 42 90, 36 105 C30 120, 38 135, 46 144 Z"
              fill="#efa250"
            />
            {/* Fluffy tail tip */}
            <circle cx="24" cy="94" r="7" fill="#fef0d8" />
          </motion.g>

          {/* Left Fluffy Droop Ear */}
          <path
            d="M45 88 C26 58, 30 24, 60 36 C74 42, 68 84, 55 100 Z"
            fill="#d9822b"
          />
          <path
            d="M48 82 C34 58, 38 34, 56 42 C64 47, 60 76, 50 88 Z"
            fill="#efa250"
          />

          {/* Right Fluffy Droop Ear */}
          <path
            d="M155 88 C174 58, 170 24, 140 36 C126 42, 132 84, 145 100 Z"
            fill="#d9822b"
          />
          <path
            d="M152 82 C166 58, 162 34, 144 42 C136 47, 140 76, 150 88 Z"
            fill="#efa250"
          />

          {/* Chubby Round Apricot Body */}
          <ellipse cx="100" cy="144" rx="54" ry="46" fill="#f7b76d" />
          {/* Fluffy Chest bib */}
          <ellipse cx="100" cy="148" rx="30" ry="28" fill="#fef0d8" />

          {/* Back Paws */}
          <ellipse cx="56" cy="176" rx="14" ry="10" fill="#e89840" />
          <ellipse cx="144" cy="176" rx="14" ry="10" fill="#e89840" />

          {/* Front Paws */}
          <ellipse cx="84" cy="176" rx="13" ry="10" fill="#fef0d8" stroke="#2a1a12" strokeWidth="1.5" />
          <line x1="81" y1="171" x2="81" y2="179" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="87" y1="171" x2="87" y2="179" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />

          <ellipse cx="116" cy="176" rx="13" ry="10" fill="#fef0d8" stroke="#2a1a12" strokeWidth="1.5" />
          <line x1="113" y1="171" x2="113" y2="179" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="119" y1="171" x2="119" y2="179" stroke="#2a1a12" strokeWidth="1.5" strokeLinecap="round" />

          {/* Brown Leather Collar with Golden Tag */}
          <path
            d="M74 122 C90 132, 110 132, 126 122"
            stroke="#6f2f10"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="100" cy="130" r="5" fill="#f59e0b" />
          <circle cx="100" cy="130" r="3" fill="#fde68a" />

          {/* Big Fluffy Head */}
          <ellipse cx="100" cy="78" rx="58" ry="52" fill="#f7b76d" />
          {/* Head Crown Fluff */}
          <path
            d="M86 30 C94 18, 106 18, 114 30 C122 26, 126 34, 120 40 C106 36, 94 36, 80 40 C74 34, 78 26, 86 30 Z"
            fill="#f7b76d"
          />

          {/* Snout / Muzzle */}
          <ellipse cx="100" cy="92" rx="30" ry="22" fill="#fef0d8" />

          {/* Big Sparkling Eyes */}
          <ellipse cx="80" cy="72" rx="8.5" ry="10.5" fill="#2a1a12" />
          <circle cx="77" cy="69" r="3.2" fill="#ffffff" />
          <circle cx="83" cy="75" r="1.3" fill="#ffffff" />

          <ellipse cx="120" cy="72" rx="8.5" ry="10.5" fill="#2a1a12" />
          <circle cx="117" cy="69" r="3.2" fill="#ffffff" />
          <circle cx="123" cy="75" r="1.3" fill="#ffffff" />

          {/* Pink Cheeks */}
          <ellipse cx="66" cy="84" rx="8" ry="5.5" fill="#ff9999" opacity="0.65" />
          <ellipse cx="134" cy="84" rx="8" ry="5.5" fill="#ff9999" opacity="0.65" />

          {/* Chocolate Nose */}
          <path
            d="M94 84 C94 81, 106 81, 106 84 C106 89, 100 93, 100 93 C100 93, 94 89, 94 84 Z"
            fill="#2a1a12"
          />
          <circle cx="98" cy="83" r="1" fill="#ffffff" opacity="0.75" />

          {/* Happy Mouth */}
          <path
            d="M95 95 C98 98, 100 98, 100 95 C100 98, 102 98, 105 95"
            stroke="#2a1a12"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
