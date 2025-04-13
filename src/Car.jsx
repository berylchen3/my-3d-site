// src/Car.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Car() {
  const carRef = useRef();
  const { scene } = useGLTF('/models/car.glb'); // make sure the model exists
  const [position, setPosition] = useState([0, 0.1, 0]);
  const [direction, setDirection] = useState(0); // in radians

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const step = 0.2;
      const angleStep = 0.1;
      setPosition((pos) => {
        if (e.key === 'ArrowUp' || e.key === 'w') {
          return [
            pos[0] + Math.sin(direction) * step,
            pos[1],
            pos[2] + Math.cos(direction) * step,
          ];
        } else if (e.key === 'ArrowDown' || e.key === 's') {
          return [
            pos[0] - Math.sin(direction) * step,
            pos[1],
            pos[2] - Math.cos(direction) * step,
          ];
        }
        return pos;
      });

      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setDirection((dir) => dir + angleStep);
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setDirection((dir) => dir - angleStep);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Update car position and rotation every frame
  useFrame(() => {
    if (carRef.current) {
      carRef.current.position.set(...position);
      carRef.current.rotation.y = direction;
    }
  });

  return <primitive ref={carRef} object={scene} scale={0.4} />;
}
