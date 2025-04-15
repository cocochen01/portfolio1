import { Canvas } from '@react-three/fiber';
import { useState, Suspense } from 'react';
import Loader from '../components/Loader';

import { adjustIslandForScreenSize, Island } from '../models/Island';
import { Sky } from '../models/Sky';
import { Bird } from '../models/Bird';
import { adjustPlaneForScreenSize, Plane } from '../models/Plane';
import { Controls } from '../input/Controls';
import { adjustDesertForScreenSize, Desert } from '../models/Desert';
import { BigPlanet } from '../models/BigPlanet';

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [desertScale, desertScreenPosition, desertRotation] = adjustDesertForScreenSize();
    const [planeScale, planePosition, planeRotation] = adjustPlaneForScreenSize();
    return (
        <section className="w-full h-screen relative">
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 5000, position: [0, 0, 2] }}
                style={{ background: '#04243c'}}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    {/* <pointLight position={[10, 5, 10]} intensity={2} /> */}
                    {/* <spotLight
                        position={[0, 50, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                    /> */}
                    <hemisphereLight
                        color={0xb1e1ff}
                        groundColor={0x000000}
                        intensity={1}
                    />
                    {/* <Bird /> */}
                    {/* <Sky /> */}
                    {/* <Island
                        position={islandScreenPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        setCurrentStage={setCurrentStage}
                    /> */}
                    {/* <Desert 
                        position={desertScreenPosition}
                        scale={desertScale}
                        rotation={desertRotation}
                        setCurrentStage={setCurrentStage}
                    /> */}
                    {/* <Plane 
                        scale={planeScale}
                        position={planePosition}
                        rotation={planeRotation}
                    /> */}
                    <BigPlanet 
                        position={[0, 0, 0]}
                        scale={[1, 1, 1]}
                        rotation={[0, 0, 0]}
                        setCurrentStage={setCurrentStage}
                    />
                    <Controls target={[0, 0, 0]} />
                </Suspense>
            </Canvas>
        </section>
    )
}
export default Home