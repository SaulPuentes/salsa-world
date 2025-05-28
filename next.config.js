import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin';

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const baseConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        protocol: 'https',
        hostname: 'pivlx898shytlnox.public.blob.vercel-storage.com',
        pathname: '/media/**', // Adjust this to be as specific or broad as needed
      },
    ],
  },
  reactStrictMode: true,
  redirects,
}

const withNextIntl = createNextIntlPlugin()

const withPlugins = (config) => withPayload(withNextIntl(config))

export default withPlugins(baseConfig)