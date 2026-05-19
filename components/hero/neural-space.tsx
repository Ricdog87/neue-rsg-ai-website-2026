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
    const pts = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
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
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);

  // Build a constellation of AI "agent" nodes
  const { nodes, nodePositions, sizes, baseSizes } = useMemo(() => {
    const N = 48;
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

    // Slow group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.04) * 0.08;
    }

    // Pulse node sizes (animated point sizes via attribute)
    if (nodesRef.current) {
      const sizeAttr = nodesRef.current.geometry.getAttribute('size') as THREE.BufferAttribute | undefined;
      if (sizeAttr) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const pulse = 0.55 + 0.45 * Math.sin(t * n.speed + n.phase);
          sizeAttr.array[i] = baseSizes[i] * (0.6 + pulse * 0.9);
        }
        sizeAttr.needsUpdate = true;
      }
    }

    // Pulse line opacity attribute
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.18 + 0.06 * Math.sin(t * 0.4);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          attach="material"
          color="#7d5cf0"
          transparent
          opacity={0.22}
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

function Scene({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    // Subtle parallax tracking mouse
    const tx = pointer.current.x * 0.15;
    const ty = pointer.current.y * 0.08;
    groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * dt * 1.2;
    groupRef.current.rotation.x += (-ty - groupRef.current.rotation.x) * dt * 1.2;
  });

  return (
    <group ref={groupRef}>
      <NebulaPulse />
      <Stars
        radius={50}
        depth={40}
        count={3500}
        factor={3}
        saturation={0.4}
        fade
        speed={0.5}
      />
      <DustField />
      <NeuralNetwork />
    </group>
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
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 65 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#03020c']} />
        <Scene pointer={pointer} />
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.55}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
