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
  },
}

module.exports = nextConfig
