import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function Axes() {
    const { scene } = useThree();
  
    useEffect(() => {
      const axesHelper = new THREE.AxesHelper(5);
      axesHelper.position.set(4, 4, 0);
      axesHelper.scale.set(.5, .5, .5);
      scene.add(axesHelper);
      return () => {
        scene.remove(axesHelper);
      };
    }, [scene]);
  
    return null;
  };