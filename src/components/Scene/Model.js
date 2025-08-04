import React, { useRef, useState, useEffect } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'

export default function Model() {
    const { nodes } = useGLTF("/medias/sword.glb");
    const { viewport } = useThree()
    
    // Find the correct mesh node (avoid containers like Scene)
    const nodeNames = Object.keys(nodes);
    const swordNode = nodeNames.find(name => 
        name.includes('polySurface') || 
        name.includes('lambert') ||
        name.toLowerCase().includes('sword') || 
        name.toLowerCase().includes('mesh') ||
        (name !== 'Scene' && name !== 'RootNode')
    ) || nodeNames.find(name => name !== 'Scene') || nodeNames[0];
    
    const sword = useRef(null);
    const textRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            setMousePosition({ x, y });
        };
        
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Initial check
        handleResize();
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useFrame(() => {
        sword.current.rotation.y -= 0.002;    
        // Move main text (disable on mobile to prevent lighting bugs)
        if (textRef.current && !isMobile) {
            textRef.current.position.x = mousePosition.x * 0.2;
            textRef.current.position.y = mousePosition.y * 0.2;
        }
    });

    const materialProps = {
        thickness: 0.60,
        roughness: 0.1,
        transmission: 1.0,
        ior: 3.0,
        chromaticAberration: 1.00,
        backside: true,
    }

    return (
        <group scale={isMobile ? viewport.width / 0.75 : viewport.width / 3}>
                        {!isMobile ? (
                <>
                    <Text
                        ref={textRef}
                        font={'/fonts/Compacta Italic.otf'}
                        position={[mousePosition.x * 0.2, mousePosition.y * 0.2, -1]}
                        fontSize={0.7}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        rotation={[0, 0, Math.PI / 12]}
                    >
                        HASSAN ILYAS
                    </Text>
                </>
            ) : (
                <>
                    <Text
                        ref={textRef}
                        font={'/fonts/Compacta Italic.otf'}
                        position={[0, 0.1, -1]}
                        fontSize={0.3}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        rotation={[0, 0, Math.PI / 12]}
                    >
                        HASSAN
                    </Text>
                    <Text
                        font={'/fonts/Compacta Italic.otf'}
                        position={[0, -0.2, -1]}
                        fontSize={0.3}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        rotation={[0, 0, Math.PI / 12]}
                    >
                        ILYAS
                    </Text>
                </>
            )}
            <mesh ref={sword} {...nodes[swordNode]}>
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    )
}