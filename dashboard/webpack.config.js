const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  output: {
    publicPath: 'http://localhost:3001/',
    filename: '[name].js',
  },
  devServer: {
    port: 3001,
    historyApiFallback: { index: 'index.html' },
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        './Dashboard': './src/bootstrap',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
