const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };
    
    const remotes = {
      dashboard: "dashboard@http://localhost:3001/remoteEntry.js",
      sidebar: "sidebar@http://localhost:3002/remoteEntry.js",
      transactions: "transactions@http://localhost:3003/remoteEntry.js",
      "addTransaction": "addTransaction@http://localhost:3004/remoteEntry.js",
      profile: "profile@http://localhost:3005/remoteEntry.js",
      designSystem: "designSystem@http://localhost:4000/remoteEntry.js",
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