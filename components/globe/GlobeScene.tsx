"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EarthGlobe } from "./EarthGlobe";

export function GlobeScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <EarthGlobe />
        </Suspense>
      </Canvas>
    </div>
  );
}

