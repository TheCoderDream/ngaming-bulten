const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = (env, argv) =>
  merge(common(env, { ...argv, mode: "production" }), {
    mode: "production",
    devtool: "hidden-source-map",
  });
