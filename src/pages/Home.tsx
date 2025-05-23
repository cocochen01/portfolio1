import { Canvas } from '@react-three/fiber';
import { useState, Suspense } from 'react';
import Loader from '../components/Loader';
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

import { Controls } from '../input/Controls';
import { BigPlanet } from '../models/BigPlanet';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';
import { Kepler186f } from '../models/Kepler186f';
import { Axes } from '../models/Axes';
import { Kepler7b } from '../models/Kepler7b';

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    return (
        <section className="w-full h-screen relative">
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 100, position: [0, 0, 10] }}
                style={{ background: '#04243c'}}
            >
                <EffectComposer>
                    <DepthOfField focusDistance={.015} focalLength={.007} bokehScale={1.5} height={500} />
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={200} mipmapBlur={false} intensity={2}/>
                    <Noise opacity={0.05} />
                    <Vignette eskil={true} offset={.5} darkness={1.1} />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={new Vector2(0.001, 0.001)}
                        radialModulation={true}
                        modulationOffset={0.0}
                    />
                </EffectComposer>
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={1.5} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight
                        color={0xb1e1ff}
                        groundColor={0x000000}
                        intensity={1}
                    />
                    <BigPlanet 
                        position={[0, 0, 0]}
                        scale={[5, 5, 5]}
                        rotation={[0, -1, 0]}
                        setCurrentStage={setCurrentStage}
                    />
                    <Kepler186f
                        position={[-2 , 1, 8]}
                        scale={[.2, .2, .2]}
                        rotation={[0, 0, 0]}
                    />
                    <Kepler7b
                        position={[7.5 , 1, 2]}
                        scale={[.4, .4, .4]}
                        rotation={[0, 0, 0]}
                    />
                    <Controls target={[0, 0, 0]} />
                    <Axes />
                </Suspense>
            </Canvas>
        </section>
    )
}
export default Home