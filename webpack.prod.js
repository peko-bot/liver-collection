const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TohoLogPlugin = require("toho-log-plugin");
const { commonModule, commonPlugin } = require("./webpack.common");

const dev = !!process.argv.includes("development");

let plugins = commonPlugin;

plugins.push(
  new CopyWebpackPlugin([
    {
      from: __dirname + "/src/assets",
      to: __dirname + "/dist/assets"
    },
    {
      from: __dirname + "/manifest.json",
      to: __dirname + "/dist",
      force: true
    },
    {
      from: __dirname + "/contentScript/css",
      to: __dirname + "/dist/assets/contentScript"
    }
  ])
);

plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

plugins.push(new TohoLogPlugin({ dev, isPray: false, defaultWords: true }));

dev &&
  plugins.push(
    new CleanWebpackPlugin(["dist"], {
      exclude: ["mainifest.json"], // 如果不加这个，在rebuild时，不会再复制json到dist中
      verbose: false
    })
  );

!dev &&
  plugins.push(
    new CleanWebpackPlugin(["dist"], {
      verbose: false
    })
  );

const options = {
  mode: dev ? "development" : "production",
  // watch: dev,
  devServer: {
    port: 9099
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: dev ? "source-map" : "",
  entry: {
    background: __dirname + "/background",
    contentScript: __dirname + "/contentScript",
    popup: __dirname + "/src",
    inject: __dirname + "/inject"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    chunkFilename: dev ? "vendor/[name].[chunkHash:8].js" : "vendor/[name].js"
  },
  plugins,
  module: commonModule
};

dev && webpack(options).watch({}, () => {});

!dev && webpack(options).run();
