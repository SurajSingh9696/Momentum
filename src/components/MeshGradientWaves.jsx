import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WaveMesh({ color = '#4ade80' }) {
  const meshRef = useRef();

  const geo     = useMemo(() => new THREE.PlaneGeometry(5.5, 5.5, 52, 52), []);
  const origPos = useMemo(() => new Float32Array(geo.attributes.position.array), [geo]);

  useFrame(({ clock }) => {
    const t       = clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr     = posAttr.array;

    for (let i = 0; i < posAttr.count; i++) {
      const ox = origPos[i * 3];
      const oy = origPos[i * 3 + 1];
      arr[i * 3 + 2] =
        Math.sin(ox * 1.3  + t * 0.85) * 0.26 +
        Math.cos(oy * 1.5  + t * 0.65) * 0.22 +
        Math.sin((ox + oy) * 0.9 + t * 0.42) * 0.14 +
        Math.cos((ox - oy) * 0.7 + t * 0.30) * 0.10;
    }
    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    meshRef.current.rotation.z += 0.0025;
  });

  return (
    <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI / 3.6, 0, 0]}>
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.45}
        roughness={0.4}
        metalness={0.5}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

/* Second tilted plane for depth */
function WaveMeshBack({ color = '#4ade80' }) {
  const meshRef = useRef();
  const geo     = useMemo(() => new THREE.PlaneGeometry(5.5, 5.5, 32, 32), []);
  const origPos = useMemo(() => new Float32Array(geo.attributes.position.array), [geo]);

  useFrame(({ clock }) => {
    const t       = clock.getElapsedTime() + 1.5;        // offset phase
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr     = posAttr.array;

    for (let i = 0; i < posAttr.count; i++) {
      const ox = origPos[i * 3];
      const oy = origPos[i * 3 + 1];
      arr[i * 3 + 2] =
        Math.cos(ox * 1.0 + t * 0.7)  * 0.2 +
        Math.sin(oy * 1.2 + t * 0.55) * 0.18;
    }
    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    meshRef.current.rotation.z -= 0.002;
  });

  return (
    <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI / 3.6, 0.4, 0]} position={[0, -0.2, -0.4]}>
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.18}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export default function MeshGradientWaves({ color = '#4ade80' }) {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 5], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0,  3,  3]} intensity={2.5} color={color} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <WaveMeshBack color={color} />
      <WaveMesh     color={color} />
    </Canvas>
  );
}
