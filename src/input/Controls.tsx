import { OrbitControls } from '@react-three/drei';
import { MOUSE, Vector3 } from 'three';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

type ControlProps = {
  target: [number, number, number];
  stages: [number, number, number][];
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
};

export function Controls(props: ControlProps) {
  const { target, stages, setCurrentStage } = props;
  const controlsRef = useRef<any>();
  const { camera } = useThree();
  const currentStageRef = useRef<number>(-1);
  const frameCountRef = useRef<number>(0);

  const targetVec = useMemo(() => new Vector3(...target), []);

  const stageDirections = useMemo(() => {
    return stages.map(stage => {
      const stagePos = new Vector3(...stage);
      return targetVec.clone().sub(stagePos).normalize();
    });
  }, [stages]);

  const directionThreshold = 0.98;
  const camDir = useRef(new Vector3());

  useFrame(() => {
    frameCountRef.current++;
    if (frameCountRef.current % 10 !== 0) return;

    camDir.current.subVectors(targetVec, camera.position).normalize();

    for (let i = 0; i < stageDirections.length; i++) {
      const dot = camDir.current.dot(stageDirections[i]);
      if (dot > directionThreshold) {
        if (i !== currentStageRef.current) {
          currentStageRef.current = i;
          setCurrentStage(i);
          console.log(`Switched to stage ${i}`);
        }
        return;
      }
    }

    if (currentStageRef.current !== -1) {
      currentStageRef.current = -1;
      setCurrentStage(-1);
      console.log('Switched to stage -1 (no stage)');
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      target={target}
      enableRotate={true}
      enablePan={false}
      enableZoom={false}
      enableDamping={true}
      dampingFactor={0.025}
      rotateSpeed={0.3}
      mouseButtons={{
        LEFT: MOUSE.ROTATE
    }}
    />
  );
};
