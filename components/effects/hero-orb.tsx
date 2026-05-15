'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';

/**
 * Hero centerpiece — iridescent distort sphere.
 *
 * Positioned upper-right, masked into the background via a CSS radial
 * gradient so there is no visible canvas edge. ScrollTrigger drives a
 * scrub'd scale + drift + rotation so the orb breathes with the scroll.
 *
 * Lazy-loaded; reduced-motion + low-CPU guards skip it entirely.
 */

function Orb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.08;
    ref.current.rotation.x += dt * 0.03;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.55}>
      <mesh ref={ref} scale={1.25}>
        <icosahedronGeometry args={[1, 96]} />
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#5b21b6"
          emissiveIntensity={0.28}
          metalness={1}
          roughness={0.18}
          distort={0.38}
          speed={1.3}
          envMapIntensity={1.6}
        />
      </mesh>
      <mesh scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00ffe0" transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

export function HeroOrb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    if (lowEnd) return;
    setEnabled(true);
  }, []);

  useGSAP(
    () => {
      const el = wrapRef.current;
      if (!el || !enabled) return;

      // Scroll-scrub: orb drifts down + scales as you leave the hero
      gsap.to(el, {
        yPercent: 18,
        scale: 1.18,
        rotate: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    },
    { scope: wrapRef, dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute z-10"
      style={{
        // Upper-right, behind the headline visually but on top of video
        top: '50%',
        right: '-8%',
        transform: 'translateY(-50%)',
        width: 'min(72vw, 820px)',
        height: 'min(72vw, 820px)',
        // Soft radial mask → no visible canvas edge, blends into bg
        WebkitMaskImage:
          'radial-gradient(circle at 50% 50%, black 32%, rgba(0,0,0,0.7) 50%, transparent 72%)',
        maskImage:
          'radial-gradient(circle at 50% 50%, black 32%, rgba(0,0,0,0.7) 50%, transparent 72%)',
        willChange: 'transform',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 4, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-5, -3, -2]} intensity={0.7} color="#00ffe0" />
        <pointLight position={[3, 2, 5]} intensity={1.4} color="#a855f7" />

        <Orb />

        <Environment preset="city" background={false} />

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.7} luminanceThreshold={0.35} luminanceSmoothing={0.6} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
