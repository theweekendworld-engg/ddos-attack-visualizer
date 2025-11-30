import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GlobeProvider } from "@/components/providers/GlobeProvider";

export const metadata: Metadata = {
  title: "DDoS Attack 3D Visualization",
  description: "Real-time 3D visualization of DDoS attacks across the globe",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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

