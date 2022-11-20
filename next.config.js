/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'experimental-edge',
  },
  reactStrictMode: true,
  swcMinify: true,
  env:{
    TOKEN : process.env.TOKEN
  }
}

module.exports = nextConfig
