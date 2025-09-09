const nextTranslate = require("next-translate");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 配置全局重定向到阿里云通义千问
  async redirects() {
    return [
      // 重定向根路径
      {
        source: '/',
        destination: 'https://alibabacloudtongyi.com/',
        permanent: false,
      },
      // 重定向所有其他路径
      {
        source: '/:path*',
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
