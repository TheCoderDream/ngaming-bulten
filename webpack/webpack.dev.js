const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = (env, argv) =>
  merge(common(env, { ...argv, mode: "development" }), {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "../public"),
      },
      historyApiFallback: true,
      hot: true,
      port: 3000,
      open: true,
    },
  });
