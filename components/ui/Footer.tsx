"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="absolute bottom-2 sm:bottom-4 md:bottom-6 right-2 sm:right-4 md:right-6 z-10"
    >
      <div className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg">
        <p className="text-white/60 text-[10px] sm:text-xs flex items-center gap-1.5 sm:gap-2">
          <span>Made with</span>
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>by</span>
          <a
            href="https://theweekendworld.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 font-semibold hover:text-blue-400 transition-colors duration-300 underline decoration-transparent hover:decoration-blue-400 underline-offset-2 cursor-pointer"
          >
            theweekendworld
          </a>
        </p>
      </div>
    </motion.div>
  );
}

