import React, { useRef, useState, useEffect } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
    const { nodes } = useGLTF("/medias/torrus.glb");
    const { viewport } = useThree()
    const torus = useRef(null);
    const textRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            setMousePosition({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(() => {
        torus.current.rotation.x -= 0.005;
        // Move main text
        if (textRef.current) {
            textRef.current.position.x = mousePosition.x * 0.2;
            textRef.current.position.y = mousePosition.y * 0.2;
        }
    });

    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1},
        backside: { value: true},
    })

    return (
        <group scale={viewport.width / 3.75}>
            <Text
                ref={textRef}
                font={'/fonts/Compacta Italic.otf'}
                position={[mousePosition.x * 0.2, mousePosition.y * 0.2, -1]}
                fontSize={1.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, Math.PI / 12]}
            >
                HASSAN ILYAS
            </Text>
            <mesh ref={torus} {...nodes.Torus002}>
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    )
}
