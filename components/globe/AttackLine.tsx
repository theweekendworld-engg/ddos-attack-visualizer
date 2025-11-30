"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/geo";
import { getIntensityColor, getIntensityOpacity } from "@/lib/utils";
import { Attack } from "@/types";
import { AttackParticle } from "./AttackParticle";

interface AttackLineProps {
  attack: Attack;
  index: number;
}

export function AttackLine({ attack, index }: AttackLineProps) {
  const lineRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  
  // Calculate attack age and determine if it should be visible
  const attackStartTime = useMemo(() => {
    const timestamp = attack.timestamp instanceof Date 
      ? attack.timestamp.getTime() 
      : new Date(attack.timestamp).getTime();
    return timestamp;
  }, [attack.timestamp]);
  
  const attackDuration = useMemo(() => {
    // Faster attack duration - 2-3 seconds for snappy movement
    const baseDuration = 2000; // 2 seconds base
    return baseDuration + (attack.intensity * 1000); // Up to 3 seconds for high intensity
  }, [attack.intensity]);

  const [sourcePos, destPos] = useMemo(() => {
    const radius = 1.01; // Slightly above Earth surface
    return [
      latLngToVector3(attack.source.latitude, attack.source.longitude, radius),
      latLngToVector3(attack.destination.latitude, attack.destination.longitude, radius),
    ];
  }, [attack]);

  // Calculate distance for arc height
  const distance = useMemo(() => {
    const dx = destPos[0] - sourcePos[0];
    const dy = destPos[1] - sourcePos[1];
    const dz = destPos[2] - sourcePos[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }, [sourcePos, destPos]);

  // Create curved path (arc) - more realistic height based on distance
  const curve = useMemo(() => {
    const arcHeight = Math.min(distance * 0.3, 0.5); // Proportional to distance
    const midPoint = [
      (sourcePos[0] + destPos[0]) / 2,
      (sourcePos[1] + destPos[1]) / 2 + arcHeight,
      (sourcePos[2] + destPos[2]) / 2,
    ];

    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...sourcePos),
      new THREE.Vector3(...midPoint),
      new THREE.Vector3(...destPos)
    );
  }, [sourcePos, destPos, distance]);

  const color = useMemo(() => getIntensityColor(attack.intensity), [attack.intensity]);
  const opacity = useMemo(() => getIntensityOpacity(attack.intensity), [attack.intensity]);

  const [fadeOpacity, setFadeOpacity] = useState(1);

  // Animate based on real attack timestamp
  useFrame((state, delta) => {
    const now = Date.now();
    const age = now - attackStartTime;
    
    // Show attacks that are recent (within last 15 seconds)
    if (age < -500) {
      // Attack is too far in the future
      setProgress(0);
      setFadeOpacity(0);
    } else if (age < 0) {
      // Attack is about to start - show it early
      setProgress(0);
      setFadeOpacity(Math.min(1, (500 + age) / 500));
    } else if (age > attackDuration) {
      // Attack has completed - fade out quickly
      const fadeOutTime = 500; // 0.5 second fade out
      const fadeProgress = Math.max(0, 1 - (age - attackDuration) / fadeOutTime);
      setProgress(1);
      setFadeOpacity(fadeProgress);
    } else {
      // Attack is in progress - smooth animation
      setProgress(age / attackDuration);
      setFadeOpacity(1);
    }
  });

  const points = useMemo(() => {
    const segments = 50;
    return curve.getPoints(segments);
  }, [curve]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: opacity * 0.6 * fadeOpacity, // Increased visibility
        linewidth: 2,
      }),
    [color, opacity, fadeOpacity]
  );

  // Create animated segment - more realistic with trailing effect
  const animatedPoints = useMemo(() => {
    const segmentLength = 0.15 + attack.intensity * 0.1; // Longer for high intensity
    const start = Math.max(0, progress - segmentLength);
    const end = Math.min(1, progress);

    const startIndex = Math.floor(start * points.length);
    const endIndex = Math.ceil(end * points.length);

    return points.slice(startIndex, endIndex);
  }, [points, progress, attack.intensity]);

  const animatedGeometry = useMemo(() => {
    if (animatedPoints.length < 2) return null;
    return new THREE.BufferGeometry().setFromPoints(animatedPoints);
  }, [animatedPoints]);

  const currentPosition = useMemo(() => {
    if (animatedPoints.length === 0) return null;
    return animatedPoints[animatedPoints.length - 1];
  }, [animatedPoints]);

  // Create line objects
  const lineObject = useMemo(() => {
    const line = new THREE.Line(geometry, material);
    return line;
  }, [geometry, material]);

  const animatedLineObject = useMemo(() => {
    if (!animatedGeometry) return null;
    // More visible line with brighter effect
    const line = new THREE.Line(
      animatedGeometry,
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: Math.min(1, opacity * 3 * fadeOpacity), // Much brighter
        linewidth: 3 + attack.intensity * 3, // Thicker lines
      })
    );
    return line;
  }, [animatedGeometry, color, opacity, attack.intensity, fadeOpacity]);

  // Show attacks that are visible - be more lenient to ensure visibility
  const shouldShow = fadeOpacity > 0.05; // Show if there's any opacity

  return (
    <group ref={lineRef}>
      {/* Full path (very faded) - only show if attack is active */}
      {shouldShow && <primitive object={lineObject} />}

      {/* Animated segment (bright) - the actual attack */}
      {shouldShow && animatedLineObject && <primitive object={animatedLineObject} />}

      {/* Particle effect at current position */}
      {shouldShow && currentPosition && (
        <AttackParticle
          position={currentPosition}
          color={color}
          intensity={attack.intensity}
        />
      )}
    </group>
  );
}

