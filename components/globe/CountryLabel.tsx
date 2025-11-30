"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/geo";
import { City } from "@/types";

interface CountryLabelProps {
  city: City;
  attackCount: number;
}

export function CountryLabel({ city, attackCount }: CountryLabelProps) {
  const labelRef = useRef<THREE.Group>(null);

  const position = useMemo(
    () => latLngToVector3(city.latitude, city.longitude, 1.05), // Slightly above the surface
    [city]
  );

  // Make text face the camera
  useFrame(({ camera }) => {
    if (labelRef.current) {
      labelRef.current.lookAt(camera.position);
    }
  });

  // Determine color based on attack intensity
  const color = useMemo(() => {
    if (attackCount > 10) return "#ef4444"; // red for high activity
    if (attackCount > 5) return "#f59e0b"; // orange for medium activity
    return "#10b981"; // green for low activity
  }, [attackCount]);

  return (
    <group ref={labelRef} position={position}>
      {/* Subtle background circle for better readability - smaller */}
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Country name - much smaller font */}
      <Text
        fontSize={0.015}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#000000"
        outlineOpacity={1}
        renderOrder={1001}
        maxWidth={0.1}
      >
        {city.country.length > 20 ? city.country.substring(0, 20) + "..." : city.country}
      </Text>
      
      {/* City name - much smaller */}
      <Text
        position={[0, -0.025, 0]}
        fontSize={0.011}
        color="#e0e0e0"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.004}
        outlineColor="#000000"
        outlineOpacity={1}
        renderOrder={1001}
      >
        {city.name}
      </Text>
      
      {/* Attack count badge - much smaller */}
      <Text
        position={[0, -0.038, 0]}
        fontSize={0.01}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.003}
        outlineColor="#000000"
        outlineOpacity={1}
        renderOrder={1001}
      >
        {attackCount}
      </Text>
    </group>
  );
}

