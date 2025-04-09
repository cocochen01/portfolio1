import { useGLTF } from "@react-three/drei";
import React from "react";

import planeScene from "../assets/3d/plane.glb";

type PlaneProps = {
    position: [number, number, number];
    scale: [number, number, number];
    rotation: [number, number, number];
    isRotating: boolean;
    // setIsRotating: React.Dispatch<React.SetStateAction<boolean>>;
}

export function adjustPlaneForScreenSize(): [number, number, number][] {
    let screenScale: [number, number, number] = [0, 0, 0];
    let screenPosition: [number, number, number] = [0, 0, 0];
    let rotation: [number, number, number] = [0, 20, 0];
    if (window.innerWidth < 768) {
        screenScale = [1.5, 1.5, 1.5];
        screenPosition = [0, -1.5, 0];
    } else {
        screenScale = [3, 3, 3];
        screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition, rotation];
}

export function Plane(props: PlaneProps): JSX.Element {
    const { scene, animations } = useGLTF(planeScene);
    return (
        <mesh {...props}>
            <primitive object={scene} />
        </mesh>
    );
}
