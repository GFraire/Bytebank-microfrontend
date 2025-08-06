const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  output: {
    publicPath: 'http://localhost:3002/',
    filename: '[name].js',
  },
  devServer: {
    port: 3002,
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
      name: "sidebar",
      filename: "remoteEntry.js",
      exposes: {
        './Sidebar': './src/bootstrap',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.REACT_APP_API_URL': JSON.stringify('http://localhost:3333'),
    })
  ],
};
