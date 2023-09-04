import "./env.mjs";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@shared/tailwind-config",
    "@shared/editor",
    "@shared/templates",
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
    outputFileTracingIgnores: [
      "./**/node_modules/@swc/core-linux-x64-gnu",
      "./**/node_modules/@swc/core-linux-x64-musl",
      "./**/node_modules/esbuild/linux",
      "./**/node_modules/webpack",
      "./**/node_modules/rollup",
      "./**/node_modules/terser",
    ],
  },
  outputFileTracing: true,
  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};

export default (nextConfig);
