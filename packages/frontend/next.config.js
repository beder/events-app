/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: new URL(process.env.IMAGES_BASE_URL).protocol.replace(':', ''),
        hostname: new URL(process.env.IMAGES_BASE_URL).hostname,
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
