import type { Metadata } from "next";
import "./globals.css";
import { GlobeProvider } from "@/components/providers/GlobeProvider";

export const metadata: Metadata = {
  title: "DDoS Attack 3D Visualization",
  description: "Real-time 3D visualization of DDoS attacks across the globe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GlobeProvider>{children}</GlobeProvider>
      </body>
    </html>
  );
}

