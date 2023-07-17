
const isProduction = process.env.NODE_ENV === "production"
const assetPrefix = isProduction ? "/wis-garden" : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  assetPrefix,
  basePath: assetPrefix,
}

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  // theme: './theme.tsx',
  // theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
  latex: true
})

module.exports = withNextra(nextConfig)
