const {
  VERCEL_ENV = 'development',
  VERCEL_URL = 'localhost',
  PORT = process.env.PORT || 3000
} = process.env

let GRAPHQL_API

switch (VERCEL_ENV) {
  case "preview":
    GRAPHQL_API = `https://${VERCEL_URL}/api/graphql`;
    break;
  case "production":
    GRAPHQL_API = `https://gnars.wtf/api/graphql`;
    break;
  default:
    GRAPHQL_API = `http://localhost:${PORT}/api/graphql`;
    break;
}
/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  env: {
    GRAPHQL_API,
  },
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