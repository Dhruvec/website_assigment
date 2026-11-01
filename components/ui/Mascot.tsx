'use client';

import React from 'react';

export interface MascotProps {
  walking?: boolean;
  className?: string;
  flipped?: boolean;
  'aria-hidden'?: boolean | 'true' | 'false';
  id?: string;
  pose?: 'idle' | 'walk' | 'peek';
  animated?: boolean;
  noWag?: boolean;
}

export interface MascotPeekProps {
  className?: string;
  flipped?: boolean;
  'aria-hidden'?: boolean | 'true' | 'false';
  id?: string;
}

/**
 * Biscuit - Original cartoon dog mascot (chubby corgi-style pup)
 * Features inline SVG, uniform 3px outline (#2a1a12), flat vector, no gradients,
 * exact group hierarchy for animations matching specifications.
 */
export function Mascot({
  walking = false,
  className = '',
  flipped = false,
  'aria-hidden': ariaHidden = true,
  id,
  pose,
  animated,
  noWag,
}: MascotProps) {
  if (pose === 'peek') {
    return (
      <MascotPeek
        id={id}
        className={className}
        flipped={flipped}
        aria-hidden={ariaHidden}
      />
    );
  }

  const isWalking = walking || pose === 'walk';

  return (
    <div
      id={id}
      className={`inline-block relative select-none ${className || 'w-[130px] h-auto'}`}
      style={{
        transform: flipped ? 'scaleX(-1)' : 'none',
      }}
      aria-hidden={ariaHidden}
    >
      <svg
        className={`pup-svg block w-full h-auto overflow-visible ${isWalking ? 'pup-walk' : ''}`}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft ground-shadow ellipse */}
        <ellipse
          className="pup-shadow"
          cx="80"
          cy="112"
          rx="45"
          ry="6"
          fill="#2a1a12"
          fillOpacity="0.15"
        />

        {/* Tail group (pivot at tail base ~ x:38, y:68) */}
        <g className="pup-tail">
          <path
            d="M38 68 C28 64, 22 52, 28 44 C31 40, 38 46, 36 56 Z"
            fill="#e8933f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Small white tail nub tip */}
          <circle cx="28" cy="45" r="4" fill="#fff3df" stroke="#2a1a12" strokeWidth="2" />
        </g>

        {/* Far back leg (l2 back-far) */}
        <g className="leg l2 back-far">
          <rect
            x="48"
            y="75"
            width="12"
            height="26"
            rx="6"
            fill="#c96f2a"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Paw cream white tip */}
          <path
            d="M48 93 L60 93 C60 97, 57 101, 54 101 C51 101, 48 97, 48 93 Z"
            fill="#fff3df"
          />
        </g>

        {/* Far front leg (l1 front-far) */}
        <g className="leg l1 front-far">
          <rect
            x="110"
            y="75"
            width="12"
            height="26"
            rx="6"
            fill="#c96f2a"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M110 93 L122 93 C122 97, 119 101, 116 101 C113 101, 110 97, 110 93 Z"
            fill="#fff3df"
          />
        </g>

        {/* Body, chest patch, bandana knot */}
        <g className="pup-body">
          {/* Main long chubby corgi body */}
          <rect
            x="35"
            y="52"
            width="90"
            height="44"
            rx="22"
            fill="#e8933f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cream chest patch */}
          <path
            d="M102 54 C116 54, 125 64, 125 78 C125 90, 115 96, 105 96 C98 96, 96 86, 96 76 C96 66, 98 58, 102 54 Z"
            fill="#fff3df"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Teal Bandana around neck */}
          <path
            d="M92 52 L110 65 L98 78 Z"
            fill="#2a9d8f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Two small white dots on bandana */}
          <circle cx="102" cy="63" r="1.5" fill="#ffffff" />
          <circle cx="106" cy="68" r="1.5" fill="#ffffff" />
          {/* Bandana knot */}
          <circle cx="111" cy="58" r="3" fill="#2a9d8f" stroke="#2a1a12" strokeWidth="2" />
        </g>

        {/* Near back leg (l1 back-near) */}
        <g className="leg l1 back-near">
          <rect
            x="42"
            y="78"
            width="13"
            height="25"
            rx="6.5"
            fill="#e8933f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 96 L55 96 C55 100, 52 103, 48.5 103 C45 103, 42 100, 42 96 Z"
            fill="#fff3df"
            stroke="#2a1a12"
            strokeWidth="2"
          />
        </g>

        {/* Near front leg (l2 front-near) */}
        <g className="leg l2 front-near">
          <rect
            x="104"
            y="78"
            width="13"
            height="25"
            rx="6.5"
            fill="#e8933f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M104 96 L117 96 C117 100, 114 103, 110.5 103 C107 103, 104 100, 104 96 Z"
            fill="#fff3df"
            stroke="#2a1a12"
            strokeWidth="2"
          />
        </g>

        {/* Head group (Head about 40% of total height, facing right) */}
        <g className="pup-head">
          {/* Left Ear (Back Ear) */}
          <g className="ear ear-l">
            <path
              d="M98 34 C94 12, 110 4, 122 20 C128 28, 124 44, 114 48 Z"
              fill="#e8933f"
              stroke="#2a1a12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M104 32 C101 18, 112 12, 118 24 C121 30, 118 40, 112 42 Z"
              fill="#c96f2a"
            />
          </g>

          {/* Right Ear (Front Ear) */}
          <g className="ear ear-r">
            <path
              d="M118 32 C120 10, 138 6, 144 26 C147 36, 138 48, 128 46 Z"
              fill="#e8933f"
              stroke="#2a1a12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M124 30 C126 18, 136 14, 140 28 C142 36, 134 42, 130 40 Z"
              fill="#c96f2a"
            />
          </g>

          {/* Head Base */}
          <ellipse
            cx="118"
            cy="48"
            rx="26"
            ry="24"
            fill="#e8933f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cream Muzzle */}
          <path
            d="M112 40 C128 40, 144 46, 144 56 C144 64, 130 68, 120 68 C110 68, 106 60, 112 40 Z"
            fill="#fff3df"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pink Cheek Blush */}
          <ellipse
            cx="112"
            cy="52"
            rx="6"
            ry="4"
            fill="#f4a8a0"
            fillOpacity="0.6"
          />

          {/* Tiny Eyebrows */}
          <path
            d="M122 28 C125 26, 130 26, 133 28"
            stroke="#2a1a12"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Eyes group */}
          <g className="eyes">
            {/* Eye 1 (Left/Back) */}
            <ellipse
              cx="118"
              cy="42"
              rx="4"
              ry="5.5"
              fill="#2a1a12"
            />
            <circle cx="116.5" cy="40" r="1.8" fill="#ffffff" />

            {/* Eye 2 (Right/Front) */}
            <ellipse
              cx="134"
              cy="42"
              rx="4"
              ry="5.5"
              fill="#2a1a12"
            />
            <circle cx="132.5" cy="40" r="1.8" fill="#ffffff" />
          </g>

          {/* Small Dark Triangular Nose */}
          <path
            d="M136 50 L144 50 L140 56 Z"
            fill="#2a1a12"
            stroke="#2a1a12"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="138" cy="51" r="0.8" fill="#ffffff" />

          {/* Mouth group */}
          <g className="mouth">
            {/* Wide happy smile */}
            <path
              d="M132 58 C136 62, 142 62, 146 58"
              stroke="#2a1a12"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Small pink tongue */}
            <path
              d="M138 60 C138 64, 142 64, 142 60 Z"
              fill="#f4a8a0"
              stroke="#2a1a12"
              strokeWidth="1.5"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

/**
 * MascotPeek variant showing only head and front paws, for hero slot and mobile static version.
 */
export function MascotPeek({
  className = '',
  flipped = false,
  'aria-hidden': ariaHidden = true,
  id,
}: MascotPeekProps) {
  return (
    <div
      id={id}
      className={`inline-block relative select-none ${className || 'w-[120px] h-auto'}`}
      style={{
        transform: flipped ? 'scaleX(-1)' : 'none',
      }}
      aria-hidden={ariaHidden}
    >
      <svg
        className="pup-svg block w-full h-auto overflow-visible"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail wagging behind head/body */}
        <g className="pup-tail" style={{ transformOrigin: '26px 80px' }}>
          <path
            d="M26 80 C16 72, 8 56, 14 42 C18 32, 28 36, 29 46 C30 56, 28 68, 26 80 Z"
            fill="#e8933f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 44 C16 40, 20 36, 24 38 C26 42, 24 48, 20 50 C16 50, 14 46, 15 44 Z"
            fill="#fff3df"
          />
        </g>

        {/* Head group centered */}
        <g className="pup-head">
          {/* Left Ear */}
          <g className="ear ear-l">
            <path
              d="M32 45 C20 22, 36 10, 50 24 C58 32, 54 52, 44 58 Z"
              fill="#e8933f"
              stroke="#2a1a12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M38 40 C30 26, 42 18, 48 28 C52 34, 48 46, 42 50 Z"
              fill="#c96f2a"
            />
          </g>

          {/* Right Ear */}
          <g className="ear ear-r">
            <path
              d="M88 45 C100 22, 84 10, 70 24 C62 32, 66 52, 76 58 Z"
              fill="#e8933f"
              stroke="#2a1a12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M82 40 C90 26, 78 18, 72 28 C68 34, 72 46, 78 50 Z"
              fill="#c96f2a"
            />
          </g>

          {/* Head Base */}
          <ellipse
            cx="60"
            cy="52"
            rx="32"
            ry="30"
            fill="#e8933f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cream Muzzle */}
          <path
            d="M48 44 C52 38, 68 38, 72 44 C82 44, 88 56, 88 64 C88 74, 74 78, 60 78 C46 78, 32 74, 32 64 C32 56, 38 44, 48 44 Z"
            fill="#fff3df"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pink Cheek Blush */}
          <ellipse cx="44" cy="62" rx="7" ry="5" fill="#f4a8a0" fillOpacity="0.6" />
          <ellipse cx="76" cy="62" rx="7" ry="5" fill="#f4a8a0" fillOpacity="0.6" />

          {/* Tiny Eyebrows */}
          <path
            d="M50 32 C52 30, 56 30, 58 32"
            stroke="#2a1a12"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M62 32 C64 30, 68 30, 70 32"
            stroke="#2a1a12"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Eyes */}
          <g className="eyes">
            <ellipse cx="48" cy="48" rx="5" ry="6.5" fill="#2a1a12" />
            <circle cx="46" cy="46" r="2" fill="#ffffff" />
            <ellipse cx="72" cy="48" rx="5" ry="6.5" fill="#2a1a12" />
            <circle cx="70" cy="46" r="2" fill="#ffffff" />
          </g>

          {/* Nose */}
          <path
            d="M55 56 L65 56 L60 63 Z"
            fill="#2a1a12"
            stroke="#2a1a12"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="58" cy="58" r="1" fill="#ffffff" />

          {/* Mouth */}
          <path
            d="M54 66 C57 70, 63 70, 66 66"
            stroke="#2a1a12"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M58 68 C58 72, 62 72, 62 68 Z"
            fill="#f4a8a0"
            stroke="#2a1a12"
            strokeWidth="1.2"
          />
        </g>

        {/* Chest & Bandana */}
        <g className="pup-chest">
          <path
            d="M36 74 C36 102, 84 102, 84 74 Z"
            fill="#e8933f"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M48 76 C48 94, 72 94, 72 76 Z"
            fill="#fff3df"
          />
          {/* Teal Bandana */}
          <path
            d="M44 74 L60 90 L76 74 Z"
            fill="#2a9d8f"
            stroke="#2a1a12"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="80" r="1.5" fill="#ffffff" />
          <circle cx="60" cy="85" r="1.2" fill="#ffffff" />
        </g>

        {/* Front Paws resting on bottom edge */}
        <g className="pup-paws">
          {/* Left Paw */}
          <rect
            x="36"
            y="98"
            width="18"
            height="18"
            rx="9"
            fill="#fff3df"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M42 104 L42 112" stroke="#2a1a12" strokeWidth="2" strokeLinecap="round" />
          <path d="M48 104 L48 112" stroke="#2a1a12" strokeWidth="2" strokeLinecap="round" />

          {/* Right Paw */}
          <rect
            x="66"
            y="98"
            width="18"
            height="18"
            rx="9"
            fill="#fff3df"
            stroke="#2a1a12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M72 104 L72 112" stroke="#2a1a12" strokeWidth="2" strokeLinecap="round" />
          <path d="M78 104 L78 112" stroke="#2a1a12" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
