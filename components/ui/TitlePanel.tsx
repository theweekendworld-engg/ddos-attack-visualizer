"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function TitlePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-1 sm:top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none w-[95%] sm:w-auto max-w-2xl"
    >
      <div className="relative bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-2xl rounded-lg sm:rounded-2xl md:rounded-3xl border border-white/20 p-2 sm:p-4 shadow-2xl overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        
        <div className="relative flex items-start gap-2 sm:gap-3 md:gap-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full" />
            <Shield className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400 mt-0.5 drop-shadow-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white text-xs sm:text-base md:text-lg font-bold mb-0 sm:mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              Real-Time DDoS Attack Visualization
            </h1>
            <p className="text-white/80 text-[9px] sm:text-xs leading-relaxed hidden sm:block">
              Interactive 3D globe showing live distributed denial-of-service attacks. 
              Hover over attack points for details. Lines show attack paths from source to destination.
            </p>
            <p className="text-white/80 text-[9px] leading-tight sm:hidden mt-0.5">
              Live DDoS visualization. Tap points for details.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

