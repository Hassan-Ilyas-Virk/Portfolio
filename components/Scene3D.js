"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Monkey from './Monkey';
import { useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// This component contains the animation logic and is rendered inside the Canvas.
function SceneContent({ mouseX, mouseY }) {
  const groupRef = useRef(null);
  const controlsRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [isDragging, setIsDragging] = useState(false);
  const materialRef = useRef(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      const startHandler = () => setIsDragging(true);
      const endHandler = () => setIsDragging(false);
      
      controls.addEventListener('start', startHandler);
      controls.addEventListener('end', endHandler);

      return () => {
        controls.removeEventListener('start', startHandler);
        controls.removeEventListener('end', endHandler);
      };
    }
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !controlsRef.current) return;

    const isAtTop = scrollYProgress.get() < 0.05;
    controlsRef.current.enabled = isAtTop;

    // Update grain animation
    if (materialRef.current?.uniforms?.time) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }

    if (!isDragging) {
      // 1. Calculate the base idle rotation using absolute time.
      const idleRotationY = state.clock.getElapsedTime() * 0.4;
      const idleRotationX = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;

      // 2. Calculate the rotation from scroll progress.
      const scrollRotationY = scrollYProgress.get() * Math.PI * 2;
      const scrollRotationX = scrollYProgress.get() * Math.PI * 1;

      // 3. Calculate the parallax rotation from mouse movement
      const parallaxRotationY = mouseX.get() * 0.05;
      const parallaxRotationX = mouseY.get() * 0.05;

      // 4. Combine all rotations to get the final target.
      const targetRotationY = idleRotationY + scrollRotationY + parallaxRotationY;
      const targetRotationX = idleRotationX + scrollRotationX + parallaxRotationX;

      // 5. Smoothly interpolate towards the combined target rotation.
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Monkey 
        position={[0, -1, 0]}
        scale={1.5}
        rotation={[0, Math.PI / 4, 0]}
        materialRef={materialRef}
      />
      <OrbitControls ref={controlsRef} enableZoom={false} />
    </group>
  );
}

export default function Scene3D({ mouseX, mouseY }) {
  return (
    <div className="background-3d">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={3} />
        <SceneContent mouseX={mouseX} mouseY={mouseY} />
        <Environment preset="sunset" /> 
      </Canvas>
    </div>
  );
} 