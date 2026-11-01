'use client';

import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { PUPPIES } from '@/data/puppies';
import { Door, DoorProps } from './Door';

export { Door };
export type { DoorProps };

// Tunables
const OUTER_VH_BASE = 300;
const SPRING = { stiffness: 220, damping: 32, mass: 0.2 };

export default function MeetThePups() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [, setDoorLefts] = useState<number[]>([]);

  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = () => setIsDesktop(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rmh = () => setReduced(rm.matches);
    rmh();
    rm.addEventListener('change', rmh);
    return () => {
      mql.removeEventListener('change', handler);
      rm.removeEventListener('change', rmh);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, SPRING);
  const trackX = useTransform(p, [0, 1], [0, -overflow]);

  const measure = useCallback(() => {
    if (!track.current) return;
    setOverflow(Math.max(0, track.current.scrollWidth - window.innerWidth));
    const doors = track.current.querySelectorAll('[data-door]');
    const lefts: number[] = [];
    doors.forEach((d) => lefts.push((d as HTMLElement).offsetLeft));
    setDoorLefts(lefts);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const outerVh = Math.max(OUTER_VH_BASE, overflow / 4);

  const mobile = !isDesktop || reduced;

  if (mobile) {
    return (
      <section className="py-12">
        <div className="px-[5vw] mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display font-black text-3xl text-ink">Meet the pups</h2>
            <p className="text-ink/80 text-base">Real puppies, real photos, looking for their families right now.</p>
          </div>
          <Link href="/puppies" className="px-4 py-2 rounded-full bg-caramel text-white text-sm font-bold">See all available puppies</Link>
        </div>
        <div className="flex gap-8 px-[5vw] overflow-x-auto snap-x snap-mandatory pb-6">
          {PUPPIES.map((puppy, i) => (
            <div key={puppy.id} className="snap-center">
              <Door index={i} p={p} total={PUPPIES.length} puppy={puppy} lazy={i > 3} />
            </div>
          ))}
          <Link href="/puppies" className="snap-center flex-shrink-0 w-[240px] h-[300px] rounded-t-[120px] rounded-b-xl border-2 border-dashed border-caramel bg-white/80 flex items-center justify-center text-center">
            <div>
              <h3 className="font-display font-bold text-xl text-ink">Meet them all</h3>
              <p className="text-xs text-ink/70 mt-2">View all puppies</p>
            </div>
          </Link>
        </div>
        <div className="mx-[5vw] mt-4 h-[110px] bg-[#e0a85f] border-t-2 border-ink relative" />
      </section>
    );
  }

  return (
    <section id="meet-pups" ref={outer} style={{ height: `${outerVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="px-[5vw] pt-8 flex items-end justify-between">
          <div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-ink">Meet the pups</h2>
            <p className="text-ink/80 text-base md:text-lg mt-2">Real puppies, real photos, looking for their families right now.</p>
          </div>
          <Link href="/puppies" className="px-5 py-2.5 rounded-full bg-caramel text-white text-sm font-bold">See all available puppies</Link>
        </div>
        <motion.div
          ref={track}
          style={{ x: trackX }}
          className="flex w-max gap-[clamp(32px,4vw,64px)] px-[5vw] will-change-transform mt-6 relative z-10"
        >
          {PUPPIES.map((puppy, i) => (
            <div key={puppy.id} data-door className="relative z-10">
              <Door
                index={i}
                p={p}
                total={PUPPIES.length}
                puppy={puppy}
                lazy={i > 3}
              />
            </div>
          ))}
          <Link href="/puppies" className="flex-shrink-0 w-[240px] flex flex-col items-center justify-center text-center relative z-10">
            <div className="w-[240px] h-[300px] rounded-t-[120px] rounded-b-xl border-2 border-dashed border-caramel bg-white/80 flex flex-col items-center justify-center">
              <h3 className="font-display font-bold text-xl text-ink">Meet them all</h3>
              <p className="text-xs text-ink/70 mt-2">View all puppies</p>
            </div>
          </Link>
        </motion.div>
        <div id="pups-floor" className="absolute bottom-0 left-0 right-0 h-[110px] bg-[#e0a85f] border-t-2 border-ink overflow-hidden z-10">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 2px, transparent 2px, transparent 220px)' }} />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-ink/40" />
        </div>
      </div>
    </section>
  );
}
