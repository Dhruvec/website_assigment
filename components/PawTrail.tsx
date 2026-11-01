'use client';

import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   PAW TRAIL CONFIGURATION
   ───────────────────────────────────────────────────────────────────────────── */
const STEP = 60; // px of travel between prints
const SIDE = 12; // px perpendicular offset (alternating left/right)
const LIFE = 1900; // ms lifetime of each print
const MAX = 28; // max prints kept in memory / drawn
const PEAK_ALPHA = 0.6; // starting alpha when stamped
const DRAW_SCALE = 1.3; // scale multiplier
const MIN_STAMP_DISTANCE = 40; // skip stamp if within 40px of any of last 3 prints

interface PawPrint {
  x: number;
  y: number;
  angle: number;
  time: number;
}

// Pre-built Path2D for crisp, efficient paw rendering
let cachedPawPath: Path2D | null = null;

function getPawPath(): Path2D {
  if (cachedPawPath) return cachedPawPath;

  const path = new Path2D();
  // Main pad: rounded triangle-ish ellipse (rx 8.5, ry 7 at 0, 5)
  path.ellipse(0, 5, 8.5, 7, 0, 0, Math.PI * 2);

  // Four distinctly separated toe ellipses (3.4 x 4.6) at (-10,-3), (-3.6,-10.5), (3.6,-10.5), (10,-3)
  // each maintaining a 3px gap from the main pad
  path.ellipse(-10, -3, 3.4, 4.6, -0.32, 0, Math.PI * 2);
  path.ellipse(-3.6, -10.5, 3.4, 4.6, -0.08, 0, Math.PI * 2);
  path.ellipse(3.6, -10.5, 3.4, 4.6, 0.08, 0, Math.PI * 2);
  path.ellipse(10, -3, 3.4, 4.6, 0.32, 0, Math.PI * 2);

  cachedPawPath = path;
  return path;
}

export default function PawTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const printsRef = useRef<PawPrint[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const sideIndexRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI crisp rendering
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Color resolution: Caramel in light mode (#a14a1c), Gold in dark mode (#e5a84b)
    const getColor = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? { r: 229, g: 168, b: 75 } : { r: 161, g: 74, b: 28 };
    };

    // Render loop
    const render = (now: number) => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pawPath = getPawPath();
      const color = getColor();

      // Prune expired prints
      printsRef.current = printsRef.current.filter((p) => now - p.time < LIFE);

      for (let i = 0; i < printsRef.current.length; i++) {
        const p = printsRef.current[i];
        const age = now - p.time;
        const progress = age / LIFE;
        const alpha = PEAK_ALPHA * (1 - progress);
        if (alpha <= 0.01) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(DRAW_SCALE, DRAW_SCALE);

        // Fill with full alpha
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
        ctx.fill(pawPath);

        // 1px crisp stroke at 70% of fill alpha
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.7})`;
        ctx.lineWidth = 1 / DRAW_SCALE; // ensures crisp 1px stroke after scale
        ctx.stroke(pawPath);

        ctx.restore();
      }

      if (printsRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
      }
    };

    const scheduleRender = () => {
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      // Do not stamp on touch events to keep mobile gestures clean
      if (e.pointerType === 'touch') return;

      const curX = e.clientX;
      const curY = e.clientY;

      if (!lastPosRef.current) {
        lastPosRef.current = { x: curX, y: curY };
        return;
      }

      const dx = curX - lastPosRef.current.x;
      const dy = curY - lastPosRef.current.y;
      const travel = Math.hypot(dx, dy);

      if (travel >= STEP) {
        const normDx = dx / travel;
        const normDy = dy / travel;

        // Direction facing behaviour
        const angle = Math.atan2(normDy, normDx) + Math.PI / 2;

        // Alternating left/right perpendicular offset
        const perpX = -normDy;
        const perpY = normDx;
        const sideMultiplier = sideIndexRef.current % 2 === 0 ? 1 : -1;
        const stampX = curX + perpX * SIDE * sideMultiplier;
        const stampY = curY + perpY * SIDE * sideMultiplier;

        // Skip stamp if cursor is nearly stationary or circling:
        // skip if it would land within 40px of any of the last 3 prints
        const recentPrints = printsRef.current.slice(-3);
        const tooClose = recentPrints.some(
          (p) => Math.hypot(stampX - p.x, stampY - p.y) < MIN_STAMP_DISTANCE
        );

        lastPosRef.current = { x: curX, y: curY };

        if (!tooClose) {
          printsRef.current.push({
            x: stampX,
            y: stampY,
            angle,
            time: performance.now(),
          });

          if (printsRef.current.length > MAX) {
            printsRef.current.shift();
          }

          sideIndexRef.current++;
          scheduleRender();
        }
      }
    };

    const handlePointerLeave = () => {
      lastPosRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

