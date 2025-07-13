const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: "http://localhost:3003/",
    filename: "[name].js",
  },
  devServer: {
    port: 3003,
    historyApiFallback: { index: "index.html" },
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  devtool: "eval-source-map",
});
