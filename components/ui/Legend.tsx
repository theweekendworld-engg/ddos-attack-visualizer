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
      className="absolute top-4 right-4 z-10"
    >
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-white/60" />
          <h3 className="text-white text-sm font-semibold">Intensity</h3>
        </div>
        
        <div className="space-y-2">
          {intensityLevels.map((level) => (
            <div key={level.label} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: level.color,
                  boxShadow: `0 0 8px ${level.color}`,
                }}
              />
              <span className="text-white/70 text-xs">{level.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-white/60 text-xs space-y-1">
            <p>• Lines show attack paths</p>
            <p>• Markers indicate cities</p>
            <p>• Size = attack volume</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

