const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: "http://localhost:3001/",
    filename: "[name].js",
  },
  devServer: {
    port: 3001,
    historyApiFallback: { index: "index.html" },
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  devtool: "eval-source-map",
});
