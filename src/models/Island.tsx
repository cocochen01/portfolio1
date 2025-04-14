import { a } from "@react-spring/three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import islandScene from "../assets/3d/island.glb";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

type IslandProps = {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
};

export function adjustIslandForScreenSize(): [number, number, number][] {
  let screenScale: [number, number, number] = [0, 0, 0];
  let screenPosition: [number, number, number] = [0, -6.5, -43.4];
  let rotation: [number, number, number] = [0, 4.7, 0];
  if (window.innerWidth < 768) {
    screenScale = [0.9, 0.9, 0.9];
  } else {
    screenScale = [1, 1, 1];
  }

  return [screenScale, screenPosition, rotation];
};

export function Island(props: IslandProps): JSX.Element {
  const { setCurrentStage, ...groupProps } = props;
  const { nodes, materials } = useGLTF(islandScene) as GLTFResult;
  const islandRef = useRef<Group>(null);

  return (
    <a.group ref={islandRef} {...groupProps}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
}
