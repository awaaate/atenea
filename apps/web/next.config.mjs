import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@shared/tailwind-config",
    "@shared/editor",
    "@shared/ui",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "turborepo-nextjs.vercel.app",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.jakerunzer.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};

export default nextConfig;
