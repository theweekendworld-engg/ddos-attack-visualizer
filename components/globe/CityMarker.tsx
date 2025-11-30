"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/geo";
import { City } from "@/types";

interface CityMarkerProps {
  city: City;
  attackCount: number;
  onHover?: () => void;
  onUnhover?: () => void;
}

export function CityMarker({ city, attackCount, onHover, onUnhover }: CityMarkerProps) {
  const markerRef = useRef<THREE.Group>(null);
  const pulseRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  const position = useMemo(
    () => latLngToVector3(city.latitude, city.longitude, 1.01),
    [city]
  );

  // Color intensity based on attack count
  const intensity = useMemo(() => {
    return Math.min(attackCount / 10, 1);
  }, [attackCount]);

  // More natural pulsing animation
  useFrame((state, delta) => {
    if (markerRef.current) {
      pulseRef.current += delta * 2;
    }
  });

  const color = useMemo(() => {
    if (intensity > 0.7) return "#ef4444"; // red
    if (intensity > 0.4) return "#f59e0b"; // orange
    return "#10b981"; // green for low intensity
  }, [intensity]);

  // Only show markers if there are significant attacks
  if (attackCount < 1) return null;

  const handleHover = () => {
    setIsHovered(true);
    onHover?.();
  };

  const handleUnhover = () => {
    setIsHovered(false);
    onUnhover?.();
  };

  const markerSize = isHovered ? 0.012 : 0.008;

  return (
    <group 
      ref={markerRef} 
      position={position}
    >
      {/* Invisible hover area - larger for easier interaction */}
      <mesh
        onPointerEnter={handleHover}
        onPointerLeave={handleUnhover}
      >
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          visible={false}
        />
      </mesh>

      {/* Small glowing dot - minimal and elegant, slightly larger on hover */}
      <mesh>
        <sphereGeometry args={[markerSize, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? intensity * 3 : intensity * 2}
        />
      </mesh>

      {/* Subtle pulsing ring on the ground */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.012, 0.018, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3 * (0.3 + 0.7 * Math.sin(pulseRef.current))}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Small light beam pointing up */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.02, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity * 1.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

