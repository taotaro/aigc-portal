const nextTranslate = require('next-translate');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig
module.exports = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  }
})
