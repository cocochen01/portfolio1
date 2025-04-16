import { OrbitControls } from '@react-three/drei';
import { MOUSE } from 'three';
import { useEffect, useRef } from 'react';

type controlProps = {
    target: [number, number, number];
    setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
};

export function Controls (props: controlProps) {
  const { target, setCurrentStage } = props;
  const controlsRef = useRef<any>();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!controlsRef.current) return;

      const ROTATE_STEP = 0.05;

      switch (event.code) {
        case 'ArrowLeft':
          controlsRef.current.setAzimuthalAngle(
            controlsRef.current.getAzimuthalAngle() - ROTATE_STEP
          );
          break;
        case 'ArrowRight':
          controlsRef.current.setAzimuthalAngle(
            controlsRef.current.getAzimuthalAngle() + ROTATE_STEP
          );
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
