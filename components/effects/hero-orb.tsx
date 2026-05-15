'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Hero centerpiece — a slowly rotating, iridescent distorted sphere.
 * Replaces the static SVG astronaut. Reads as an "AI brain / nucleus"
 * floating in the cosmos, while the surrounding particle field gives
 * it scale.
 *
 * Drei's MeshDistortMaterial + Environment HDRI for chromy reflections,
 * Float for organic up/down drift, Bloom for glow.
 */

function Orb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.12;
    ref.current.rotation.x += dt * 0.04;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.4}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.35}
          metalness={0.95}
          roughness={0.12}
          distort={0.42}
          speed={1.6}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Inner core that bleeds through highlights */}
      <mesh scale={0.55}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00ffe0" transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

export function HeroOrb() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    if (lowEnd) return;
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[80vh] w-[90vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 md:h-[90vh]"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -3, -2]} intensity={0.8} color="#00ffe0" />
        <pointLight position={[0, 0, 6]} intensity={1.5} color="#a855f7" />

        <Orb />

        {/* HDRI for the metallic reflection — uses preset, no asset bytes */}
        <Environment preset="city" />

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.9} luminanceThreshold={0.3} luminanceSmoothing={0.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
