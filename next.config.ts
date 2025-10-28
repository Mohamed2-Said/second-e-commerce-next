import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "",
        pathname: "/Route-Academy-*/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ المهم ده
  },
};

export default nextConfig;
