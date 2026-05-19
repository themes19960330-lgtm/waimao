import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
