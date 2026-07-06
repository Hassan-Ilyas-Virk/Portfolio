import React, { useRef, useMemo } from 'react'
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'

export default function Model({ matProps = {}, modelProps = {} }) {
    const { nodes } = useGLTF("/medias/sword.glb");
    const { viewport } = useThree()

    const swordNode = useMemo(() => {
        const nodeNames = Object.keys(nodes);
        return nodeNames.find(name =>
            name.includes('polySurface') ||
            name.includes('lambert') ||
            name.toLowerCase().includes('sword') ||
            name.toLowerCase().includes('mesh') ||
            (name !== 'Scene' && name !== 'RootNode')
        ) || nodeNames.find(name => name !== 'Scene') || nodeNames[0];
    }, [nodes]);

    const sword = useRef(null);
    const burstSpeed = useRef(0);

    useFrame(() => {
        if (!sword.current) return;
        burstSpeed.current *= 0.96;
        sword.current.rotation.y -= 0.003 + burstSpeed.current;
    });

    const materialDefaults = {
        thickness: 1.2,
        roughness: 0.05,
        transmission: 1.0,
        ior: 1.5,
        chromaticAberration: 2.0,
        backside: true,
        samples: 6,
        resolution: 512,
        transmissionSampler: false,
        envMapIntensity: 5,
        color: '#dce4ff',
    }

    return (
        <group scale={viewport.width / 3 * (modelProps.scale ?? 1.8)} position={[modelProps.posX ?? 0, modelProps.posY ?? 0, 0]}>
            <mesh
                ref={sword}
                {...nodes[swordNode]}
                onClick={() => { burstSpeed.current = 0.15; }}
            >
                <MeshTransmissionMaterial
                    key={`${matProps.chromaticAberration}-${matProps.envMapIntensity}-${matProps.samples}`}
                    {...materialDefaults}
                    {...matProps}
                />
            </mesh>
        </group>
    )
}
