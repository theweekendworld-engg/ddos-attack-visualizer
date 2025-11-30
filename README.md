# DDoS Attack 3D Visualization

A mesmerizing real-time 3D visualization of DDoS attacks across the globe, featuring an interactive Earth with animated network lines connecting attack sources to destinations.

## Features

- 🌍 Interactive 3D Earth globe with rotation and zoom
- ⚡ Real-time attack visualization with animated arcs
- 🎯 City-level attack markers with pulsing effects
- 📊 Live statistics dashboard
- 🎨 Beautiful dark theme with glassmorphism UI
- 🎬 Movie-like visual effects with particles and glows

## Tech Stack

- Next.js 16 with TypeScript
- React Three Fiber for 3D rendering
- Three.js for 3D graphics
- Cloudflare Radar API for attack data
- Tailwind CSS for styling
- Framer Motion for animations

## Getting Started

### Prerequisites

- Bun (latest version)

### Installation

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables (optional):
```bash
cp env.example .env
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Project Structure

- `app/` - Next.js app router pages and API routes
- `components/globe/` - 3D globe and attack visualization components
- `components/ui/` - UI components (stats, controls, legend)
- `lib/` - Utilities for API, geo, and attack processing
- `types/` - TypeScript type definitions

