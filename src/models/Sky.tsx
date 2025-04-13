import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import skyScene from "../assets/3d/sky.glb";

type SkyProps = {
    isRotating: boolean;
  };

export function Sky(props: SkyProps): JSX.Element {
    const { isRotating } = props;
    const sky = useGLTF(skyScene);
    const skyRef = useRef<THREE.Object3D>(null);

    useFrame((_, delta) => {
        if (isRotating && skyRef.current) {
            skyRef.current.rotation.y += .15 * delta;
        }
    })
    return (
        <mesh>
            <primitive object={sky.scene} ref={skyRef}/>
        </mesh>
    );
}
