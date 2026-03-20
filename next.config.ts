import type { NextConfig } from 'next'

const REPOSWARM_API_URL = process.env.REPOSWARM_API_URL || 'http://reposwarm-api:3000'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  serverExternalPackages: [
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-codecommit'
  ],
  async rewrites() {
    return [
      {
        // Proxy /v1/* to the RepoSwarm API server.
        // In production this is handled by CloudFront; locally the UI container
        // proxies it so the browser's relative /v1/ calls reach the API.
        source: '/v1/:path*',
        destination: `${REPOSWARM_API_URL}/v1/:path*`
      }
    ]
  }
}

export default nextConfig
