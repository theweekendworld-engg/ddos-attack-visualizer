"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, Globe, Zap } from "lucide-react";
import { useGlobe } from "../providers/GlobeProvider";
import { formatNumber } from "@/lib/utils";

export function StatsPanel() {
  const { stats } = useGlobe();

  const statItems = [
    {
      label: "Total Attacks",
      value: formatNumber(stats.totalAttacks),
      icon: Activity,
      color: "text-blue-400",
    },
    {
      label: "Active Now",
      value: formatNumber(stats.activeAttacks),
      icon: Zap,
      color: "text-red-400",
    },
    {
      label: "Avg Intensity",
      value: `${(stats.averageIntensity * 100).toFixed(0)}%`,
      icon: TrendingUp,
      color: "text-orange-400",
    },
    {
      label: "Cities Affected",
      value: formatNumber(
        new Set([
          ...stats.topSources.map((s) => s.city.name),
          ...stats.topDestinations.map((d) => d.city.name),
        ]).size
      ),
      icon: Globe,
      color: "text-purple-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-[55px] sm:top-24 md:top-6 left-2 sm:left-4 md:left-6 z-10 w-[calc(50%-0.75rem)] sm:w-auto max-w-[280px] sm:max-w-none"
    >
      <div className="relative bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-2xl rounded-lg sm:rounded-2xl md:rounded-3xl border border-white/20 p-2 sm:p-4 md:p-6 shadow-2xl overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-2 sm:mb-4 md:mb-5">
            <div className="w-0.5 sm:w-1 h-3 sm:h-5 md:h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
            <h2 className="text-white text-xs sm:text-base md:text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Live Statistics
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
            {statItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-md sm:rounded-xl p-1.5 sm:p-3 md:p-4 border border-white/20 backdrop-blur-sm hover:border-white/30 transition-all duration-300 group"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-lg sm:rounded-xl transition-all duration-300" />
                  
                  <div className="relative flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-2">
                    <div className="p-0.5 sm:p-1.5 rounded-md sm:rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                      <Icon className={`w-2.5 h-2.5 sm:w-4 sm:h-4 ${item.color} drop-shadow-lg`} />
                    </div>
                    <span className="text-white/70 text-[9px] sm:text-xs font-medium truncate">{item.label}</span>
                  </div>
                  <div className={`text-lg sm:text-2xl md:text-3xl font-bold ${item.color} drop-shadow-lg leading-tight`}>
                    {item.value}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Top Sources - Hide on very small screens */}
          {stats.topSources.length > 0 && (
            <div className="mt-2 sm:mt-4 md:mt-5 pt-2 sm:pt-4 md:pt-5 border-t border-white/20">
              <h3 className="text-white/90 text-[10px] sm:text-sm font-semibold mb-1.5 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-orange-400" />
                <span className="hidden sm:inline">Top Sources</span>
                <span className="sm:hidden">Sources</span>
              </h3>
              <div className="space-y-1 sm:space-y-2">
                {stats.topSources.slice(0, 3).map((source, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex justify-between items-center text-[9px] sm:text-xs bg-white/5 rounded sm:rounded-lg px-1.5 sm:px-3 py-1 sm:py-2 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <span className="text-white/80 font-medium truncate pr-1 sm:pr-2 text-[9px] sm:text-xs">{source.city.name}</span>
                    <span className="text-orange-400 font-bold bg-orange-400/10 px-1 sm:px-2 py-0.5 rounded-full flex-shrink-0 text-[9px] sm:text-xs">
                      {source.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Top Destinations - Hide on very small screens */}
          {stats.topDestinations.length > 0 && (
            <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-white/20">
              <h3 className="text-white/90 text-[10px] sm:text-sm font-semibold mb-1.5 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-400" />
                <span className="hidden sm:inline">Top Destinations</span>
                <span className="sm:hidden">Destinations</span>
              </h3>
              <div className="space-y-1 sm:space-y-2">
                {stats.topDestinations.slice(0, 3).map((dest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex justify-between items-center text-[9px] sm:text-xs bg-white/5 rounded sm:rounded-lg px-1.5 sm:px-3 py-1 sm:py-2 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <span className="text-white/80 font-medium truncate pr-1 sm:pr-2 text-[9px] sm:text-xs">{dest.city.name}</span>
                    <span className="text-red-400 font-bold bg-red-400/10 px-1 sm:px-2 py-0.5 rounded-full flex-shrink-0 text-[9px] sm:text-xs">
                      {dest.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

