'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Points, PointMaterial, Stars, Environment } from '@react-three/drei';
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
        color="#cdb8ff"
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
    const N = 28;
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
          color="#a855f7"
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
            uColor: { value: new THREE.Color('#b4a0ff') },
            uAccent: { value: new THREE.Color('#3a1ba0') },
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
      <planeGeometry args={[28, 18]} />
      <shaderMaterial
        depthWrite={false}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color('#1a0d3d') },
          uColorB: { value: new THREE.Color('#3a1ba0') },
          uColorC: { value: new THREE.Color('#7d5cf0') },
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
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform vec3 uColorC;

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
            for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
            return v;
          }

          void main(){
            vec2 uv = vUv * 1.6 - 0.3;
            float t = uTime * 0.05;
            float n = fbm(uv * 1.2 + vec2(t, -t * 0.6));
            float n2 = fbm(uv * 2.0 - vec2(t * 0.8, t * 0.4) + 4.0);
            vec3 col = mix(uColorA, uColorB, smoothstep(-0.2, 0.6, n));
            col = mix(col, uColorC, smoothstep(0.5, 0.95, n2));
            float v = smoothstep(1.3, 0.2, length(vUv - 0.5));
            col *= 0.25 + 0.95 * v;
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
    const cycle = 38;
    const t = T % cycle;

    // ── Camera path (parametric, easing-blended) ───────────
    // Phase 1 (0–10s): slow zoom in
    const p1 = ss(0, 10, t);
    // Phase 2 (10–18s): dolly right
    const p2 = ss(10, 18, t);
    // Phase 3 (18–26s): zoom out + lift
    const p3 = ss(18, 26, t);
    // Phase 4 (26–34s): arc back left
    const p4 = ss(26, 34, t);
    // Phase 5 (34–38s): settle
    const p5 = ss(34, 38, t);

    // Compose camera position
    let cx = 0, cy = 0, cz = 7.5;

    // Phase 1 — zoom in (z 7.5 → 4.8), tilt up
    cz += -2.7 * p1;
    cy += 0.6 * p1;

    // Phase 2 — dolly right (x 0 → 2.2)
    cx += 2.2 * p2;
    cy += -0.4 * p2;

    // Phase 3 — zoom out (z 4.8 → 8.5), lift up
    cz += 3.7 * p3;
    cy += 1.2 * p3;

    // Phase 4 — arc back (x 2.2 → -1.8)
    cx += -4 * p4;
    cy += -1.5 * p4;

    // Phase 5 — settle back to (0, 0, 7.5)
    cx += 1.8 * p5;
    cy += 0.1 * p5;
    cz += -1 * p5;

    // Add gentle mouse parallax on top
    cx += pointer.current.x * 0.5;
    cy += -pointer.current.y * 0.25;

    // Slow autonomous breathing
    cz += Math.sin(T * 0.13) * 0.15;
    cy += Math.cos(T * 0.09) * 0.12;

    // Smooth lerp camera toward target position
    const lerp = Math.min(1, dt * 1.2);
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
        color="#9d8de8"
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
          color="#c4b5fd"
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
          color="#ffe9c2"
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
            color="#e2d6ff"
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

function GlassCenterpiece() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const s = scrollSignal.value;
    // Smoothstep for a hand-keyframed feel
    const e = s * s * (3 - 2 * s);
    const t = state.clock.elapsedTime;

    // Position: drift from right side, deeper into space as you scroll
    meshRef.current.position.x = 3.4 - e * 2.2; // → 1.2
    meshRef.current.position.y = 0.3 + e * 0.8; // → 1.1
    meshRef.current.position.z = -e * 5.0; // → -5.0

    // Scale: shrink as it recedes
    const sc = 1.05 - e * 0.5; // 1.05 → 0.55
    meshRef.current.scale.setScalar(sc);

    // Rotation: slow + steady (no spin acceleration — premium = calm)
    meshRef.current.rotation.y = t * 0.12 + e * 0.4;
    meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;

    // Inner core: counter-rotates subtly
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.18;
      coreRef.current.rotation.x = t * 0.06;
    }

    // Material params on scroll — kept SUBTLE (no distortion ramp,
    // no chromatic-aberration ramp — those made the shape read as
    // 'broken glass'. Just thickness/iridescence shift.)
    const mat = meshRef.current.material as unknown as {
      thickness?: number;
      iridescence?: number;
    };
    if (mat) {
      mat.thickness = 1.4 - e * 0.5;
    }
  });

  return (
    <Float
      speed={0.9}
      rotationIntensity={0.18}
      floatIntensity={0.45}
      floatingRange={[-0.12, 0.12]}
    >
      <group ref={meshRef} position={[3.4, 0.3, 0]} scale={1.05}>
        {/* Outer glass sphere — clean, photorealistic, no distortion */}
        <mesh>
          <icosahedronGeometry args={[0.95, 6]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.35}
            samples={8}
            resolution={512}
            transmission={1}
            roughness={0.04}
            thickness={1.4}
            ior={1.5}
            chromaticAberration={0.04}
            anisotropy={0.15}
            distortion={0}
            distortionScale={0}
            temporalDistortion={0}
            attenuationDistance={2.5}
            attenuationColor="#d4c5ff"
            color="#ffffff"
          />
        </mesh>

        {/* Inner core — small emissive sphere = "AI intelligence" signal */}
        <mesh ref={coreRef} scale={0.32}>
          <icosahedronGeometry args={[1, 3]} />
          <meshStandardMaterial
            color="#b4a0ff"
            emissive="#a855f7"
            emissiveIntensity={1.8}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
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
      {/* HDRI environment — gives the glass realistic reflections */}
      <Environment preset="studio" environmentIntensity={0.7} />
      {/* Two-point key/fill lighting for the glass */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#e2d6ff" />
      <directionalLight position={[-3, -2, 2]} intensity={0.5} color="#7d5cf0" />

      <GlassCenterpiece />

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
            'radial-gradient(ellipse at 50% 40%, #2a1466 0%, #0a0820 45%, #03020c 100%)',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      onPointerMove={onMove}
      style={{ background: '#03020c' }}
    >
      <Canvas
        dpr={[1.25, 2]}
        camera={{ position: [0, 0, 6], fov: 65 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#03020c']} />
        <Scene pointer={pointer} />
        <EffectComposer enableNormalPass={false} multisampling={2}>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.7}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
