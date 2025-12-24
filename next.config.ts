import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      // Cache all images (JPG, JPEG, PNG, WebP, GIF, SVG, AVIF) for 1 year
      {
        source: "/:all*(.(jpg|jpeg|png|webp|gif|svg|avif))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Your existing MP4 caching
      {
        source: "/:all*(mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;