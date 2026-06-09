'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor-Fade-Trail (Lusion-Stil) — ein weicher, ausfadender Brand-Schweif,
 * der dem Mauszeiger mit leichter Verzögerung folgt. Canvas-basiert mit
 * additivem Glow (Cyan-Kern -> Violett-Rand). Laeuft NUR auf Desktops mit
 * feiner Maus (kein Touch), respektiert prefers-reduced-motion, pausiert bei
 * inaktivem Tab. pointer-events: none -> blockiert nie die Bedienung.
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqFine = window.matchMedia('(pointer: fine) and (min-width: 901px)');
    if (mqReduce.matches || !mqFine.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const target = { x: w / 2, y: h / 2 };
    const pos = { x: w / 2, y: h / 2 };
    let lastMove = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      lastMove = performance.now();
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let paused = document.hidden;
    const onVis = () => {
      paused = document.hidden;
    };
    document.addEventListener('visibilitychange', onVis);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (paused) return;

      // Bestehenden Schweif sanft ausfaden (Alpha reduzieren)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.14)';
      ctx.fillRect(0, 0, w, h);

      // Weiches Nachlaufen Richtung Cursor
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;

      // Bei Stillstand verblasst der Schweif ganz
      const idle = performance.now() - lastMove;
      const intensity = lastMove === 0 ? 0 : Math.max(0, 1 - idle / 900);
      if (intensity > 0.01) {
        const r = 150;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
        grad.addColorStop(0, `rgba(45,240,220,${0.22 * intensity})`);
        grad.addColorStop(0.4, `rgba(120,90,240,${0.12 * intensity})`);
        grad.addColorStop(1, 'rgba(120,90,240,0)');
        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
