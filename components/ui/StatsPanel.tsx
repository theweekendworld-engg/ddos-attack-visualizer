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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-4 z-10"
    >
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
        <h2 className="text-white text-lg font-semibold mb-4">Live Statistics</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-3 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-white/60 text-xs">{item.label}</span>
                </div>
                <div className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Top Sources */}
        {stats.topSources.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <h3 className="text-white/80 text-sm font-medium mb-2">Top Sources</h3>
            <div className="space-y-1">
              {stats.topSources.slice(0, 3).map((source, index) => (
                <div
                  key={index}
                  className="flex justify-between text-xs text-white/70"
                >
                  <span>{source.city.name}</span>
                  <span className="text-orange-400">{source.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Destinations */}
        {stats.topDestinations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <h3 className="text-white/80 text-sm font-medium mb-2">Top Destinations</h3>
            <div className="space-y-1">
              {stats.topDestinations.slice(0, 3).map((dest, index) => (
                <div
                  key={index}
                  className="flex justify-between text-xs text-white/70"
                >
                  <span>{dest.city.name}</span>
                  <span className="text-red-400">{dest.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

