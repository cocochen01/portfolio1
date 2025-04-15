import { OrbitControls } from '@react-three/drei';
import { MOUSE } from 'three';
import { useEffect, useRef } from 'react';

export function Controls ({ target }: { target: [number, number, number] }) {
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
    //   minPolarAngle={Math.PI / 3}
    //   maxPolarAngle={Math.PI / 2}
      enableDamping={true}
      dampingFactor={0.025}
      rotateSpeed={0.3}
      mouseButtons={{
        LEFT: MOUSE.ROTATE
    }}
    />
  );
};
