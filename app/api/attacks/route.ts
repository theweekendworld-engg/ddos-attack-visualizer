import { NextResponse } from "next/server";
import { fetchCloudflareRadarData, transformCloudflareData, generateSimulatedAttacks } from "@/lib/cloudflare";
import { filterRecentAttacks } from "@/lib/attacks";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Try to fetch real data from Cloudflare
    const cloudflareData = await fetchCloudflareRadarData();
    
    let attacks;
    if (cloudflareData) {
      attacks = transformCloudflareData(cloudflareData);
    } else {
      // Fallback to simulated data - generate more attacks for better visibility
      attacks = generateSimulatedAttacks(25);
    }

    // Filter to only recent attacks (last 20 seconds for better visibility)
    // This ensures attacks are visible and at different animation stages
    const recentAttacks = filterRecentAttacks(attacks, 20000);

    return NextResponse.json({
      attacks: recentAttacks,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching attacks:", error);
    
    // Return simulated data on error
    const simulatedAttacks = generateSimulatedAttacks(10);
    return NextResponse.json({
      attacks: simulatedAttacks,
      timestamp: new Date().toISOString(),
    });
  }
}

