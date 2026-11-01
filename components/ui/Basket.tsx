'use client';

import React from 'react';

export interface BasketProps {
  className?: string;
}

/**
 * BasketBack — The back rim and dark interior of the woven basket.
 * Rendered at z-10 (behind the mascot at z-20).
 */
export function BasketBack({ className = '' }: BasketProps) {
  return (
    <svg
      className={`w-full h-full overflow-visible ${className}`}
      viewBox="0 0 260 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Dark warm shadow interior of the basket */}
      <ellipse
        cx="130"
        cy="92"
        rx="118"
        ry="21"
        fill="#5a2e12"
        stroke="#2a1a12"
        strokeWidth="3"
      />
      {/* Soft inner depth gradient / back weave texture */}
      <path
        d="M 12 92 A 118 21 0 0 1 248 92 L 230 115 A 100 15 0 0 1 30 115 Z"
        fill="#43220c"
        opacity="0.85"
      />
      {/* Back rim arch */}
      <path
        d="M 12 92 A 118 21 0 0 1 248 92"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * BasketFront — The front rim, tapered body, woven horizontal bands,
 * and vertical ribs. Rendered at z-30 (in front of the mascot at z-20).
 */
export function BasketFront({ className = '' }: BasketProps) {
  return (
    <svg
      className={`w-full h-full overflow-visible ${className}`}
      viewBox="0 0 260 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Tapered basket body:
          Starts at rim sides (12, 92) and (248, 92),
          tapers down to base (42, 176) and (218, 176). */}
      <path
        d="M 12 92
           C 14 125, 30 160, 42 176
           C 70 184, 190 184, 218 176
           C 230 160, 246 125, 248 92
           A 118 21 0 0 1 12 92 Z"
        fill="#d9a45a"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Horizontal woven band 1 */}
      <path
        d="M 22 116 C 50 128, 210 128, 238 116"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 23 118 C 50 130, 210 130, 237 118"
        stroke="#e8b870"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Horizontal woven band 2 */}
      <path
        d="M 30 138 C 60 150, 200 150, 230 138"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 31 140 C 60 152, 200 152, 229 140"
        stroke="#e8b870"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Horizontal woven band 3 */}
      <path
        d="M 37 158 C 65 170, 195 170, 223 158"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 38 160 C 65 172, 195 172, 222 160"
        stroke="#e8b870"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Vertical / curved ribs */}
      {/* Rib 1 (far-left) */}
      <path
        d="M 45 104 C 47 125, 52 152, 58 174"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rib 2 */}
      <path
        d="M 72 108 C 74 128, 78 155, 84 177"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rib 3 */}
      <path
        d="M 101 111 C 103 130, 105 156, 110 179"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rib 4 (center) */}
      <path
        d="M 130 113 L 130 180"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rib 5 */}
      <path
        d="M 159 111 C 157 130, 155 156, 150 179"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rib 6 */}
      <path
        d="M 188 108 C 186 128, 182 155, 176 177"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rib 7 (far-right) */}
      <path
        d="M 215 104 C 213 125, 208 152, 202 174"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Front rim lip: thick braided basket rim */}
      <path
        d="M 12 92 A 118 21 0 0 0 248 92 C 248 99, 130 118, 12 92 Z"
        fill="#e8b870"
        stroke="#2a1a12"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Braided rim woven stitches */}
      <g stroke="#2a1a12" strokeWidth="2.5" strokeLinecap="round">
        <line x1="30" y1="92" x2="38" y2="100" />
        <line x1="50" y1="94" x2="58" y2="102" />
        <line x1="72" y1="96" x2="80" y2="104" />
        <line x1="94" y1="97" x2="102" y2="105" />
        <line x1="116" y1="98" x2="124" y2="106" />
        <line x1="136" y1="98" x2="144" y2="106" />
        <line x1="158" y1="97" x2="166" y2="105" />
        <line x1="180" y1="96" x2="188" y2="104" />
        <line x1="202" y1="94" x2="210" y2="102" />
        <line x1="222" y1="92" x2="230" y2="100" />
      </g>

      {/* Soft ground shadow beneath basket */}
      <ellipse
        cx="130"
        cy="183"
        rx="95"
        ry="6"
        fill="#000000"
        fillOpacity="0.25"
      />
    </svg>
  );
}

/**
 * Basket — Complete standalone woven basket component combining back & front.
 */
export function Basket({ className = '' }: BasketProps) {
  return (
    <div className={`relative w-[260px] h-[190px] ${className}`}>
      <div className="absolute inset-0 z-10">
        <BasketBack />
      </div>
      <div className="absolute inset-0 z-30">
        <BasketFront />
      </div>
    </div>
  );
}

export default Basket;

