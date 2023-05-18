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
}

module.exports = nextConfig
