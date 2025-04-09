import { useGLTF } from "@react-three/drei";
import React from "react";

import skyScene from "../assets/3d/sky.glb";

export function Sky(): JSX.Element {
    const sky = useGLTF(skyScene);
    return (
        <mesh>
            <primitive object={sky.scene} />
        </mesh>
    );
}
