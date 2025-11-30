export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  code?: string;
}

export interface Attack {
  id: string;
  source: City;
  destination: City;
  intensity: number; // 0-1 scale
  timestamp: Date;
  type?: string;
  duration?: number;
}

export interface AttackStats {
  totalAttacks: number;
  activeAttacks: number;
  topSources: Array<{ city: City; count: number }>;
  topDestinations: Array<{ city: City; count: number }>;
  averageIntensity: number;
}

export interface GlobeState {
  attacks: Attack[];
  stats: AttackStats;
  isPlaying: boolean;
  playbackSpeed: number;
  selectedAttack: Attack | null;
}

export interface CloudflareRadarData {
  timestamp: string;
  attacks: Array<{
    source: {
      ip: string;
      city?: string;
      country?: string;
      latitude?: number;
      longitude?: number;
    };
    destination: {
      ip: string;
      city?: string;
      country?: string;
      latitude?: number;
      longitude?: number;
    };
    intensity?: number;
    type?: string;
  }>;
}

