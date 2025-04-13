import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import planeScene from "../assets/3d/plane.glb";
import { useInput } from "../hooks/useInput";

type PlaneProps = {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
//   isRotating: boolean;
};

export function adjustPlaneForScreenSize(): [number, number, number][] {
  let screenScale: [number, number, number];
  let screenPosition: [number, number, number];
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
  const { ...groupProps } = props;
  const planeRef = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, planeRef);
  const { isRotating } = useInput();

  useEffect(() => {
    const action = actions["Take 001"];
    if (!action) return;

    if (isRotating) {
      action.paused = false;
      action.play();
    } else {
      action.paused = true;
    }
  }, [isRotating, actions]);

  return (
    <mesh {...groupProps}>
      <primitive object={scene} ref={planeRef} />
    </mesh>
  );
}
