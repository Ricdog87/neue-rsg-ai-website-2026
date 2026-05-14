'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cinematic fullscreen background video with scroll-parallax + fade-out.
 * - Respects prefers-reduced-motion (renders nothing if set).
 * - Video fades from full → 0 as user scrolls 40–90% of hero height.
 * - Parallax: video translates at 20% of scroll speed (slower = depth).
 * - Extra 20% height with negative top offset gives parallax headroom.
 */
export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const wrap = wrapRef.current;
    const vid  = videoRef.current;
    if (!wrap || !vid) return;

    const onScroll = () => {
      const h     = window.innerHeight;
      const y     = window.scrollY;
      const start = h * 0.35;
      const end   = h * 0.85;

      // Opacity fade
      const op = y < start ? 1 : y > end ? 0 : 1 - (y - start) / (end - start);
      wrap.style.opacity = String(op.toFixed(3));

      // Parallax: video moves at 0.2× scroll speed
      vid.style.transform = `translateY(${(y * 0.2).toFixed(1)}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  // Don't render on server or if reduced-motion
  if (!mounted || reduced) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ willChange: 'opacity' }}
    >
      {/* Multi-layer dark overlays — keeps text readable at any scroll depth */}
      <div className="absolute inset-0 z-10 bg-[hsl(var(--bg))/55]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[hsl(var(--bg))/80] via-transparent to-[hsl(var(--bg))/70]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[hsl(var(--bg))/60] via-transparent to-[hsl(var(--bg))/30]" />

      {/* The video — extra tall (-10% / 120%) gives parallax scroll room */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-0 w-full object-cover"
        style={{
          top: '-10%',
          height: '120%',
          willChange: 'transform',
          opacity: 0.55,
        }}
      >
        {/* HD first (faster load), UHD as fallback for retina */}
        <source
          src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4"
          type="video/mp4"
          media="(max-width: 1920px)"
        />
        <source
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
