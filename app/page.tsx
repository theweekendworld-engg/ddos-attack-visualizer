"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { StatsPanel } from "@/components/ui/StatsPanel";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { Legend } from "@/components/ui/Legend";
import { TitlePanel } from "@/components/ui/TitlePanel";

// Use Next.js dynamic import with ssr: false - this prevents R3F from loading during SSR
const GlobeScene = dynamic(
  () => import("@/components/globe/GlobeScene").then((mod) => ({ default: mod.GlobeScene })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading globe...</div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading globe...</div>
        </div>
      }>
        <GlobeScene />
      </Suspense>

      {/* UI Overlays */}
      <TitlePanel />
      <StatsPanel />
      <ControlPanel />
      <Legend />
    </main>
  );
}

