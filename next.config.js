

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['localhost'] },
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig