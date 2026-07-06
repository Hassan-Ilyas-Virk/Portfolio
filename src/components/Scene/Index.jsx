'use client';
import { Canvas } from '@react-three/fiber'
import Model from './Model';
import { Environment } from '@react-three/drei'

export default function Index({ matProps, modelProps }) {
  return (
    <Canvas
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      camera={{ fov: 2, position: [0, 0, 5] }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <Model matProps={matProps} modelProps={modelProps} />
      <directionalLight intensity={4} position={[0, 2, 3]}/>
      <directionalLight intensity={2} position={[-2, -1, -2]} color="#8090ff"/>
      <directionalLight intensity={1.5} position={[2, -1, 1]} color="#ff90c0"/>
      <Environment preset="studio" environmentIntensity={2.5} />
    </Canvas>
  )
}
