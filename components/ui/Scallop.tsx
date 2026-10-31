'use client';

import React from 'react';

interface ScallopProps {
  position?: 'top' | 'bottom';
  fillColor?: string;
  className?: string;
  showArgyle?: boolean;
}

export function Scallop({
  position = 'bottom',
  fillColor = '#fffdf8',
  className = '',
  showArgyle = true,
}: ScallopProps) {
  const isTop = position === 'top';

  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none relative ${className}`}>
      {/* Optional argyle strip under the scallops */}
      {showArgyle && (
        <div className={`w-full h-3 bg-argyle-strip border-y border-ink/10`} />
      )}

      {/* Scalloped edge SVG */}
      <div className={`w-full relative ${isTop ? 'rotate-180' : ''}`}>
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 block"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Scalloped Fill */}
          <path
            d="M0 0 
               Q36 24 72 0 
               Q108 24 144 0 
               Q180 24 216 0 
               Q252 24 288 0 
               Q324 24 360 0 
               Q396 24 432 0 
               Q468 24 504 0 
               Q540 24 576 0 
               Q612 24 648 0 
               Q684 24 720 0 
               Q756 24 792 0 
               Q828 24 864 0 
               Q900 24 936 0 
               Q972 24 1008 0 
               Q1044 24 1080 0 
               Q1116 24 1152 0 
               Q1188 24 1224 0 
               Q1260 24 1296 0 
               Q1332 24 1368 0 
               Q1404 24 1440 0 
               L1440 48 L0 48 Z"
            fill={fillColor}
          />
          {/* Dashed Inner Stroke for whimsical craft feel */}
          <path
            d="M0 4 
               Q36 28 72 4 
               Q108 28 144 4 
               Q180 28 216 4 
               Q252 28 288 4 
               Q324 28 360 4 
               Q396 28 432 4 
               Q468 28 504 4 
               Q540 28 576 4 
               Q612 28 648 4 
               Q684 28 720 4 
               Q756 28 792 4 
               Q828 28 864 4 
               Q900 28 936 4 
               Q972 28 1008 4 
               Q1044 28 1080 4 
               Q1116 28 1152 4 
               Q1188 28 1224 4 
               Q1260 28 1296 4 
               Q1332 28 1368 4 
               Q1404 28 1440 4"
            fill="none"
            stroke="#a14a1c"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.35"
          />
        </svg>
      </div>
    </div>
  );
}

