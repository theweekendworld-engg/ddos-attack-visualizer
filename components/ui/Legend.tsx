"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export function Legend() {
  const intensityLevels = [
    { label: "Low", color: "#10b981", intensity: 0.2 },
    { label: "Medium", color: "#f59e0b", intensity: 0.5 },
    { label: "High", color: "#ef4444", intensity: 0.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-[55px] sm:top-24 md:top-6 right-2 sm:right-4 md:right-6 z-10 w-[calc(50%-0.75rem)] sm:w-auto max-w-[200px] sm:max-w-none"
    >
      <div className="relative bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-2xl rounded-lg sm:rounded-2xl md:rounded-3xl border border-white/20 p-2 sm:p-4 md:p-5 shadow-2xl overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        <div className="relative">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
            <div className="p-0.5 sm:p-1.5 rounded-md sm:rounded-lg bg-blue-500/20">
              <Info className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-blue-400" />
            </div>
            <h3 className="text-white text-xs sm:text-base font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Intensity
            </h3>
          </div>
          
          <div className="space-y-1.5 sm:space-y-3">
            {intensityLevels.map((level, index) => (
              <motion.div
                key={level.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 group"
              >
                <div
                  className="relative w-3 h-3 sm:w-5 sm:h-5 rounded-full transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: level.color,
                    boxShadow: `0 0 6px ${level.color}, 0 0 12px ${level.color}40`,
                  }}
                />
                <span className="text-white/80 text-[9px] sm:text-xs font-medium">{level.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-2 sm:mt-4 md:mt-5 pt-2 sm:pt-4 md:pt-5 border-t border-white/20">
            <div className="text-white/70 text-[9px] sm:text-xs space-y-1 sm:space-y-2">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                <span>Lines show attack paths</span>
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2">
                <span className="text-purple-400 mt-0.5 flex-shrink-0">•</span>
                <span>Markers indicate cities</span>
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2">
                <span className="text-pink-400 mt-0.5 flex-shrink-0">•</span>
                <span>Size = attack volume</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

