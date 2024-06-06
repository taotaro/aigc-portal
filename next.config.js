/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    env: {
        WORKBENCH: process.env.WORKBENCH,
        EXAPAY_API_URL: process.env.EXAPAY_API_URL,
        WALLET_CONNECT_API_KEY: process.env.WALLET_CONNECT_API_KEY
    },
    webpack: config => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
    // async redirects() {
    //     return [{
    //         source: '/',
    //         destination: '/dashboard',
    //         permanent: true,
    //     }];
    // },
    // rewrites: () => {
    //     return [
    //         {
    //             source: "/jsapi",
    //             destination: process.env.EXAPAY_API_URL,
    //         },
    //     ];
    // }
};

module.exports = nextConfig;