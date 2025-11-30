"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { AttackLine } from "./AttackLine";
import { CityMarker } from "./CityMarker";
import { CountryLabel } from "./CountryLabel";
import { useGlobe } from "../providers/GlobeProvider";
import { City } from "@/types";

export function EarthGlobe() {
  const earthGroupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const { attacks } = useGlobe();
  const [hoveredCity, setHoveredCity] = useState<{ city: City; count: number } | null>(null);

  // Load Earth texture - using high-quality Earth texture with countries visible
  const [earthTexture, normalMap, specularMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg",
  ]);

  // Create Earth material with real texture
  const earthMaterial = useMemo(
    () => {
      // Configure textures - Earth textures should clamp, not repeat
      earthTexture.wrapS = earthTexture.wrapT = THREE.ClampToEdgeWrapping;
      normalMap.wrapS = normalMap.wrapT = THREE.ClampToEdgeWrapping;
      specularMap.wrapS = specularMap.wrapT = THREE.ClampToEdgeWrapping;
      
      const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        normalMap: normalMap,
        specularMap: specularMap,
        normalScale: new THREE.Vector2(0.8, 0.8),
        shininess: 10,
        transparent: false,
      });
      return material;
    },
    [earthTexture, normalMap, specularMap]
  );

  // Create atmosphere glow
  const atmosphereMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3b82f6",
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
      }),
    []
  );

  // Rotate the entire Earth group (Earth + markers + lines together)
  useFrame((state, delta) => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += delta * 0.05;
    }
  });

  // Get unique cities from attacks
  const cities = useMemo(() => {
    const cityMap = new Map<string, { city: City; count: number }>();
    
    attacks.forEach((attack) => {
      const sourceKey = `${attack.source.latitude},${attack.source.longitude}`;
      const sourceCount = cityMap.get(sourceKey) || { city: attack.source, count: 0 };
      sourceCount.count++;
      cityMap.set(sourceKey, sourceCount);

      const destKey = `${attack.destination.latitude},${attack.destination.longitude}`;
      const destCount = cityMap.get(destKey) || { city: attack.destination, count: 0 };
      destCount.count++;
      cityMap.set(destKey, destCount);
    });

    return Array.from(cityMap.values());
  }, [attacks]);

  return (
    <>
      {/* Stars background */}
      <Stars radius={300} depth={60} count={5000} factor={7} fade speed={1} />

      {/* Ambient light */}
      <ambientLight intensity={0.3} />

      {/* Main directional light (sun) - simulating sunlight */}
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
      
      {/* Additional light for better visibility */}
      <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#ffffff" />

      {/* Earth group - everything inside rotates together */}
      <group ref={earthGroupRef}>
        {/* Earth sphere with high resolution for detail */}
        <Sphere ref={earthRef} args={[1, 128, 128]}>
          <primitive object={earthMaterial} attach="material" />
        </Sphere>

        {/* Atmosphere glow */}
        <Sphere args={[1.02, 64, 64]}>
          <primitive object={atmosphereMaterial} attach="material" />
        </Sphere>

        {/* City markers - now rotate with Earth */}
        {cities.map((cityData, index) => (
          <CityMarker
            key={`city-${cityData.city.latitude}-${cityData.city.longitude}-${index}`}
            city={cityData.city}
            attackCount={cityData.count}
            onHover={() => setHoveredCity(cityData)}
            onUnhover={() => setHoveredCity(null)}
          />
        ))}

        {/* Country label - only show on hover with very small fonts */}
        {hoveredCity && (
          <CountryLabel
            city={hoveredCity.city}
            attackCount={hoveredCity.count}
          />
        )}

        {/* Attack lines - now rotate with Earth */}
        {attacks.map((attack, index) => (
          <AttackLine
            key={attack.id || `attack-${index}`}
            attack={attack}
            index={index}
          />
        ))}
      </group>

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={5}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

