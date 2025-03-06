import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ROCKET_URL =
  "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/rocket/model.gltf";

interface RocketProps {
  position?: [number, number, number];
  scale?: number;
  isHovered?: boolean;
  isLaunching?: boolean;
}

const Rocket: React.FC<RocketProps> = ({
  position = [0, 0, 0],
  scale = 0.5,
  isHovered = false,
  isLaunching = false,
}) => {
  const rocketRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ROCKET_URL, true);
  const [launchAnimation, setLaunchAnimation] = useState({
    active: false,
    progress: 0,
    returning: false,
  });

  // Clone the scene to avoid issues with multiple instances
  const rocketScene = scene.clone();

  // Handle launch animation on page load
  useEffect(() => {
    if (isLaunching) {
      setLaunchAnimation({
        active: true,
        progress: 0,
        returning: false,
      });
    }
  }, [isLaunching]);

  // Animation loop
  useFrame((state, delta) => {
    if (!rocketRef.current) return;

    // Constant rotation
    rocketRef.current.rotation.y += delta * 0.5;

    // Handle hover animation
    if (isHovered && !launchAnimation.active) {
      rocketRef.current.position.y = THREE.MathUtils.lerp(
        rocketRef.current.position.y,
        position[1] + 2, // Hover 2 units above original position
        delta * 2,
      );
    } else if (!launchAnimation.active) {
      rocketRef.current.position.y = THREE.MathUtils.lerp(
        rocketRef.current.position.y,
        position[1],
        delta * 2,
      );
    }

    // Handle launch animation
    if (launchAnimation.active) {
      if (!launchAnimation.returning) {
        // Going up
        launchAnimation.progress += delta * 0.5;
        rocketRef.current.position.y =
          position[1] + launchAnimation.progress * 10;

        // Add some wobble
        rocketRef.current.position.x =
          position[0] + Math.sin(launchAnimation.progress * 2) * 0.3;

        // Start returning after reaching peak
        if (launchAnimation.progress >= 1) {
          setLaunchAnimation((prev) => ({ ...prev, returning: true }));
        }
      } else {
        // Coming back down
        launchAnimation.progress -= delta * 0.3;
        rocketRef.current.position.y =
          position[1] + launchAnimation.progress * 10;

        // Add some wobble on return
        rocketRef.current.position.x =
          position[0] + Math.sin(launchAnimation.progress * 3) * 0.2;

        // End animation
        if (launchAnimation.progress <= 0) {
          setLaunchAnimation({
            active: false,
            progress: 0,
            returning: false,
          });
        }
      }
    }
  });

  return (
    <group
      ref={rocketRef}
      position={[position[0], position[1], position[2]]}
      scale={[scale, scale, scale]}
    >
      <primitive object={rocketScene} />
      {/* Add rocket flames when launching or hovering */}
      {(isHovered || launchAnimation.active) && (
        <mesh position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.5, 1, 16]} />
          <meshStandardMaterial
            color="#ff7b00"
            emissive="#ff5500"
            emissiveIntensity={2}
          />
        </mesh>
      )}
    </group>
  );
};

export default Rocket;

// Preload the model
useGLTF.preload(ROCKET_URL);
