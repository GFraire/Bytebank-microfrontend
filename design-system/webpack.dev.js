const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: "http://localhost:4000/",
    filename: "[name].js",
  },
  devServer: {
    port: 4000,
    historyApiFallback: { index: "index.html" },
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  devtool: "eval-source-map",
});
