'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * A full-bleed WebGL plane that ripples with a fluid GLSL noise field.
 * Brand colors mix and bloom — pure eye-candy backdrop for the Showcase
 * section. No mouse interaction; designed to be calm, not flashy.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  // Simplex-ish 2D noise (cheap)
  vec2 hash(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
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
    vec3 n = h*h*h*h * vec3(
      dot(a, hash(i)),
      dot(b, hash(i + o)),
      dot(c, hash(i + 1.0))
    );
    return dot(n, vec3(70.0));
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= 1.6; // aspect bias

    float t = uTime * 0.08;
    vec2 q = vec2(fbm(uv + t), fbm(uv - t + 5.2));
    vec2 r = vec2(fbm(uv + q + vec2(1.7, 9.2) + 0.15 * t),
                  fbm(uv + q + vec2(8.3, 2.8) + 0.126 * t));
    float n = fbm(uv + r);

    vec3 col = mix(uColorA, uColorB, smoothstep(-0.2, 0.6, n));
    col = mix(col, uColorC, smoothstep(0.55, 0.95, length(q)));

    // Soft vignette + edge fade to blend into the paper background
    float v = smoothstep(1.2, 0.25, length(vUv - 0.5));
    col = mix(uColorA, col, 0.35 + 0.55 * v);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#ffffff') }, // paper
      uColorB: { value: new THREE.Color('#ece6fa') }, // soft indigo wash
      uColorC: { value: new THREE.Color('#3a1ba0') }, // signature deep indigo
    }),
    [],
  );

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        depthWrite={false}
      />
    </mesh>
  );
}

export function DistortionPlane() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ zIndex: 0 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      >
        <Plane />
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.15} luminanceThreshold={0.85} luminanceSmoothing={0.6} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
