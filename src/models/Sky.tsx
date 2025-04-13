import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import skyScene from "../assets/3d/sky.glb";
import { useInput } from "../hooks/useInput";

export function Sky(): JSX.Element {
  const sky = useGLTF(skyScene);
  const skyRef = useRef<THREE.Object3D>(null);
  const { getSpeed, isRotating } = useInput();
  const dampingFactor = 0.9;
  const speedRef = useRef(0);

  useFrame(() => {
    if (!skyRef.current) return;

    let speed = getSpeed();

    if (!isRotating) {
      speedRef.current *= dampingFactor;
      if (Math.abs(speedRef.current) < 0.001) speedRef.current = 0;
    } else {
      speedRef.current = speed;
    }

    skyRef.current.rotation.y += (speedRef.current/6);
  });

  return (
    <mesh>
      <primitive object={sky.scene} ref={skyRef} />
    </mesh>
  );
}