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
      transition={{ duration: 0.5 }}
      className="absolute bottom-16 sm:bottom-24 md:bottom-6 left-1/2 transform -translate-x-1/2 z-10 w-[95%] sm:w-auto"
    >
      <div className="relative bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 p-3 sm:p-3 md:p-4 shadow-2xl flex items-center gap-3 sm:gap-3 md:gap-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        <div className="relative flex items-center gap-3 sm:gap-3 w-full sm:w-auto">
          {/* Play/Pause Button - Larger touch target on mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-xl sm:rounded-xl p-3 sm:p-2.5 md:p-3 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-blue-500/20 flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-5 sm:h-5 text-white drop-shadow-lg" />
            ) : (
              <Play className="w-5 h-5 sm:w-5 sm:h-5 text-white drop-shadow-lg" />
            )}
          </motion.button>

          {/* Refresh Button - Larger touch target on mobile */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshData}
            className="relative bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-xl sm:rounded-xl p-3 sm:p-2.5 md:p-3 transition-all duration-300 border border-white/20 hover:border-white/40 flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Refresh"
          >
            <RotateCcw className="w-5 h-5 sm:w-5 sm:h-5 text-white drop-shadow-lg" />
          </motion.button>

          {/* Speed Control - Better mobile layout */}
          <div className="flex items-center gap-2 sm:gap-2 md:gap-3 pl-3 sm:pl-3 border-l border-white/20 flex-1 sm:flex-initial min-w-0">
            <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
            <span className="text-white/80 text-xs sm:text-sm font-medium flex-shrink-0 whitespace-nowrap">Speed:</span>
            <div className="relative flex-1 sm:flex-initial min-w-[100px] sm:min-w-[120px] flex items-center h-6">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="w-full h-2 appearance-none cursor-pointer relative z-10"
                style={{
                  background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${((playbackSpeed - 0.5) / 2.5) * 100}%, rgba(255, 255, 255, 0.1) ${((playbackSpeed - 0.5) / 2.5) * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
                  borderRadius: '4px',
                }}
              />
            </div>
            <span className="text-white text-sm sm:text-sm font-bold w-12 sm:w-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex-shrink-0 whitespace-nowrap">
              {playbackSpeed.toFixed(1)}x
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

