/** @type {
  compiler: { removeConsole: true },import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
};
module.exports = nextConfig;
