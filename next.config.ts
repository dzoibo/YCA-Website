import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Photos are resized and served as AVIF/WebP at the size each device needs.
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
