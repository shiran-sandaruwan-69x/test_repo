import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import Rocket from "./Rocket";
import SimplerRocket from "./SimplerRocket";
import FallbackRocket from "./FallbackRocket";

const RocketContainer: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [launching, setLaunching] = useState(false);

  // Launch rocket on page load
  useEffect(() => {
    setLaunching(true);

    // Reset launching state after animation completes
    const timer = setTimeout(() => {
      setLaunching(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const [hasError, setHasError] = useState(false);

  // Error boundary for 3D rendering
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("3D rendering error:", event);
      setHasError(true);
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return <FallbackRocket />;
  }

  return (
    <div
      className="fixed bottom-10 right-10 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      >
        <Suspense fallback={<FallbackRocket />}>
          <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={50} />
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <SimplerRocket
            position={[0, -1, 0]}
            scale={1.5}
            isHovered={hovered}
            isLaunching={launching}
          />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RocketContainer;
