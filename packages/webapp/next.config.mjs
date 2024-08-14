const {
  VERCEL_ENV = 'development',
  VERCEL_URL = 'localhost'
} = process.env

let ROOT_URI

switch (VERCEL_ENV) {
  case "preview":
    ROOT_URI = `https://${VERCEL_URL}/api/graphql`;
    break;
  case "production":
    ROOT_URI = `https://gnars.wtf/api/graphql`;
    break;
  default:
    ROOT_URI = `http://localhost:3000/api/graphql`;
    break;
}
/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  env: {
    ROOT_URI,
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
