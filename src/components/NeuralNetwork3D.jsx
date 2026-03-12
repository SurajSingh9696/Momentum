import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 30;
const CONNECT_DIST = 1.35;

function buildNetwork() {
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    pos: [
      (Math.random() - 0.5) * 3.6,
      (Math.random() - 0.5) * 3.6,
      (Math.random() - 0.5) * 2.2,
    ],
    size:  0.042 + Math.random() * 0.036,
    phase: Math.random() * Math.PI * 2,
    speed: 0.6 + Math.random() * 1.8,
  }));

  const segs = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].pos[0] - nodes[j].pos[0];
      const dy = nodes[i].pos[1] - nodes[j].pos[1];
      const dz = nodes[i].pos[2] - nodes[j].pos[2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT_DIST) {
        segs.push(...nodes[i].pos, ...nodes[j].pos);
      }
    }
  }
  return { nodes, lineArr: new Float32Array(segs), lineCount: segs.length / 3 };
}

function NetworkGraph({ color = '#4ade80' }) {
  const groupRef  = useRef();
  const nodesRef  = useRef([]);

  const { nodes, lineArr, lineCount } = useMemo(buildNetwork, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.09;
      groupRef.current.rotation.x = Math.sin(t * 0.055) * 0.32;
    }
    nodesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = 0.35 + Math.sin(t * nodes[i].speed + nodes[i].phase) * 0.65;
      mesh.material.emissiveIntensity = Math.max(0.05, pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCount}
            array={lineArr}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.22} />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh
          key={i}
          position={node.pos}
          ref={(el) => { nodesRef.current[i] = el; }}
        >
          <sphereGeometry args={[node.size, 10, 10]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.05}
            metalness={0.4}
          />
        </mesh>
      ))}

      {/* Long-range faint connections — a thinner pass */}
      {nodes.slice(0, 8).map((na, i) =>
        nodes.slice(i + 1, 16).map((nb, j) => {
          const dx = na.pos[0] - nb.pos[0];
          const dy = na.pos[1] - nb.pos[1];
          const dz = na.pos[2] - nb.pos[2];
          const d  = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d >= CONNECT_DIST && d < 2.4) {
            const arr = new Float32Array([...na.pos, ...nb.pos]);
            return (
              <lineSegments key={`lr-${i}-${j}`}>
                <bufferGeometry>
                  <bufferAttribute attach="attributes-position" count={2} array={arr} itemSize={3} />
                </bufferGeometry>
                <lineBasicMaterial color={color} transparent opacity={0.07} />
              </lineSegments>
            );
          }
          return null;
        })
      )}
    </group>
  );
}

export default function NeuralNetwork3D({ color = '#4ade80' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[0,  2,  3]} intensity={2.5} color={color} />
      <pointLight position={[0, -2, -3]} intensity={0.8} color="#ffffff" />
      <NetworkGraph color={color} />
    </Canvas>
  );
}
