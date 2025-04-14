import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import skyScene from "../assets/3d/sky.glb";

export function Sky(): JSX.Element {
  const sky = useGLTF(skyScene);
  const skyRef = useRef<THREE.Object3D>(null);

  return (
    <mesh>
      <primitive object={sky.scene} ref={skyRef} />
    </mesh>
  );
}