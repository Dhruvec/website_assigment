'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Mascot, MascotPeek } from '@/components/ui/Mascot';

/* ─────────────────────────────────────────────────────────────────────
   CONFIG / TUNABLES
   ───────────────────────────────────────────────────────────────────── */

/**
 * Zigzag path: 10 stops expressed in vw/vh, driven by normalized scroll
 * progress.
 * progress stops [0, .1, .22, .34, .46, .58, .7, .82, .92, 1]
 * x(vw) [50, 78, 8, 80, 10, 78, 8, 76, 14, 50]
 * y(vh) [45, 48, 64, 46, 66, 48, 64, 46, 64, 58]
 */
const ZIGZAG_STOPS: [number, number, number][] = [
  [0.00, 50, 45],
  [0.10, 78, 48],
  [0.22, 8, 64],
  [0.34, 80, 46],
  [0.46, 10, 66],
  [0.58, 78, 48],
  [0.70, 8, 64],
  [0.82, 76, 46],
  [0.92, 14, 64],
  [1.00, 50, 58],
];

/** Release distance: after ~160px of scroll the dog crossfades to walking and hops out. */
const RELEASE_DISTANCE = 160;

/** Blend factor: ease the dog out of slot into zigzag path. */
const RELEASE_RANGE = 0.6;

/** Hop: dog emerges from 70px below slot to 20px above it. */
const HOP_HIDDEN = 70;
const HOP_ABOVE = -20;

/** Smooth the raw scrollY before feeding it into the path math. */
const SCROLL_SMOOTH = 0.2;

/** Threshold for "legs moving" (px per frame). */
const WALK_THRESHOLD = 0.5;
/** Threshold to ignore tiny dx when deciding facing. */
const FACE_THRESHOLD = 0.4;

const DOG_WIDTH = 150;
const DOG_HEIGHT = 112.5;

/* ─────────────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────────────── */

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

const ease = smoothstep;

function clamp(t: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, t));
}

export default function ScrollPup() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  /* ── slot measurement (page coords) ────────────────────────────────── */
  const [slotPos, setSlotPos] = useState<{ x: number; y: number } | null>(null);

  const measureSlot = useCallback(() => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('pup-slot');
    if (!el) {
      setSlotPos(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    const pageX = rect.left + rect.width / 2 + window.scrollX;
    const pageY = rect.top + rect.height / 2 + window.scrollY;
    setSlotPos({ x: pageX, y: pageY });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = () => setIsDesktop(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Measure on mount & resize on home page
  useEffect(() => {
    if (!isHome || typeof window === 'undefined') return;
    measureSlot();
    window.addEventListener('resize', measureSlot);
    const t = setTimeout(measureSlot, 300);
    return () => {
      window.removeEventListener('resize', measureSlot);
      clearTimeout(t);
    };
  }, [measureSlot, isHome]);

  /* ── animation loop refs (no state re-renders per frame) ──────────── */
  const dogRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);

  const curScrollYRef = useRef(0);
  const prevXRef = useRef(0);
  const prevWalkingRef = useRef(false);
  const prevFacingRef = useRef<1 | -1>(1);
  const settledRef = useRef(false);

  // Crossfade opacity state (peek vs walk)
  const [peekOpacity, setPeekOpacity] = useState(1);
  const [walkOpacity, setWalkOpacity] = useState(0);

  const [walking, setWalking] = useState(false);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [settled, setSettled] = useState(false);

  // Reset state when navigating to home page
  useEffect(() => {
    if (isHome) {
      curScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;
      prevXRef.current = 0;
      prevWalkingRef.current = false;
      prevFacingRef.current = 1;
      settledRef.current = false;
      setPeekOpacity(1);
      setWalkOpacity(0);
      setWalking(false);
      setFacing(1);
      setSettled(false);
    }
  }, [isHome]);

  /* ── rAF loop (smooth cur += (target - cur) * 0.2) ────────────────── */
  useEffect(() => {
    if (!isHome || !isDesktop || typeof document === 'undefined') return;

    let rafId: number;
    let running = true;

    const loop = () => {
      if (!running || !dogRef.current) return;

      const slotEl = document.getElementById('pup-slot');
      const raw = window.scrollY;
      curScrollYRef.current += (raw - curScrollYRef.current) * SCROLL_SMOOTH;
      const s = curScrollYRef.current;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const range = Math.max(docH - vh, 1);

      // Slot / fallback coordinates for "/"
      const slotRect = slotEl ? slotEl.getBoundingClientRect() : null;
      const slotViewX = slotRect
        ? slotRect.left + slotRect.width / 2 - DOG_WIDTH / 2
        : (slotPos ? slotPos.x - DOG_WIDTH / 2 : vw / 2 - DOG_WIDTH / 2);
      const slotViewY = slotRect
        ? slotRect.top
        : (slotPos ? slotPos.y - s - DOG_HEIGHT / 2 : vh * 0.45 - DOG_HEIGHT / 2);

      let sx = 0;
      let sy = 0;

      // Home page: dog in #pup-slot at scroll 0, hops out at ~160px
      if (s < RELEASE_DISTANCE) {
        // Inside slot in peek pose
        sx = slotViewX;
        sy = slotViewY;

        // Crossfade: at scroll 0 peek=1 walk=0; near 160px crossfade
        const cross = clamp((s - 120) / 40, 0, 1);
        setPeekOpacity(1 - cross);
        setWalkOpacity(cross);
      } else {
        // Hopped out: full walking pose
        setPeekOpacity(0);
        setWalkOpacity(1);

        const progress = clamp((s - RELEASE_DISTANCE) / range, 0, 1);
        const hopProgress = clamp((s - RELEASE_DISTANCE) / 80, 0, 1);
        const easeHop = smoothstep(hopProgress);

        const sySlot = slotViewY + HOP_HIDDEN * (1 - easeHop) - HOP_ABOVE * easeHop;
        const sxSlot = slotViewX;

        // Zigzag stops
        const stops = ZIGZAG_STOPS;
        let left = 0;
        for (let i = 1; i < stops.length; i++) {
          if (progress <= stops[i][0]) {
            left = i - 1;
            break;
          }
        }
        const a = stops[left];
        const right = stops[left + 1] || stops[stops.length - 1];
        const t = a[0] === right[0] ? 0 : (progress - a[0]) / (right[0] - a[0]);
        const xVw = a[1] + (right[1] - a[1]) * t;
        const yVh = a[2] + (right[2] - a[2]) * t;
        const nx = (xVw / 100) * vw - DOG_WIDTH / 2;
        const ny = (yVh / 100) * vh - DOG_HEIGHT / 2;

        const b = smoothstep(clamp((s - RELEASE_DISTANCE) / (vh * RELEASE_RANGE), 0, 1));
        sx = sxSlot + (nx - sxSlot) * b;
        sy = sySlot + (ny - sySlot) * b;
      }

      let x = sx;
      let y = sy;
      const box = dogRef.current;

      // ── D1) Floor-walk in pinned MeetThePups section ────────────────
      const meetEl = document.getElementById('meet-pups');
      const floorEl = document.getElementById('pups-floor');
      if (meetEl && floorEl && box) {
        const sr = meetEl.getBoundingClientRect();
        const fr = floorEl.getBoundingClientRect();
        const H = window.innerHeight;
        const W = window.innerWidth;
        const dogW = box.offsetWidth || DOG_WIDTH;
        const dogH = box.offsetHeight || DOG_HEIGHT;

        const f = clamp(-sr.top / Math.max(1, sr.height - H));
        const floorX = 24 + f * (W - dogW - 48);
        const floorY = fr.top + 55 - dogH;
        const w =
          ease(clamp((H - sr.top) / (0.6 * H))) *
          ease(clamp((sr.bottom - H) / (0.4 * H)));

        if (Number.isFinite(floorX) && Number.isFinite(floorY) && Number.isFinite(w)) {
          x += (floorX - x) * w;
          y += (floorY - y) * w;
        }
      }

      // ── D2) Basket settling in Footer ───────────────────────────────
      const basketEl = document.getElementById('pup-basket');
      if (basketEl && box) {
        const br = basketEl.getBoundingClientRect();
        const H = window.innerHeight;
        const dogW = DOG_WIDTH;
        const PEEK_DOG_H = 150;

        const tx = br.left + br.width / 2 - dogW / 2;
        const ty = br.top + 118 - PEEK_DOG_H;

        const basketVisible = H - br.top;
        const basketProgress = clamp((basketVisible - 40) / 160);

        const docHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        );
        const maxScroll = Math.max(1, docHeight - H);
        const distToBottom = Math.max(0, maxScroll - s);
        const bottomProgress = distToBottom < 70 ? 1 : clamp((280 - distToBottom) / 210);

        const rawW = Math.max(basketProgress, bottomProgress);
        const wBasket = ease(rawW);

        if (Number.isFinite(tx) && Number.isFinite(ty) && Number.isFinite(wBasket)) {
          x += (tx - x) * wBasket;
          y += (ty - y) * wBasket;

          const isSettled = wBasket >= 0.88;
          if (isSettled) {
            x = tx;
            y = ty;
          }

          if (settledRef.current !== isSettled) {
            settledRef.current = isSettled;
            setSettled(isSettled);
            box.classList.toggle('pup-settled', isSettled);
          }
        }
      } else if (settledRef.current) {
        settledRef.current = false;
        setSettled(false);
        if (box) box.classList.remove('pup-settled');
      }

      // ── Facing direction (from dx sign) ─────────────────────────────
      const isSettled = settledRef.current;
      const dx = isSettled ? 0 : x - prevXRef.current;

      if (isSettled) {
        if (prevFacingRef.current !== 1) {
          prevFacingRef.current = 1;
          setFacing(1);
        }
        if (flipRef.current) {
          flipRef.current.style.transform = 'scaleX(1)';
        }
      } else if (Math.abs(dx) > FACE_THRESHOLD) {
        const newFacing = dx > 0 ? (1 as const) : (-1 as const);
        if (prevFacingRef.current !== newFacing) {
          prevFacingRef.current = newFacing;
          setFacing(newFacing);
          if (flipRef.current) {
            flipRef.current.style.transform = `scaleX(${newFacing})`;
          }
        }
      }
      prevXRef.current = x;

      // ── Walking state (legs move only while moving; tail always wags) ──
      const moved = !isSettled && Math.abs(dx) > WALK_THRESHOLD;
      if (prevWalkingRef.current !== moved) {
        prevWalkingRef.current = moved;
        setWalking(moved);
      }

      // ── Write transform (translate3d ONLY) ─────────────────────────
      if (Number.isFinite(x) && Number.isFinite(y) && dogRef.current) {
        dogRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, [isHome, isDesktop, slotPos, pathname]);

  // When pathname !== "/", return null before rendering DOM or starting rAF
  if (!mounted || !isDesktop || !isHome || typeof document === 'undefined') {
    return null;
  }

  return (
    <>
      <div aria-hidden="true" />
      {createPortal(
        <div
          ref={dogRef}
          className="scroll-pup pointer-events-none fixed left-0 top-0 z-20 hidden md:block will-change-transform"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: DOG_WIDTH,
            height: 'auto',
            zIndex: 20,
            pointerEvents: 'none',
            willChange: 'transform',
            transform: `translate3d(${slotPos ? slotPos.x - DOG_WIDTH / 2 : (typeof window !== 'undefined' ? window.innerWidth / 2 : 500) - DOG_WIDTH / 2}px, ${slotPos ? slotPos.y - DOG_HEIGHT / 2 : (typeof window !== 'undefined' ? window.innerHeight * 0.45 : 300) - DOG_HEIGHT / 2}px, 0)`,
          }}
        >
          <div
            ref={flipRef}
            style={{
              width: DOG_WIDTH,
              height: 'auto',
              transform: `scaleX(${facing})`,
              position: 'relative',
            }}
          >
            {/* Peek pose: at scroll 0 in slot, or settled in footer basket */}
            <div
              style={{
                opacity: settled ? 1 : peekOpacity,
                position: settled || peekOpacity === 1 ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                pointerEvents: 'none',
                display: (!settled && peekOpacity <= 0) ? 'none' : 'block',
              }}
            >
              <MascotPeek className="block w-full h-auto" />
            </div>

            {/* Walking pose: after hop-out on home */}
            {!settled && (
              <div
                style={{
                  opacity: walkOpacity,
                  position: walkOpacity === 1 ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  display: walkOpacity <= 0 ? 'none' : 'block',
                }}
              >
                <Mascot
                  walking={walking}
                  pose="walk"
                  className="block w-full h-auto"
                  noWag={false}
                />
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
