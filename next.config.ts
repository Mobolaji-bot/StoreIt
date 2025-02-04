import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
        serverActions: {
          bodySizeLimit: "500MB"
        }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
  

};

export default nextConfig;
