import { City } from "@/types";

// Major cities with coordinates for visualization
export const MAJOR_CITIES: City[] = [
  { name: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060, code: "NYC" },
  { name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, code: "LON" },
  { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, code: "TYO" },
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, code: "PAR" },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, code: "SYD" },
  { name: "Moscow", country: "Russia", latitude: 55.7558, longitude: 37.6173, code: "MOW" },
  { name: "Beijing", country: "China", latitude: 39.9042, longitude: 116.4074, code: "BJS" },
  { name: "São Paulo", country: "Brazil", latitude: -23.5505, longitude: -46.6333, code: "SAO" },
  { name: "Mumbai", country: "India", latitude: 19.0760, longitude: 72.8777, code: "BOM" },
  { name: "Dubai", country: "UAE", latitude: 25.2048, longitude: 55.2708, code: "DXB" },
  { name: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, code: "SIN" },
  { name: "Los Angeles", country: "United States", latitude: 34.0522, longitude: -118.2437, code: "LAX" },
  { name: "Chicago", country: "United States", latitude: 41.8781, longitude: -87.6298, code: "CHI" },
  { name: "Frankfurt", country: "Germany", latitude: 50.1109, longitude: 8.6821, code: "FRA" },
  { name: "Amsterdam", country: "Netherlands", latitude: 52.3676, longitude: 4.9041, code: "AMS" },
  { name: "Hong Kong", country: "Hong Kong", latitude: 22.3193, longitude: 114.1694, code: "HKG" },
  { name: "Seoul", country: "South Korea", latitude: 37.5665, longitude: 126.9780, code: "SEL" },
  { name: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832, code: "YYZ" },
  { name: "Mexico City", country: "Mexico", latitude: 19.4326, longitude: -99.1332, code: "MEX" },
  { name: "Bangkok", country: "Thailand", latitude: 13.7563, longitude: 100.5018, code: "BKK" },
];

// Convert lat/lng to 3D coordinates on a sphere
export function latLngToVector3(lat: number, lng: number, radius: number = 1): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

// Find closest city to given coordinates
export function findClosestCity(lat: number, lng: number): City {
  let closest = MAJOR_CITIES[0];
  let minDistance = Infinity;

  for (const city of MAJOR_CITIES) {
    const distance = Math.sqrt(
      Math.pow(city.latitude - lat, 2) + Math.pow(city.longitude - lng, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closest = city;
    }
  }

  return closest;
}

// Get random city
export function getRandomCity(): City {
  return MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)];
}

// Calculate distance between two cities (great circle distance)
export function calculateDistance(city1: City, city2: City): number {
  const R = 6371; // Earth's radius in km
  const dLat = (city2.latitude - city1.latitude) * (Math.PI / 180);
  const dLng = (city2.longitude - city1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(city1.latitude * (Math.PI / 180)) *
      Math.cos(city2.latitude * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

