/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        // pathname: "/articles/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        // pathname: "/articles/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // pathname: "/articles/**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
