'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Skip entirely when prefers-reduced-motion is set
    const shouldReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (shouldReduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      syncTouch: false,
    });

    // Optional global reference for convenience
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Drive with a requestAnimationFrame loop calling lenis.raf(time)
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle in-page #anchor links with lenis.scrollTo(el, { offset: -80 })
    function handleAnchorClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        try {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, { offset: -80 });
          }
        } catch {
          // Ignore invalid query selectors
        }
      }
    }

    document.addEventListener('click', handleAnchorClick);

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}

