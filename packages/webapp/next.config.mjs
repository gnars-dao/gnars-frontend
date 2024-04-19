/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.module = {
      ...config.module,
      exprContextCritical: false,
    }
    // wagmi ssr fallback
    // config.resolve.fallback = { fs: false, net: false, tls: false };
    return config
  },
  redirects: async () => [
    {
      source: "/dao/proposals",
      destination: "/dao",
      permanent: false,
    },
  ],
}

export default nextConfig
