import { CloudflareRadarData, Attack, City } from "@/types";
import { findClosestCity, getRandomCity } from "./geo";

const CLOUDFLARE_RADAR_API = "https://api.cloudflare.com/client/v4/radar";

// Note: Cloudflare Radar API may require authentication or have rate limits
// For demo purposes, we'll also support simulated data
export async function fetchCloudflareRadarData(): Promise<CloudflareRadarData | null> {
  try {
    const apiKey = process.env.CLOUDFLARE_API_KEY;
    
    // Try to fetch from Cloudflare Radar API
    // Note: Actual endpoint may vary - this is a placeholder
    const response = await fetch(`${CLOUDFLARE_RADAR_API}/attacks`, {
      headers: apiKey ? {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      } : {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Failed to fetch from Cloudflare API, using simulated data:", error);
  }

  return null;
}

// Generate simulated attack data for demo purposes
export function generateSimulatedAttacks(count: number = 10): Attack[] {
  const attacks: Attack[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const source = getRandomCity();
    let destination = getRandomCity();
    
    // Ensure source and destination are different
    while (destination.name === source.name) {
      destination = getRandomCity();
    }

    // Generate attacks with timestamps spread over the last 10 seconds
    // This ensures attacks are visible and at different stages
    const timeOffset = Math.random() * 10000; // Within last 10 seconds
    const timestamp = new Date(now - timeOffset);

    attacks.push({
      id: `attack-${now}-${i}`,
      source,
      destination,
      intensity: Math.random(),
      timestamp: timestamp,
      type: ["HTTP", "TCP", "UDP", "ICMP"][Math.floor(Math.random() * 4)],
      duration: Math.random() * 5000 + 1000,
    });
  }

  return attacks;
}

// Transform Cloudflare data to our Attack format
export function transformCloudflareData(data: CloudflareRadarData): Attack[] {
  return data.attacks.map((attack, index) => {
    const sourceCity: City = attack.source.latitude && attack.source.longitude
      ? {
          name: attack.source.city || "Unknown",
          country: attack.source.country || "Unknown",
          latitude: attack.source.latitude,
          longitude: attack.source.longitude,
        }
      : findClosestCity(
          attack.source.latitude || 0,
          attack.source.longitude || 0
        );

    const destCity: City = attack.destination.latitude && attack.destination.longitude
      ? {
          name: attack.destination.city || "Unknown",
          country: attack.destination.country || "Unknown",
          latitude: attack.destination.latitude,
          longitude: attack.destination.longitude,
        }
      : findClosestCity(
          attack.destination.latitude || 0,
          attack.destination.longitude || 0
        );

    return {
      id: `cf-${Date.now()}-${index}`,
      source: sourceCity,
      destination: destCity,
      intensity: attack.intensity || Math.random(),
      timestamp: new Date(data.timestamp),
      type: attack.type,
    };
  });
}

