'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * Neural-Space Hero Scene
 *
 * A cinematic dark-space backdrop combining:
 *   1. Deep-space starfield (drei Stars) — slow rotational drift
 *   2. Drifting particle dust — gives the field depth
 *   3. Animated neural-network nodes — pulsing AI "agents"
 *      connected by data-flow lines
 *   4. Indigo nebula glow pulses
 *
 * Designed to read as "AI agents working in deep space" — premium,
 * cinematic, no cliché floating brain.
 */

function DustField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pts = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
      // Spherical distribution biased toward camera
      const r = 8 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.012;
    ref.current.rotation.x += dt * 0.004;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#bfeae6"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

interface Node {
  pos: THREE.Vector3;
  phase: number;
  speed: number;
  size: number;
}

function NeuralNetwork() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);

  // Build a constellation of AI "agent" nodes
  const { nodes, nodePositions, sizes, baseSizes } = useMemo(() => {
    const N = 40;
    const out: Node[] = [];
    const positions = new Float32Array(N * 3);
    const sz = new Float32Array(N);
    const base = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      // Distribute on a soft disk in front of camera, with depth
      const r = Math.pow(Math.random(), 0.7) * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r * 0.55;
      const z = (Math.random() - 0.5) * 4;
      const pos = new THREE.Vector3(x, y, z);
      out.push({
        pos,
        phase: Math.random() * Math.PI * 2,
        speed: 0.7 + Math.random() * 1.4,
        size: 0.06 + Math.random() * 0.1,
      });
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      base[i] = 0.06 + Math.random() * 0.1;
      sz[i] = base[i];
    }
    return { nodes: out, nodePositions: positions, sizes: sz, baseSizes: base };
  }, []);

  // Build connection-line buffer: for each node, link to its k-nearest
  const { lineGeometry } = useMemo(() => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const distances: { j: number; d: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        distances.push({ j, d });
      }
      distances.sort((a, b) => a.d - b.d);
      // Connect to nearest 2 — sparse data-flow web
      for (let k = 0; k < 2; k++) {
        const j = distances[k].j;
        const key: [number, number] = i < j ? [i, j] : [j, i];
        // dedupe (sloppy but fine at this scale)
        if (!pairs.some((p) => p[0] === key[0] && p[1] === key[1])) {
          pairs.push(key);
        }
      }
    }

    const positions = new Float32Array(pairs.length * 6);
    for (let p = 0; p < pairs.length; p++) {
      const [i, j] = pairs[p];
      const a = nodes[i].pos;
      const b = nodes[j].pos;
      positions[p * 6] = a.x;
      positions[p * 6 + 1] = a.y;
      positions[p * 6 + 2] = a.z;
      positions[p * 6 + 3] = b.x;
      positions[p * 6 + 4] = b.y;
      positions[p * 6 + 5] = b.z;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { lineGeometry: geom };
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Stronger node pulse with occasional "burst" — every ~6s a random
    // node briefly flares up to 3x size like a data packet firing.
    if (nodesRef.current) {
      const sizeAttr = nodesRef.current.geometry.getAttribute('size') as THREE.BufferAttribute | undefined;
      if (sizeAttr) {
        const burstNode = Math.floor((t / 1.8) * 7) % nodes.length;
        const burstPhase = (t * 0.55) % 1;
        const burstStrength = burstPhase < 0.18 ? (1 - burstPhase / 0.18) * 2.4 : 0;

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const pulse = 0.55 + 0.55 * Math.sin(t * n.speed + n.phase);
          let s = baseSizes[i] * (0.7 + pulse * 1.1);
          if (i === burstNode) s *= 1 + burstStrength;
          sizeAttr.array[i] = s;
        }
        sizeAttr.needsUpdate = true;
      }
    }

    // Lines pulse opacity more dramatically + slight wave
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.22 + 0.12 * Math.sin(t * 0.55) + 0.06 * Math.sin(t * 1.7);
    }
  });

  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          attach="material"
          color="#22e0d0"
          transparent
          opacity={0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes — bright points with per-vertex sizing */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uColor: { value: new THREE.Color('#bff3ec') },
            uAccent: { value: new THREE.Color('#0b5f57') },
          }}
          vertexShader={/* glsl */ `
            attribute float size;
            varying float vDist;
            void main() {
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              vDist = -mv.z;
              gl_PointSize = size * (300.0 / vDist);
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={/* glsl */ `
            uniform vec3 uColor;
            uniform vec3 uAccent;
            varying float vDist;
            void main() {
              vec2 uv = gl_PointCoord - vec2(0.5);
              float r = length(uv);
              if (r > 0.5) discard;
              float core = smoothstep(0.5, 0.0, r);
              float glow = pow(core, 3.0);
              vec3 col = mix(uAccent, uColor, glow);
              gl_FragColor = vec4(col, glow);
            }
          `}
        />
      </points>
    </group>
  );
}

/** Floating indigo nebula — a soft blurred plane behind everything. */
function NebulaPulse() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      const mat = ref.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <planeGeometry args={[44, 28]} />
      <shaderMaterial
        depthWrite={false}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uDeep: { value: new THREE.Color('#040405') }, // near-black space
          uIndigo: { value: new THREE.Color('#0a0c0c') }, // deep indigo bed
          uViolet: { value: new THREE.Color('#0f3a37') }, // brand violet ribbons
          uCyan: { value: new THREE.Color('#17c4b3') }, // brand cyan crests
        }}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uDeep;
          uniform vec3 uIndigo;
          uniform vec3 uViolet;
          uniform vec3 uCyan;

          vec2 hash(vec2 p){
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
          }
          float noise(vec2 p){
            const float K1 = 0.366025404;
            const float K2 = 0.211324865;
            vec2 i = floor(p + (p.x + p.y) * K1);
            vec2 a = p - i + (i.x + i.y) * K2;
            vec2 o = a.x > a.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec2 b = a - o + K2;
            vec2 c = a - 1.0 + 2.0 * K2;
            vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
            vec3 n = h*h*h*h * vec3(dot(a, hash(i)), dot(b, hash(i+o)), dot(c, hash(i+1.0)));
            return dot(n, vec3(70.0));
          }
          float fbm(vec2 p){
            float v = 0.0; float a = 0.5;
            for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
            return v;
          }

          void main(){
            vec2 uv = vUv;
            vec2 p = uv * 2.0 - 0.5;
            float t = uTime * 0.05;
            // domain-warp -> flowing aurora ribbons (cinematic bed)
            vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t * 0.7)));
            float f = fbm(p + 2.2 * q);
            float g = fbm(p * 1.6 + 3.0 * q - t * 0.4);
            vec3 col = mix(uDeep, uIndigo, smoothstep(-0.1, 0.5, f));
            col = mix(col, uViolet, smoothstep(0.2, 0.8, f + 0.25 * q.x));
            col = mix(col, uCyan, smoothstep(0.6, 1.0, g + 0.35 * q.y));
            float glow = smoothstep(1.15, 0.0, distance(uv, vec2(0.80, 0.74)));
            col += uCyan * 0.18 * glow;
            col += uViolet * 0.15 * smoothstep(1.1, 0.0, distance(uv, vec2(0.20, 0.16)));
            float vig = smoothstep(1.3, 0.2, length(vUv - 0.5));
            col *= 0.46 + 0.95 * vig;
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}

/**
 * Cinematic camera director — drives a 38-second short-film loop:
 *   00–10s · slow zoom IN, gentle tilt
 *   10–18s · dolly RIGHT, slight roll
 *   18–26s · zoom OUT, drift UP
 *   26–34s · arc back left + descend
 *   34–38s · ease back to start
 *
 * Uses smoothstep blends so transitions feel hand-keyframed.
 */
function CameraDirector({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const pos = useRef({ x: 0, y: 0, z: 7 });

  // Smoothstep helper
  const ss = (e0: number, e1: number, x: number) => {
    const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  };

  useFrame((state, dt) => {
    const T = state.clock.elapsedTime;
    const cycle = 44;
    const t = T % cycle;

    // ── Camera path (parametric, easing-blended) ───────────
    // Easing windows across a 44s loop — alive but never frantic.
    const p1 = ss(0, 11, t); // zoom in
    const p2 = ss(11, 21, t); // dolly right
    const p3 = ss(21, 31, t); // ease back out + lift
    const p4 = ss(31, 40, t); // drift left
    const p5 = ss(40, 44, t); // settle home

    // Compose camera position — generous amplitudes so the scene clearly
    // moves (no longer reads as stiff), with smoothstep blends to stay
    // cinematic rather than jittery.
    let cx = 0, cy = 0, cz = 7.5;

    // Phase 1 — zoom in, tilt up
    cz += -2.4 * p1;
    cy += 0.5 * p1;

    // Phase 2 — dolly right
    cx += 2.0 * p2;
    cy += -0.4 * p2;

    // Phase 3 — ease back out + lift
    cz += 3.0 * p3;
    cy += 1.0 * p3;

    // Phase 4 — drift left
    cx += -3.4 * p4;
    cy += -1.3 * p4;

    // Phase 5 — settle back toward start
    cx += 1.6 * p5;
    cy += 0.15 * p5;
    cz += -0.8 * p5;

    // Mouse parallax on top
    cx += pointer.current.x * 0.5;
    cy += -pointer.current.y * 0.28;

    // Continuous autonomous breathing — keeps the frame alive even between
    // the keyframed phases, so it never looks frozen.
    cz += Math.sin(T * 0.16) * 0.22;
    cy += Math.cos(T * 0.12) * 0.18;
    cx += Math.sin(T * 0.07) * 0.16;

    // Smooth lerp toward target — frame-rate independent, with inertia.
    const lerp = 1 - Math.pow(0.5, dt * 2.0);
    pos.current.x += (cx - pos.current.x) * lerp;
    pos.current.y += (cy - pos.current.y) * lerp;
    pos.current.z += (cz - pos.current.z) * lerp;

    state.camera.position.set(pos.current.x, pos.current.y, pos.current.z);

    // Always look slightly above origin for cinematic framing
    target.current.set(
      pointer.current.x * 0.3,
      0.2 + pointer.current.y * -0.2,
      0,
    );
    state.camera.lookAt(target.current);
  });

  return null;
}


/* ────────────────────────────────────────────────────────────
   COSMOS LAYERS — multi-depth parallax starfield, galaxy spiral,
   shooting stars. All additive over the nebula plane.
   ──────────────────────────────────────────────────────────── */

/**
 * Far parallax dust — tiny near-static distant particles. Gives the
 * scene a sense of "this goes on forever in every direction".
 */
function FarDust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const N = 2200;
    const pts = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 25 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.004;
    ref.current.rotation.x += dt * 0.0015;
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#9fb4b0"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  );
}

/**
 * Distant galaxy spiral — a flat disc of particles arranged in two
 * logarithmic spiral arms. Slowly rotates. Sits far behind the
 * neural network at z = -8.
 */
function GalaxySpiral() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const N = 3500;
    const pts = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      // Logarithmic spiral
      const branch = i % 2 === 0 ? 0 : Math.PI;
      const t = (i / N) * 6.5 + 0.5;
      const r = t * 1.4;
      const angle = t * 2.2 + branch + (Math.random() - 0.5) * 0.6;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r * 0.18 + (Math.random() - 0.5) * 0.4; // flatten
      const z = Math.sin(angle) * r;
      // Random radial jitter
      const jitter = (Math.random() - 0.5) * 0.6;
      pts[i * 3] = x + jitter;
      pts[i * 3 + 1] = y;
      pts[i * 3 + 2] = z + jitter;
    }
    return pts;
  }, []);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.025;
  });
  return (
    <group position={[6, -1, -8]} rotation={[0.5, 0.3, 0.2]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#bfeae6"
          size={0.025}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Bright core */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshBasicMaterial
          color="#e9f3f1"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/**
 * Shooting stars — every few seconds, a streak fires across the
 * sky from a random off-screen position to another. Premium "alive"
 * signal — the cosmos has weather.
 */
function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null);
  const STREAK_COUNT = 3;

  // Each streak holds its own state in a ref
  const streaks = useMemo(
    () =>
      Array.from({ length: STREAK_COUNT }, (_, i) => ({
        startTime: i * 4.5 + Math.random() * 3,
        cycle: 9 + Math.random() * 6,
        from: new THREE.Vector3(0, 0, 0),
        to: new THREE.Vector3(0, 0, 0),
        ref: { current: null as THREE.Mesh | null },
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    streaks.forEach((s) => {
      const local = ((t - s.startTime) % s.cycle) / s.cycle; // 0–1
      const mesh = s.ref.current;
      if (!mesh) return;

      // At local=0, pick new endpoints (only once per cycle)
      if (local < 0.02) {
        const angle = Math.random() * Math.PI * 2;
        const r = 12;
        s.from.set(Math.cos(angle) * r, Math.sin(angle) * r * 0.6, -2 + Math.random() * 4);
        s.to.set(
          Math.cos(angle + Math.PI * 0.3) * r,
          Math.sin(angle + Math.PI * 0.3) * r * 0.6,
          -2 + Math.random() * 4,
        );
      }

      // Visible window: 0.10 → 0.28 of the cycle
      const visStart = 0.1;
      const visEnd = 0.28;
      if (local < visStart || local > visEnd) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      const p = (local - visStart) / (visEnd - visStart);
      const eased = 1 - Math.pow(1 - p, 2.5);
      mesh.position.lerpVectors(s.from, s.to, eased);
      // Streak orientation — point from→to
      const dir = s.to.clone().sub(s.from).normalize();
      mesh.lookAt(mesh.position.clone().add(dir));
      const fadeAlpha = Math.sin(p * Math.PI); // peak in middle
      const mat = mesh.material as THREE.Material & { opacity?: number };
      if ('opacity' in mat) mat.opacity = fadeAlpha;
    });
  });

  return (
    <group ref={groupRef}>
      {streaks.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            s.ref.current = el;
          }}
          visible={false}
        >
          <planeGeometry args={[1.2, 0.025]} />
          <meshBasicMaterial
            color="#eafffb"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Lusion-style glass centerpiece — MeshTransmissionMaterial with high
 * iridescence + chromatic aberration.
 *
 * Now scroll-reactive: as the visitor scrolls, the glass migrates,
 * shrinks, rotates faster, and the chromatic aberration deepens —
 * giving the impression of one persistent object that "rides along"
 * with the journey through the page (Active-Theory pattern lite).
 *
 * Scroll progress comes from a ref shared at module scope, updated
 * by the PersistentCanvas mount via window.scrollY.
 */
const scrollSignal = { value: 0 };

if (typeof window !== 'undefined') {
  const update = () => {
    const vh = window.innerHeight || 1;
    // 0 at top, 1 after scrolling ~3 viewports — gentle ramp
    scrollSignal.value = Math.min(1, window.scrollY / (vh * 3));
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function Scene({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const T = state.clock.elapsedTime;
    // Continuous slow scene rotation — gives parallax against camera moves
    groupRef.current.rotation.y = Math.sin(T * 0.04) * 0.18;
    groupRef.current.rotation.x = Math.cos(T * 0.035) * 0.09;
    groupRef.current.rotation.z = Math.sin(T * 0.025) * 0.04;
  });

  return (
    <>
      <CameraDirector pointer={pointer} />


      <group ref={groupRef}>
        {/* Deep background — nebula plane (the colour bed) */}
        <NebulaPulse />

        {/* Far layer — distant galaxy spiral, very slow */}
        <GalaxySpiral />

        {/* Far parallax dust — slowest, behind the stars */}
        <FarDust />

        {/* Stars — main layer, three resolutions for depth */}
        <Stars
          radius={120}
          depth={90}
          count={3200}
          factor={2.4}
          saturation={0.25}
          fade
          speed={0.45}
        />
        <Stars
          radius={60}
          depth={45}
          count={1400}
          factor={3.2}
          saturation={0.4}
          fade
          speed={0.85}
        />

        {/* Mid dust + neural mesh — the existing layers */}
        <DustField />
        <NeuralNetwork />

        {/* Foreground "weather" — shooting stars firing every ~9s */}
        <ShootingStars />
      </group>
    </>
  );
}

export function NeuralSpace({ reduced }: { reduced?: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    pointer.current.x = x;
    pointer.current.y = y;
  };

  if (reduced) {
    return (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 72% 20%, rgba(20,240,208,0.08) 0%, transparent 46%), radial-gradient(ellipse at 42% 42%, #0c1413 0%, #070908 48%, #040405 100%)',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      onPointerMove={onMove}
      style={{ background: '#040405' }}
    >
      <Canvas
        dpr={[1.5, 2]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={['#040405']} />
        <Scene pointer={pointer} />
        {/* Multisampled AA + a softer, wider bloom = cleaner edges and a
            more cinematic glow without the harsh "halo" look. */}
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.42}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.7}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
