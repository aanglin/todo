const { GenerateSW } = require("workbox-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new GenerateSW({
          swDest: "static/service-worker.js",
          exclude: [
            /\.map$/,
            /_app\.js$/,
            /_document\.js$/,
            /_error\.js$/,
            /server\.js$/,
            /chunk\-pages\-manifest\.json$/,
          ],
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: "NetworkFirst",
              options: {
                cacheName: "offlineCache",
                expiration: {
                  maxEntries: 200,
                },
              },
            },
          ],
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
