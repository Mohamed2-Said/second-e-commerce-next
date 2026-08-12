/** @type {import('next').Next.jsConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
    ],
  },
};

module.exports = nextConfig;
