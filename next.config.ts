import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"ecommerce.routemisr.com',
        port: "",
        pathname: "/Route-Academy-*/**",
        search: "",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
