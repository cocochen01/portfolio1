import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useState, Suspense } from 'react';
import Loader from '../components/Loader';

import { adjustIslandForScreenSize, Island } from '../models/Island';
import { Sky } from '../models/Sky';
import { Bird } from '../models/Bird';
import { adjustPlaneForScreenSize, Plane } from '../models/Plane';

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [islandScale, islandScreenPosition, islandRotation] = adjustIslandForScreenSize();
    const [planeScale, planePosition, planeRotation] = adjustPlaneForScreenSize();
    return (
        <section className="w-full h-screen relative">
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    {/* <pointLight position={[10, 5, 10]} intensity={2} /> */}
                    <spotLight
                        position={[0, 50, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                    />
                    <hemisphereLight
                        color={0xb1e1ff}
                        groundColor={0x000000}
                        intensity={1}
                    />
                    <Bird />
                    <Sky 
                        isRotating={isRotating}
                    />
                    <Island
                        position={islandScreenPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane 
                        isRotating={isRotating}
                        scale={planeScale}
                        position={planePosition}
                        rotation={planeRotation}
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}
export default Home