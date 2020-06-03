const path = require("path");

const resolve = (dir) => path.join(__dirname, dir);
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  publicPath: "./",
  devServer: {
    port: 9700,
    open: true,
    https: false,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
  },
  productionSourceMap: false,
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/common/css/common.scss";`,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new StylelintPlugin({
        configFile: "./stylelint.config.js",
        files: ["src/**/*.vue", "src/**/*.s?css"],
      }),
    ],
  },
};
