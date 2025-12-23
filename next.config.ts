import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Helps keep bundle small; safe defaults.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
