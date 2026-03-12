import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

function BlobShape({ color = '#4ade80' }) {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y  = t * 0.28;
    mesh.current.rotation.z  = Math.sin(t * 0.35) * 0.18;
    mesh.current.rotation.x  = Math.cos(t * 0.22) * 0.12;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.15, 128, 128]} />
      <MeshDistortMaterial
        color={color}
        distort={0.46}
        speed={2.4}
        roughness={0.08}
        metalness={0.85}
        emissive={color}
        emissiveIntensity={0.25}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

/* Outer halo ring */
function HaloRing({ color = '#4ade80' }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.18;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.12;
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1.6, 0.015, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

export default function Blob3D({ color = '#4ade80' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[6,  6,  6]} intensity={1.6} />
      <directionalLight position={[-4, -4, -4]} intensity={0.5} color={color} />
      <pointLight position={[0, 0, 3]} intensity={1.2} color={color} />
      <BlobShape color={color} />
      <HaloRing  color={color} />
    </Canvas>
  );
}
