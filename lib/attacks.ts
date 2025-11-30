import { Attack, AttackStats, City } from "@/types";

export function calculateStats(attacks: Attack[]): AttackStats {
  const sourceCounts = new Map<string, { city: City; count: number }>();
  const destCounts = new Map<string, { city: City; count: number }>();
  
  let totalIntensity = 0;

  attacks.forEach((attack) => {
    // Count sources
    const sourceKey = `${attack.source.latitude},${attack.source.longitude}`;
    const sourceCount = sourceCounts.get(sourceKey) || { city: attack.source, count: 0 };
    sourceCount.count++;
    sourceCounts.set(sourceKey, sourceCount);

    // Count destinations
    const destKey = `${attack.destination.latitude},${attack.destination.longitude}`;
    const destCount = destCounts.get(destKey) || { city: attack.destination, count: 0 };
    destCount.count++;
    destCounts.set(destKey, destCount);

    totalIntensity += attack.intensity;
  });

  const topSources = Array.from(sourceCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topDestinations = Array.from(destCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Helper to get timestamp as number
  const getTimestamp = (timestamp: Date | string): number => {
    if (timestamp instanceof Date) {
      return timestamp.getTime();
    }
    return new Date(timestamp).getTime();
  };

  return {
    totalAttacks: attacks.length,
    activeAttacks: attacks.filter(
      (a) => Date.now() - getTimestamp(a.timestamp) < 60000
    ).length,
    topSources,
    topDestinations,
    averageIntensity: attacks.length > 0 ? totalIntensity / attacks.length : 0,
  };
}

export function filterRecentAttacks(attacks: Attack[], maxAge: number = 60000): Attack[] {
  const now = Date.now();
  // Helper to get timestamp as number
  const getTimestamp = (timestamp: Date | string): number => {
    if (timestamp instanceof Date) {
      return timestamp.getTime();
    }
    return new Date(timestamp).getTime();
  };
  
  return attacks.filter(
    (attack) => now - getTimestamp(attack.timestamp) < maxAge
  );
}

