/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.module = {
      ...config.module,
      exprContextCritical: false
    }

    return config
  },
  redirects: async () => [
    {
      source: "/dao/proposals",
      destination: "/dao",
      permanent: false
    },
    {
      source: "/dao/proposals/:id", // redirect any 3rd party legacy proposal links to layer 1
      destination: "/dao/proposals/eth/:id",
      permanent: false
    }
  ]
}

export default nextConfig
