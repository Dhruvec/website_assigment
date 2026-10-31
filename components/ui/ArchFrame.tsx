'use client';

import React from 'react';
import Image from 'next/image';

interface ArchFrameProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  aspectRatio?: string; // e.g., 'aspect-[3/4]'
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

export function ArchFrame({
  src,
  alt = 'Petite Paws puppy',
  className = '',
  children,
  priority = false,
}: ArchFrameProps) {
  return (
    <div
      className={`relative rounded-t-[100px] sm:rounded-t-[140px] rounded-b-2xl border-2 border-ink overflow-hidden bg-cream-100 shadow-card transition-all duration-300 hover:shadow-card-hover group ${className}`}
    >
      {src && (
        <div className="relative w-full h-full min-h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        </div>
      )}
      {children}
    </div>
  );
}
