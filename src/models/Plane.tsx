import { useGLTF } from "@react-three/drei";
import React from "react";

import planeScene from "../assets/3d/plane.glb";

const Plane: React.FC = () => {
    const { scene, animations } = useGLTF(planeScene);
    return (
        <mesh>
            <primitive object={scene} />
        </mesh>
    );
}

export default Plane;
