'use client';

import React from 'react';

interface ScallopProps {
  position?: 'top' | 'bottom';
  fillColor?: string;
  className?: string;
  showArgyle?: boolean;
}

/**
 * SVG scallop divider.
 * - Each bump ~95px wide (20 bumps across a 1900px viewBox).
 * - 2px ink outline on the top edge.
 * - Dashed inner arc: stroke-dasharray "4 5", ~8px inset, caramel 40% opacity.
 * - preserveAspectRatio="none" so the pattern tiles at any width without gaps.
 *
 * When showArgyle=true an argyle / diamond pattern strip (120px, fading) is
 * rendered directly below the scallops on the same cream colour.
 */
export function Scallop({
  position = 'bottom',
  fillColor = '#fdeccd',
  className = '',
  showArgyle = true,
}: ScallopProps) {
  const isTop = position === 'top';

  /*
   * Build the scallop path inside a 1900×60 viewBox.
   * 20 bumps of 95px each = 1900px total.
   * Each bump: Q(midX, 52) to (nextX, 0)  — peak at y=52.
   * Outline path is identical (stays at y=0 start); inner dashed arc
   * is inset 8px → starts at y=8, peak at y=44.
   */
  const N = 20;
  const BW = 95; // bump width
  const PH = 52; // peak height (fill)
  const OH = 48; // outline height
  const IH = 44; // inner dashed arc height (8px inset)
  const TOTAL_W = N * BW; // 1900

  // Main fill path
  let fillPath = `M0 0 `;
  for (let i = 0; i < N; i++) {
    const x0 = i * BW;
    const midX = x0 + BW / 2;
    const x1 = (i + 1) * BW;
    fillPath += `Q${midX} ${PH} ${x1} 0 `;
  }
  fillPath += `L${TOTAL_W} 60 L0 60 Z`;

  // Ink outline on the top scallop edge
  let outlinePath = `M0 0 `;
  for (let i = 0; i < N; i++) {
    const x0 = i * BW;
    const midX = x0 + BW / 2;
    const x1 = (i + 1) * BW;
    outlinePath += `Q${midX} ${OH} ${x1} 0 `;
  }

  // Inner dashed arc (8px inset)
  let dashPath = `M0 8 `;
  for (let i = 0; i < N; i++) {
    const x0 = i * BW;
    const midX = x0 + BW / 2;
    const x1 = (i + 1) * BW;
    dashPath += `Q${midX} ${IH} ${x1} 8 `;
  }

  const svgContent = (
    <svg
      viewBox={`0 0 ${TOTAL_W} 60`}
      preserveAspectRatio="none"
      className="w-full block"
      style={{ height: '3.5rem' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main scallop fill */}
      <path d={fillPath} fill={fillColor} />
      {/* 2px ink outline on top edge */}
      <path
        d={outlinePath}
        fill="none"
        stroke="#2a1a12"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Dashed inner arc — caramel 40% opacity */}
      <path
        d={dashPath}
        fill="none"
        stroke="#a14a1c"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );

  return (
    <div className={`w-full leading-none select-none pointer-events-none relative z-30 ${className}`}>
      {isTop ? (
        <div style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}>
          {svgContent}
        </div>
      ) : (
        svgContent
      )}

      {/* Argyle / diamond pattern strip, 120px, fading bottom */}
      {showArgyle && (
        <div
          className="w-full"
          style={{
            height: 120,
            backgroundColor: fillColor,
            backgroundImage: [
              'repeating-linear-gradient(45deg,  rgba(161,74,28,0.12) 0px, rgba(161,74,28,0.12) 1px, transparent 1px, transparent 18px)',
              'repeating-linear-gradient(-45deg, rgba(161,74,28,0.12) 0px, rgba(161,74,28,0.12) 1px, transparent 1px, transparent 18px)',
            ].join(', '),
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)',
          }}
        />
      )}
    </div>
  );
}
