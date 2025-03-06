import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SimplerRocketProps {
  position?: [number, number, number];
  scale?: number;
  isHovered?: boolean;
  isLaunching?: boolean;
}

const SimplerRocket: React.FC<SimplerRocketProps> = ({
  position = [0, 0, 0],
  scale = 0.5,
  isHovered = false,
  isLaunching = false,
}) => {
  const rocketRef = useRef<THREE.Group>(null);

  // Animation loop
  useFrame((state, delta) => {
    if (!rocketRef.current) return;

    // Constant rotation
    rocketRef.current.rotation.y += delta * 0.5;

    // Simple hover animation
    if (isHovered) {
      rocketRef.current.position.y = THREE.MathUtils.lerp(
        rocketRef.current.position.y,
        position[1] + 1.5,
        delta * 2,
      );
    } else {
      rocketRef.current.position.y = THREE.MathUtils.lerp(
        rocketRef.current.position.y,
        position[1],
        delta * 2,
      );
    }
  });

  return (
    <group
      ref={rocketRef}
      position={[position[0], position[1], position[2]]}
      scale={[scale, scale, scale]}
    >
      {/* Rocket body */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.5, 1.5, 16, 16]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rocket nose */}
      <mesh position={[0, 1.75, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 1, 16]} />
        <meshStandardMaterial color="#c4b5fd" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Rocket fins */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rotation, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[0, rotation, 0]}>
          <boxGeometry args={[0.1, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#7c3aed"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Window */}
      <mesh position={[0, 0.8, 0.45]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#60a5fa"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Rocket flames */}
      {(isHovered || isLaunching) && (
        <group position={[0, -0.5, 0]}>
          <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.3, 0.8, 16]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#f97316"
              emissiveIntensity={2}
            />
          </mesh>
          <mesh position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.2, 0.5, 16]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={2}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default SimplerRocket;
