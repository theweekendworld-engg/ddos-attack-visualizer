"use client";

import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Gauge } from "lucide-react";
import { useGlobe } from "../providers/GlobeProvider";

export function ControlPanel() {
  const { isPlaying, togglePlay, playbackSpeed, setPlaybackSpeed, refreshData } = useGlobe();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
    >
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors border border-white/10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Refresh Button */}
        <button
          onClick={refreshData}
          className="bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors border border-white/10"
          aria-label="Refresh"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-white/60" />
          <span className="text-white/60 text-sm">Speed:</span>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            className="w-24 accent-blue-500"
          />
          <span className="text-white text-sm font-medium w-8">
            {playbackSpeed.toFixed(1)}x
          </span>
        </div>
      </div>
    </motion.div>
  );
}

