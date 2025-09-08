const nextTranslate = require("next-translate");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 配置全局重定向到阿里云通义千问
  async redirects() {
    return [
      {
        source: '/(.*)',
        destination: 'https://alibabacloudtongyi.com/',
        permanent: false,
      },
    ];
  },
};

// module.exports = nextConfig
module.exports = nextTranslate({
  ...nextConfig,
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
  // experimental: {
  //   forceSwcTransforms: true,
  // }
});
