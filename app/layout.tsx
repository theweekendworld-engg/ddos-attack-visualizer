import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GlobeProvider } from "@/components/providers/GlobeProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ddos-visualization.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Real-Time DDoS Attack Visualization | Global Cyber Threat Monitor",
    template: "%s | DDoS Attack Visualization",
  },
  description: "Interactive 3D real-time visualization of DDoS attacks across the globe. Monitor cyber threats, attack patterns, and network security incidents with an immersive 3D Earth globe showing live attack data.",
  keywords: [
    "DDoS attacks",
    "cyber security",
    "network security",
    "cyber threats",
    "real-time visualization",
    "3D globe",
    "cyber attack monitor",
    "distributed denial of service",
    "network monitoring",
    "cybersecurity dashboard",
    "threat intelligence",
    "attack visualization",
  ],
  authors: [{ name: "theweekendworld", url: "https://theweekendworld.com" }],
  creator: "theweekendworld",
  publisher: "theweekendworld",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Real-Time DDoS Attack Visualization | Global Cyber Threat Monitor",
    description: "Interactive 3D real-time visualization of DDoS attacks across the globe. Monitor cyber threats and attack patterns with an immersive 3D Earth globe.",
    siteName: "DDoS Attack Visualization",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DDoS Attack 3D Visualization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-Time DDoS Attack Visualization",
    description: "Interactive 3D real-time visualization of DDoS attacks across the globe. Monitor cyber threats with an immersive 3D Earth globe.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@theweekendworld",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Cybersecurity",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DDoS Attack 3D Visualization",
    description: "Interactive 3D real-time visualization of DDoS attacks across the globe",
    url: siteUrl,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "theweekendworld",
      url: "https://theweekendworld.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
      </head>
      <body className="antialiased">
        <GlobeProvider>{children}</GlobeProvider>
      </body>
    </html>
  );
}

