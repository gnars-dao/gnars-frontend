import { fileURLToPath } from "node:url"
import createJiti from "jiti"

const jiti = createJiti(fileURLToPath(import.meta.url))

// Import server env to validate during build
jiti("./env/server")

/**
 * @type {import("next").NextConfig}
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
      permanent: true
    },
    {
      source: "/dao/proposals/:id", // redirect any 3rd party legacy proposal links to layer 1
      destination: "/dao/proposals/eth/:id",
      permanent: true
    }
  ]
}

export default nextConfig
