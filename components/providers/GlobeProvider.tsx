"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { GlobeState, Attack, AttackStats } from "@/types";
import { calculateStats } from "@/lib/attacks";

interface GlobeContextType extends GlobeState {
  updateAttacks: (attacks: Attack[]) => void;
  togglePlay: () => void;
  setPlaybackSpeed: (speed: number) => void;
  selectAttack: (attack: Attack | null) => void;
  refreshData: () => Promise<void>;
}

const GlobeContext = createContext<GlobeContextType | undefined>(undefined);

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [stats, setStats] = useState<AttackStats>({
    totalAttacks: 0,
    activeAttacks: 0,
    topSources: [],
    topDestinations: [],
    averageIntensity: 0,
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedAttack, setSelectedAttack] = useState<Attack | null>(null);

  const updateAttacks = useCallback((newAttacks: Attack[]) => {
    setAttacks(newAttacks);
    setStats(calculateStats(newAttacks));
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const response = await fetch("/api/attacks");
      const data = await response.json();
      // Convert timestamp strings to Date objects
      const attacksWithDates: Attack[] = data.attacks.map((attack: any) => ({
        ...attack,
        timestamp: new Date(attack.timestamp),
      }));
      updateAttacks(attacksWithDates);
    } catch (error) {
      console.error("Failed to refresh attack data:", error);
    }
  }, [updateAttacks]);

  useEffect(() => {
    // Initial load
    refreshData();

    // Set up polling if playing - refresh more frequently for better visibility
    if (isPlaying) {
      const interval = setInterval(() => {
        refreshData();
      }, 3000 / playbackSpeed); // Refresh every 3 seconds (faster updates)

      return () => clearInterval(interval);
    }
  }, [isPlaying, playbackSpeed, refreshData]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setPlaybackSpeed(Math.max(0.5, Math.min(3, speed)));
  }, []);

  const selectAttack = useCallback((attack: Attack | null) => {
    setSelectedAttack(attack);
  }, []);

  return (
    <GlobeContext.Provider
      value={{
        attacks,
        stats,
        isPlaying,
        playbackSpeed,
        selectedAttack,
        updateAttacks,
        togglePlay,
        setPlaybackSpeed: setSpeed,
        selectAttack,
        refreshData,
      }}
    >
      {children}
    </GlobeContext.Provider>
  );
}

export function useGlobe() {
  const context = useContext(GlobeContext);
  if (context === undefined) {
    throw new Error("useGlobe must be used within a GlobeProvider");
  }
  return context;
}

