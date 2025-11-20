import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DViewerProps {
    material: 'gold' | 'silver';
    autoRotate?: boolean;
}

function JewelryModel({ material }: { material: 'gold' | 'silver' }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    const materialProps =
        material === 'gold'
            ? {
                color: '#D4AF37',
                metalness: 1,
                roughness: 0.2,
                emissive: '#B8941F',
                emissiveIntensity: 0.2,
            }
            : {
                color: '#C0C0C0',
                metalness: 1,
                roughness: 0.15,
                emissive: '#A8A8A8',
                emissiveIntensity: 0.1,
            };

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? 1.1 : 1}
        >
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <meshStandardMaterial {...materialProps} />
        </mesh>
    );
}

export default function Product3DViewer({
    material,
    autoRotate = true,
}: Product3DViewerProps) {
    return (
        <div style={{ width: '100%', height: 'clamp(300px, 50vh, 500px)', borderRadius: '1rem', overflow: 'hidden' }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {/* Environment */}
                <Environment preset="studio" />

                {/* Model */}
                <JewelryModel material={material} />

                {/* Shadows */}
                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.5}
                    scale={10}
                    blur={2}
                    far={4}
                />

                {/* Controls */}
                <OrbitControls
                    autoRotate={autoRotate}
                    autoRotateSpeed={2}
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={8}
                />
            </Canvas>
        </div>
    );
}
