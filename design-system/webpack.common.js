const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: [
          path.resolve(__dirname, "src"),
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "designSystem",
      filename: "remoteEntry.js",
      exposes: {
        './styles': './src/index.ts'
      },
      shared: {
        react: { singleton: true, requiredVersion: '18.3.1', },
        "react-dom": { singleton: true, requiredVersion: '18.3.1', },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
