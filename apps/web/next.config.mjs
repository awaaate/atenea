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
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:6006",
          }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};

export default nextConfig;
