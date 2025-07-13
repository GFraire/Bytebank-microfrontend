const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };
    const BASE_URL = 'https://bytebank-'
    const BASE_URL_END = '-grupo-9-fiapinhos-projects.vercel.app/remoteEntry.js'
    // URLs de produção dos micro frontends no Vercel
    const remotes = {
      dashboard: `dashboard@${BASE_URL}dashboard-pprfovgb6${BASE_URL_END}`,
      sidebar: `sidebar@${BASE_URL}sidebar-kwclcppi9${BASE_URL_END}`, 
      transactions: `transactions@${BASE_URL}sidebar-kwclcppi9${BASE_URL_END}`,
      addTransaction: `addTransaction@${BASE_URL}add-transaction-ot5r2p8qh${BASE_URL_END}`,
      profile: `profile@${BASE_URL}profile-di1oy2tol${BASE_URL_END}`,
    };

    config.plugins.push(
      new NextFederationPlugin({
        name: 'main',
        remotes,
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