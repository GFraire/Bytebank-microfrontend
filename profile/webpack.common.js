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
      name: "profile",
      filename: "remoteEntry.js",
      remotes: {
        designSystem: process.env.NODE_ENV === 'production'
          ? "designSystem@https://design-system-g9.vercel.app/remoteEntry.js"
          : "designSystem@http://localhost:4000/remoteEntry.js",
      },
      exposes: {
        './Profile': './src/bootstrap',
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
