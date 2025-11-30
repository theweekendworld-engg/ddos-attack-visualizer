import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Prevent R3F from being bundled for server
  serverExternalPackages: ["@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;

