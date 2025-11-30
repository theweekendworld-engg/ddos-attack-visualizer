import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function getIntensityColor(intensity: number): string {
  // Returns bright, visible colors from green (low) to red (high)
  if (intensity < 0.33) {
    return "#10b981"; // bright green
  }
  if (intensity < 0.66) {
    return "#f59e0b"; // bright orange
  }
  return "#ef4444"; // bright red
}

export function getIntensityOpacity(intensity: number): number {
  return Math.max(0.6, intensity); // Increased minimum opacity for better visibility
}

