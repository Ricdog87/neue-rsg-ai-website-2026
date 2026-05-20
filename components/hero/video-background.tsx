'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Hero-section animated space background.
 *
 * Desktop : Live-rendered R3F scene — depth-parallax starfield (twinkle + glow shader),
 *           procedural fbm nebula in brand colors, occasional shooting stars, subtle
 *           camera drift + scroll parallax.
 *
 * Mobile  : HTML5 video loop + CSS animated gradient orbs.
 *           No WebGL on mobile → no context-limit flicker, iOS Safari safe.
 *
 * Performance:
 *   Desktop              : 6000 stars, dpr capped at 2
 *   prefers-reduced-motion: static gradient, no GPU work
 *   No WebGL             : gradient fallback shows through (background on wrapper)
 */

const NEBULA_FRAG = `
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColA;
uniform vec3 uColB;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 perm(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 tiSq(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float sn(vec3 v) {
const vec2 C = vec2(1.0/6.0, 1.0/3.0);
const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
vec3 i = floor(v + dot(v, C.yyy));
vec3 x0 = v - i + dot(i, C.xxx);
vec3 g = step(x0.yzx, x0.xyz);
vec3 l = 1.0 - g;
vec3 i1 = min(g.xyz, l.zxy);
vec3 i2 = max(g.xyz, l.zxy);
vec3 x1 = x0 - i1 + C.xxx;
vec3 x2 = x0 - i2 + C.yyy;
vec3 x3 = x0 - D.yyy;
i = mod289(i);
vec4 p = perm(perm(perm(i.z+vec4(0.0, i1.z, i2.z, 1.0))+i.y+vec4(0.0, i1.y, i2.y, 1.0))+i.x+vec4(0.0, i1.x, i2.x, 1.0));
float n_ = 0.142857142857;
vec3 ns = n_ * D.wyz - D.xzx;
vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
vec4 x_ = floor(j * ns.z);
vec4 y_ = floor(j - 7.0 * x_);
vec4 x = x_ * ns.x + ns.yyyy;
vec4 y = y_ * ns.x + ns.yyyy;
vec4 h = 1.0 - abs(x) - abs(y);
vec4 b0 = vec4(x.xy, y.xy);
vec4 b1 = vec4(x.zw, y.zw);
vec4 s0 = floor(b0)*2.0 + 1.0;
vec4 s1 = floor(b1)*2.0 + 1.0;
vec4 sh = -step(h, vec4(0.0));
vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
vec3 p0 = vec3(a0.xy, h.x);
vec3 p1 = vec3(a0.zw, h.y);
vec3 p2 = vec3(a1.xy, h.z);
vec3 p3 = vec3(a1.zw, h.w);
vec4 norm = tiSq(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
m = m * m;
return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
float fbm(vec3 p) {
float v = 0.0; float a = 0.5;
for (int i = 0; i < 5; i++) { v += a * sn(p); p *= 2.0; a *= 0.5; }
return v;
}
void main() {
vec2 uv = vUv * 2.0 - 1.0;
float d = length(uv);
vec3 p = vec3(uv * 1.5, uTime * 0.005);
float n = fbm(p) * 0.5 + 0.5;
float bands = pow(n, 2.2);
vec3 col = mix(uColA * 0.3, uColB * 0.4, n);
col += pow(bands, 3.0) * uColA * 0.4;
float vig = smoothstep(1.4, 0.3, d);
col *= vig;
gl_FragColor = vec4(col, bands * vig * 0.55);
}
`;

function Stars({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 200 + Math.pow(Math.random(), 0.6) * 600;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph) - 200;
      siz[i] = Math.random() * 2 + 0.3;
      const warm = Math.random() < 0.15;
      if (warm) c.setHSL(0.05 + Math.random() * 0.05, 0.6, 0.75 + Math.random() * 0.2);
      else c.setHSL(0.55 + Math.random() * 0.15, 0.4, 0.75 + Math.random() * 0.2);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.002;
    ref.current.rotation.x = t * 0.0012;
    (ref.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={sizes.length} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 }, uPx: { value: 1.5 } }}
        vertexShader={`
attribute float size;
attribute vec3 color;
varying vec3 vColor;
varying float vTw;
uniform float uTime;
uniform float uPx;
void main() {
  vColor = color;
  float h = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
  vTw = 0.75 + 0.25 * sin(uTime * (0.15 + h * 0.6) + h * 6.28);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = size * uPx * (300.0 / -mv.z) * vTw;
}
`}
        fragmentShader={`
varying vec3 vColor;
varying float vTw;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float a = (1.0 - smoothstep(0.0, 0.5, d)) * vTw;
  float glow = exp(-d * 8.0);
  gl_FragColor = vec4(vColor, a * 0.9 + glow * 0.25);
}
`}
      />
    </points>
  );
}

function Nebula() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    (ref.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    ref.current.rotation.z = state.clock.elapsedTime * 0.0012;
  });
  return (
    <mesh ref={ref} position={[0, 0, -400]}>
      <planeGeometry args={[2000, 2000]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uColA: { value: new THREE.Color('#a855f7') },
          uColB: { value: new THREE.Color('#14b8a6') },
        }}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={NEBULA_FRAG}
      />
    </mesh>
  );
}

function ShootingStar() {
  const ref = useRef<THREE.Line>(null);
  const data = useRef({
    shootT: 99,
    lastShoot: -10,
    start: new THREE.Vector3(),
    dir: new THREE.Vector3(),
  });
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);
  const mat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      }),
    []
  );
  const lineObj = useMemo(() => new THREE.Line(geo, mat), [geo, mat]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const d = data.current;
    if (t - d.lastShoot > 18 + Math.random() * 12) {
      d.lastShoot = t;
      d.shootT = 0;
      d.start.set(
        (Math.random() - 0.5) * 200,
        40 + Math.random() * 40,
        -50 - Math.random() * 50
      );
      d.dir.set(-1 - Math.random(), -0.3 - Math.random() * 0.4, 0).normalize();
    }
    if (d.shootT < 1) {
      d.shootT += 0.02;
      const head = d.start.clone().add(d.dir.clone().multiplyScalar(d.shootT * 200));
      const tail = head.clone().sub(d.dir.clone().multiplyScalar(30));
      const arr = geo.attributes.position.array as Float32Array;
      arr[0] = head.x; arr[1] = head.y; arr[2] = head.z;
      arr[3] = tail.x; arr[4] = tail.y; arr[5] = tail.z;
      geo.attributes.position.needsUpdate = true;
      mat.opacity = Math.sin(d.shootT * Math.PI) * 0.9;
    } else {
      mat.opacity = 0;
    }
  });

  return <primitive ref={ref} object={lineObj} />;
}

function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = typeof window !== 'undefined' ? window.scrollY : 0;
    state.camera.position.x = Math.sin(t * 0.03) * 0.5;
    state.camera.position.y = Math.cos(t * 0.04) * 0.3 - scroll * 0.003;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function VideoBackground() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    setMounted(true);
  }, []);

  return (
    <div
      aria-hidden
      className="video-bg-wrap pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        zIndex: 0,
        background:
          'radial-gradient(ellipse at 60% 40%, hsl(271 91% 65% / 0.20) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, hsl(174 100% 50% / 0.10) 0%, transparent 50%), hsl(240 10% 4%)',
      }}
    >
      {/* ── Mobile: HTML5 video + CSS animated orbs (no WebGL, iOS Safari-safe) ── */}
      {mounted && isMobile && !reduced && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ zIndex: 1, opacity: 0.45 }}
          >
            <source src="/3129671-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>

          {/* Purple orb — top-left */}
          <motion.div
            aria-hidden
            className="absolute rounded-full"
            style={{
              zIndex: 1,
              top: '-20%',
              left: '-20%',
              width: '85vw',
              height: '85vw',
              background: 'radial-gradient(circle, hsl(271 91% 65% / 0.42) 0%, transparent 70%)',
              filter: 'blur(48px)',
              willChange: 'transform',
            }}
            animate={{
              scale: [1, 1.18, 0.92, 1],
              x: ['0%', '10%', '-6%', '0%'],
              y: ['0%', '-12%', '7%', '0%'],
            }}
            transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
          />

          {/* Teal orb — bottom-right */}
          <motion.div
            aria-hidden
            className="absolute rounded-full"
            style={{
              zIndex: 1,
              bottom: '-15%',
              right: '-15%',
              width: '70vw',
              height: '70vw',
              background: 'radial-gradient(circle, hsl(174 100% 50% / 0.30) 0%, transparent 70%)',
              filter: 'blur(56px)',
              willChange: 'transform',
            }}
            animate={{
              scale: [1, 0.88, 1.12, 1],
              x: ['0%', '-8%', '5%', '0%'],
              y: ['0%', '10%', '-6%', '0%'],
            }}
            transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 2.5 }}
          />
        </>
      )}

      {/* ── Desktop: Three.js starfield (unchanged) ── */}
      {mounted && !isMobile && !reduced && (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 60], fov: 55, near: 0.1, far: 2000 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Stars count={6000} />
          <Nebula />
          <ShootingStar />
          <CameraDrift />
        </Canvas>
      )}

      {/* Readable-overlay: dark gradient on top so headline stays crisp */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            'linear-gradient(to bottom, hsl(240 10% 4% / 0.55) 0%, hsl(240 10% 4% / 0.28) 50%, hsl(240 10% 4% / 0.78) 100%)',
        }}
      />
    </div>
  );
}
