const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const remotes = require('./remotes');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };
    
    config.plugins.push(
      new NextFederationPlugin({
        name: 'main',
        remotes: {
          designSystem: remotes.designSystem,
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
        // exposes: {
        //   './footer': './components/Footer.js',
        //   './nav': './components/Nav.js'
        // }
      })
    );
    return config;
  }
}

module.exports = nextConfig
