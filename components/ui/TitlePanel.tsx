"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function TitlePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none"
    >
      <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 p-3 shadow-2xl max-w-xl">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-white text-base font-bold mb-1">
              Real-Time DDoS Attack Visualization
            </h1>
            <p className="text-white/70 text-xs leading-relaxed">
              Interactive 3D globe showing live distributed denial-of-service attacks. 
              Hover over attack points for details. Lines show attack paths from source to destination.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

