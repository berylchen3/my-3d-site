// src/Experience.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Car from './Car';
import Module from './Module';

export default function Experience() {
  const modules = [
    { label: 'About', position: [5, 0.5, 0], route: '/about' },
    { label: 'Projects', position: [-5, 0.5, 0], route: '/projects' },
    { label: 'CV', position: [0, 0.5, 5], route: '/cv' },
    { label: 'Contact', position: [0, 0.5, -5], route: '/contact' },
  ];

  return (
    <Canvas shadows camera={{ position: [0, 10, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <OrbitControls />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Car */}
      <Car />

      {/* Information Modules */}
      {modules.map((mod, i) => (
        <Module
          key={i}
          position={mod.position}
          label={mod.label}
          onClick={() => window.location.href = mod.route}
        />
      ))}

      <Environment preset="sunset" />
    </Canvas>
  );
}
