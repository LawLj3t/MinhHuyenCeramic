import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ['**/node_modules/**', '**/.git/**', 'C:/*.sys', 'C:/*.tmp'],
      };
    }
    return config;
  },
};

export default nextConfig;
