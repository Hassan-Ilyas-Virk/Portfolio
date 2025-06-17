import React, { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'

export default function Monkey(props) {
  const { scene } = useGLTF('/monkey.glb')
  const monkeyRef = useRef(null)
  const { viewport } = useThree()

  // Add rotation animation
  useFrame(() => {
    if (monkeyRef.current) {
      monkeyRef.current.rotation.y += 0.005
    }
  })

  // Material controls
  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
    color: '#ffffff',
    envMapIntensity: 1,
  })

  // Create material
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      ...materialProps,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      reflectivity: 1,
      transparent: true,
      opacity: 1,
    })
  }, [materialProps])

  // Apply material to all meshes
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = material
    }
  })

  return (
    <primitive 
      ref={monkeyRef}
      object={scene} 
      scale={viewport.width / 3.5}
      {...props} 
    />
  )
}

useGLTF.preload('/monkey.glb') 