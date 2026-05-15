'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero-section background video.
 *
 * FIXES vs. previous version:
 *  1. position:absolute inside hero (not fixed) — eliminates all z-index conflicts
 *     with html/body backgrounds and isolation:isolate stacking contexts.
 *  2. z-index:0 for video, content sits at z-20 → no overlap issues.
 *  3. Single useEffect, no mounted/reduced state race condition.
 *  4. Overlays placed BEFORE video in DOM but z-index lower than content.
 *  5. prefers-reduced-motion checked synchronously — no state flash.
 *  6. onerror fallback: animated CSS gradient if video fails to load.
 *  7. Removed broken <source media="..."> attribute (not supported on <video>).
 */
export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReduced) {
      wrapRef.current?.classList.add('no-video');
      return;
    }

    const vid = videoRef.current;
    if (!vid) return;

    // Parallax: video drifts up at 0.25× scroll speed while hero is visible
    const onScroll = () => {
      const y = window.scrollY;
      vid.style.transform = `translateY(${(y * 0.25).toFixed(1)}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // absolute inside hero — zero z-index conflict with any ancestor
    <div
      ref={wrapRef}
      aria-hidden
      className="video-bg-wrap pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Gradient overlay — darkens video so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            'linear-gradient(to bottom, hsl(240 10% 4% / 0.75) 0%, hsl(240 10% 4% / 0.45) 50%, hsl(240 10% 4% / 0.80) 100%)',
        }}
      />

      {/* The video itself — taller than container for parallax headroom */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-0 w-full object-cover"
        style={{
          top: '-15%',
          height: '130%',
          zIndex: 1,
          opacity: 0.7,
          willChange: 'transform',
        }}
        onError={(e) => {
          // If video fails, show animated gradient fallback
          const target = e.currentTarget as HTMLVideoElement;
          target.style.display = 'none';
          const fallback = target.parentElement?.querySelector('.video-fallback') as HTMLElement;
          if (fallback) fallback.style.display = 'block';
        }}
      >
        <source
          src="/3129671-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        <source
          src="/3129671-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* CSS-only animated fallback (hidden until video errors) */}
      <div
        className="video-fallback absolute inset-0"
        style={{
          display: 'none',
          zIndex: 1,
          background:
            'radial-gradient(ellipse at 60% 40%, hsl(271 91% 65% / 0.25) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, hsl(174 100% 50% / 0.15) 0%, transparent 50%)',
          animation: 'gradientShift 8s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
}
