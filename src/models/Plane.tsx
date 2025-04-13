import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

import planeScene from "../assets/3d/plane.glb";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

type PlaneProps = {
    position: [number, number, number];
    scale: [number, number, number];
    rotation: [number, number, number];
    isRotating: boolean;
}

export function adjustPlaneForScreenSize(): [number, number, number][] {
    let screenScale: [number, number, number] = [0, 0, 0];
    let screenPosition: [number, number, number] = [0, 0, 0];
    let rotation: [number, number, number] = [0, 20.1, 0];
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
    const { isRotating, ...groupProps } = props;
    const ref = useRef();
    const { scene, animations } = useGLTF(planeScene);
    const { actions } = useAnimations(animations, ref);


    useEffect(() => {
        console.log(Object.keys(actions));
        if (isRotating) {
            actions["Take 001"]?.play();
        } else {
            actions["Take 001"]?.stop();
        }
    }, [actions, isRotating]);

    return (
        <mesh {...groupProps}>
          // use the primitive element when you want to directly embed a complex 3D
          model or scene
          <primitive object={scene} ref={ref} />
        </mesh>
      );
}
