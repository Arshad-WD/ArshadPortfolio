import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack compatibility (Next.js 16 default)
  turbopack: {},

  // Enable static asset caching for 3D models and images
  async headers() {
    return [
      {
        source: "/texture/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
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
