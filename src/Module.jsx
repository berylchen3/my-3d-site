// src/Module.jsx
import React from 'react';
import { Html } from '@react-three/drei';

export default function Module({ position, label, onClick }) {
  return (
    <mesh position={position} onClick={onClick} castShadow>
      <boxGeometry args={[1.5, 1, 1.5]} />
      <meshStandardMaterial color="#ff69b4" />
      <Html position={[0, 0.8, 0]}>
        <div style={{ background: 'white', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
          {label}
        </div>
      </Html>
    </mesh>
  );
}
