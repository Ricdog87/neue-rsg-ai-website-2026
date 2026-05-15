'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Hero WebGL overlay — a field of GPU-driven particles that drift,
 * react to the mouse, and pulse along the brand-neon spectrum.
 *
 * Sits ABOVE the video background (z-index between video and content),
 * additive blending lets the underlying video shine through.
 */

const PARTICLE_COUNT = 1800;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uSize;
  attribute float aScale;
  attribute float aSpeed;
  attribute vec3  aSeed;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    // Per-particle drift on a low-frequency noise-ish path
    float t = uTime * aSpeed;
    p.x += sin(t + aSeed.x * 6.28) * 0.35;
    p.y += cos(t * 0.8 + aSeed.y * 6.28) * 0.25;
    p.z += sin(t * 0.6 + aSeed.z * 6.28) * 0.20;

    // Mouse-pull: particles within radius get tugged toward the cursor
    vec2 toMouse = uMouse - p.xy;
    float d = length(toMouse);
    float pull = smoothstep(2.0, 0.0, d) * 0.6;
    p.xy += normalize(toMouse + 0.0001) * pull;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (1.0 / -mv.z);

    vAlpha = smoothstep(8.0, 1.5, -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float falloff = smoothstep(0.5, 0.0, d);
    vec3  col = mix(uColorA, uColorB, falloff);
    gl_FragColor = vec4(col, falloff * vAlpha * 0.9);
  }
`;

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { viewport, pointer } = useThree();

  const { geometry, uniforms } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const seeds = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      scales[i] = Math.random() * 60 + 10;
      speeds[i] = Math.random() * 0.4 + 0.1;
      seeds[i * 3 + 0] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));

    const u = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 1.0 },
      uColorA: { value: new THREE.Color('#a855f7') }, // accent purple
      uColorB: { value: new THREE.Color('#00ffe0') }, // neon turquoise
    };

    return { geometry: geo, uniforms: u };
  }, []);

  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    // Map normalized pointer (-1..1) into viewport space
    const mx = pointer.x * viewport.width * 0.5;
    const my = pointer.y * viewport.height * 0.5;
    uniforms.uMouse.value.lerp(new THREE.Vector2(mx, my), 0.08);
    if (ref.current) ref.current.rotation.z += dt * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroWebGL() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Heuristic: skip on very low-power devices
    const lowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    if (lowEnd) return;
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 5 }} // above video (z:1) + overlay (z:2), below content (z:20)
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 55 }}
      >
        <ParticleField />
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.7} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0012, 0.0008] as unknown as THREE.Vector2}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
