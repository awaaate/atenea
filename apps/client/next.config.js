/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uploadthing.com"],
  },
  transpilePackages: ["@shared/ui"],
  typescript: {
    // TODO: turn this off once we get things more stable
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
