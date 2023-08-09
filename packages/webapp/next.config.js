/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.module = {
      ...config.module,
      exprContextCritical: false,
    }

    return config
  },
  images: {
    remotePatterns: [
      {
        hostname: "api.zora.co",
      },
    ],
    formats: [],
  },
}

module.exports = nextConfig
