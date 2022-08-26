/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["a0.muscache.com"],
  },
  swcMinify: true,
}

module.exports = nextConfig
