"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AttackParticleProps {
  position: THREE.Vector3;
  color: string;
  intensity: number;
}

export function AttackParticle({ position, color, intensity }: AttackParticleProps) {
  const particleRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (particleRef.current) {
      timeRef.current += delta * 8;
      const scale = 0.015 + Math.sin(timeRef.current) * 0.01;
      particleRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={particleRef} position={position}>
      {/* Main particle - brighter and more visible */}
      <mesh>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity * 2}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4 * intensity}
        />
      </mesh>
    </group>
  );
}

