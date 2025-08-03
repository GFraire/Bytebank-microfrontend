const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const remotes = require('./remotes');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = { topLevelAwait: true, layers: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'main',
        remotes: {
          dashboard: remotes.dashboard,
          sidebar: remotes.sidebar,
          transactions: remotes.transactions,
          addTransaction: remotes.addTransaction,
          profile: remotes.profile,
        },
        filename: 'static/chunks/remoteEntry.js',
        extraOptions: {
          exposePages: true,
          automaticAsyncBoundary: true,
        },
      })
    );
    return config;
  }
}

module.exports = nextConfig
