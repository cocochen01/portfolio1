import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useState, Suspense } from 'react';
import Loader from '../components/Loader';

import Island from '../models/Island';
import Sky from '../models/Sky';
import { Bird } from '../models/Bird';
import Plane from '../models/Plane';

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const adjustIslandForScreenSize = () => {
        let screenScale: [number, number, number] = [0, 0, 0];
        let screenPosition: [number, number, number] = [0, -6.5, -43.4];
        let rotation: [number, number, number] = [0.1, 4.7, 0];
    
        if (window.innerWidth < 768) {
          screenScale = [0.9, 0.9, 0.9];
        } else {
          screenScale = [1, 1, 1];
        }
    
        return [screenScale, screenPosition, rotation];
      };
    const [islandScreenScale, islandScreenPosition, islandRotation] = adjustIslandForScreenSize();
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
                    <Sky />
                    <Island
                        position={islandScreenPosition}
                        scale={islandScreenScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                    />
                    <Plane />
                </Suspense>
            </Canvas>
        </section>
    )
}
export default Home