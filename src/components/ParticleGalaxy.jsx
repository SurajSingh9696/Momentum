import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BRANCH_COUNT = 3;
const SPIN_FACTOR = 1.6;
const RANDOMNESS = 0.38;
const RANDOMNESS_POWER = 3;

function GalaxyPoints({ color = '#4ade80', count = 7000 }) {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    const innerColor = new THREE.Color(color);
    const outerColor = new THREE.Color('#0a1f12');

    for (let i = 0; i < count; i++) {
      const i3     = i * 3;
      const radius = Math.random() * 2.8;
      const branch = ((i % BRANCH_COUNT) / BRANCH_COUNT) * Math.PI * 2;
      const spin   = radius * SPIN_FACTOR;

      const rand = (r) =>
        Math.pow(Math.random(), RANDOMNESS_POWER) *
        (Math.random() < 0.5 ? 1 : -1) *
        RANDOMNESS * r;

      positions[i3]     = Math.cos(branch + spin) * radius + rand(radius);
      positions[i3 + 1] = rand(radius) * 0.35;
      positions[i3 + 2] = Math.sin(branch + spin) * radius + rand(radius);

      const mixed = innerColor.clone().lerp(outerColor, radius / 2.8);
      colors[i3]     = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }
    return { positions, colors };
  }, [count, color]);

  /* Bright core cluster */
  const { corePos, coreColors } = useMemo(() => {
    const n = 400;
    const corePos    = new Float32Array(n * 3);
    const coreColors = new Float32Array(n * 3);
    const bright     = new THREE.Color('#ffffff');
    const mid        = new THREE.Color(color);
    for (let i = 0; i < n; i++) {
      const r = Math.random() * 0.25;
      const a = Math.random() * Math.PI * 2;
      const b = Math.random() * Math.PI * 2;
      corePos[i * 3]     = Math.cos(a) * Math.cos(b) * r;
      corePos[i * 3 + 1] = Math.sin(b) * r;
      corePos[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
      const m = bright.clone().lerp(mid, r / 0.25);
      coreColors[i * 3]     = m.r;
      coreColors[i * 3 + 1] = m.g;
      coreColors[i * 3 + 2] = m.b;
    }
    return { corePos, coreColors };
  }, [color]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.045;
  });

  return (
    <group ref={ref}>
      {/* Galaxy spiral arms */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count}   array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={count}   array={colors}    itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.016}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </points>

      {/* Bright core */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={400} array={corePos}    itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={400} array={coreColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function ParticleGalaxy({ color = '#4ade80' }) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 4.2], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <GalaxyPoints color={color} />
    </Canvas>
  );
}
