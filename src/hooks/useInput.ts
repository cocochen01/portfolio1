// hooks/useRotatingInput.ts
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";

export function useInput() {
  const { gl, viewport } = useThree();
  const [isRotating, setIsRotating] = useState(false);
  const rotationSpeed = useRef(0);
  const lastX = useRef(0);
  
  const inputSource = useRef<"mouse" | "keyboard" | null>(null);

  const getSpeed = () => rotationSpeed.current;

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerDown = (event: any) => {
      if (isRotating) return;
      event.preventDefault();
      event.stopPropagation();
      inputSource.current = "mouse";
      setIsRotating(true);
      lastX.current = event.touches ? event.touches[0].clientX : event.clientX;
    };

    const handlePointerUp = (event: any) => {
      if (inputSource.current !== "mouse") return;
      event.preventDefault();
      event.stopPropagation();
      setIsRotating(false);
      inputSource.current = null;
    };

    const handlePointerMove = (event: any) => {
      if (!isRotating || inputSource.current !== "mouse") return;
      event.preventDefault();
      event.stopPropagation();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      rotationSpeed.current = delta * 2 * 0.01;
      lastX.current = clientX;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isRotating) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        inputSource.current = "keyboard";
        setIsRotating(true);
        rotationSpeed.current = (event.key === "ArrowLeft" ? 0.5 : -0.5) * 0.01;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (inputSource.current !== "keyboard") return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        setIsRotating(false);
        inputSource.current = null;
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, viewport, isRotating]);

  return {
    getSpeed,
    isRotating,
  };
}
