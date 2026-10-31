'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { Mascot } from '@/components/ui/Mascot';

/* ─────────────────────────────────────────────────────────────────────
   ZIGZAG WAYPOINTS
   Each entry is [scrollProgress, xVw, yVh].
   Edit these to retune the path – the dog lerps between them.

   wp 0  : resting in the hero slot (x/y overridden at runtime)
   wp 1  : hop up above the slot
   wp 2+ : zigzag across the screen
   ───────────────────────────────────────────────────────────────────── */
const ZIGZAG_WAYPOINTS: [number, number, number][] = [
  //  progress,  x (vw),  y (vh)
  [0.0,   50,  56],   // wp 0 – slot rest (x/y replaced dynamically)
  [0.03,  50,  36],   // wp 1 – hop above slot (x replaced dynamically)
  [0.10,  80,  48],   // first cross → right
  [0.22,   8,  52],   // ← left
  [0.36,  78,  46],   // → right
  [0.50,   6,  60],   // ← left
  [0.64,  80,  50],   // → right
  [0.78,   8,  58],   // ← left
  [0.92,  76,  66],   // → right
  [1.0,   10,  72],   // end – near bottom-left
];

/**
 * ScrollPup — fixed-position mascot that starts in the hero's #pup-slot
 * and zigzags across the screen driven by scroll progress.
 *
 * - At scroll 0 the dog sits in the slot, its lower body hidden behind
 *   the scalloped divider (dog z-20, divider z-30, header z-50).
 * - At ~3 % progress the dog hops 20 px above the slot.
 * - After that it crosses between ~8 vw and ~80 vw while drifting on y.
 * - Scrolling up retraces the path and the dog returns to the slot.
 * - Legs animate only while scrolling; tail wags always.
 * - Below 768 px nothing is rendered here (a static peeking mascot is
 *   rendered inside the hero instead).
 */
export default function ScrollPup() {
  /* ── reduced motion ──────────────────────────────────────────────── */
  const shouldReduce = useReducedMotion();

  /* ── viewport / media ────────────────────────────────────────────── */
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = () => setIsDesktop(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  /* ── slot measurement ────────────────────────────────────────────── */
  const [slotPos, setSlotPos] = useState<{ x: number; y: number } | null>(null);
  const measureSlot = useCallback(() => {
    const el = document.getElementById('pup-slot');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Convert to page coordinates (viewport rect + scrollY)
    const pageX = rect.left + rect.width / 2 + window.scrollX;
    const pageY = rect.top + rect.height / 2 + window.scrollY;
    setSlotPos({ x: pageX, y: pageY });
  }, []);

  useLayoutEffect(() => {
    measureSlot();
    window.addEventListener('resize', measureSlot);
    return () => window.removeEventListener('resize', measureSlot);
  }, [measureSlot]);

  /* ── build waypoints with slot override ─────────────────────────── */
  // Convert vw/vh waypoints to px so useTransform can output px.
  // wp 0 and wp 1 x are pinned to the slot's page-x; wp 0 y is slot
  // lowered by 70 px (hidden behind the scallop).
  const buildPxWaypoints = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    return ZIGZAG_WAYPOINTS.map(([progress, xVw, yVh], i) => {
      let xPx = (xVw / 100) * vw;
      let yPx = (yVh / 100) * vh;

      if (slotPos) {
        if (i === 0) {
          xPx = slotPos.x - 48; // center the 96 px wide mascot
          yPx = slotPos.y + 70;  // lowered 70 px → hidden behind scallop
        } else if (i === 1) {
          xPx = slotPos.x - 48;
          yPx = slotPos.y - 20;  // hop 20 px above slot
        }
      }

      // Convert page-y to a fixed-position top value:
      // fixedY = pageY − scrollY. But since we drive everything from
      // scroll progress we bake the expected scrollY into each waypoint.
      // At progress p the scroll position is p * (docH − vh).
      const expectedScroll = progress * Math.max(docH - vh, 1);
      const fixedY = yPx - expectedScroll;

      return { progress, xPx, fixedY };
    });
  }, [slotPos]);

  const [waypoints, setWaypoints] = useState<
    { progress: number; xPx: number; fixedY: number }[]
  >([]);

  useLayoutEffect(() => {
    const update = () => setWaypoints(buildPxWaypoints());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [buildPxWaypoints]);

  /* ── scroll + spring ─────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  /* ── derive x & y from waypoints ─────────────────────────────────── */
  const inputRange = waypoints.map((wp) => wp.progress);
  const xOutput = waypoints.map((wp) => wp.xPx);
  const yOutput = waypoints.map((wp) => wp.fixedY);

  // Guard: useTransform needs at least 2 entries and monotonically
  // increasing input.  Before waypoints are populated, use a dummy.
  const safeInput = inputRange.length >= 2 ? inputRange : [0, 1];
  const safeXOut = xOutput.length >= 2 ? xOutput : [0, 0];
  const safeYOut = yOutput.length >= 2 ? yOutput : [0, 0];

  const x = useTransform(spring, safeInput, safeXOut);
  const y = useTransform(spring, safeInput, safeYOut);

  /* ── velocity → walking state ────────────────────────────────────── */
  const velocity = useVelocity(scrollYProgress);
  const [walking, setWalking] = useState(false);
  useEffect(() => {
    let raf: number;
    const check = () => {
      setWalking(Math.abs(velocity.get()) > 0.0008);
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, [velocity]);

  /* ── facing direction ────────────────────────────────────────────── */
  const [facing, setFacing] = useState<1 | -1>(1);
  const prevXRef = useRef(0);
  useEffect(() => {
    const unsub = x.on('change', (v: number) => {
      const delta = v - prevXRef.current;
      if (Math.abs(delta) > 0.5) {
        setFacing(delta > 0 ? 1 : -1);
      }
      prevXRef.current = v;
    });
    return unsub;
  }, [x]);

  /* ── render nothing on mobile or before measurement ──────────────── */
  if (!isDesktop || waypoints.length < 2) return null;

  /* ── reduced motion: static in slot, no movement ─────────────────── */
  if (shouldReduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        scaleX: facing,
        zIndex: 20,       // below scallop (z-30) and header (z-50)
        pointerEvents: 'none',
        willChange: 'transform',
      }}
      transition={{ scaleX: { duration: 0.35 } }}
    >
      <Mascot
        pose={walking ? 'walk' : 'idle'}
        animated
        className="w-24 h-24"
      />
    </motion.div>
  );
}
