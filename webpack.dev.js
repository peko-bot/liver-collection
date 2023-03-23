const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const path = require("path");
const TohoLogPlugin = require("toho-log-plugin");
const { commonModule, commonPlugin } = require("./webpack.common");

let plugins = commonPlugin;

plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NamedModulesPlugin());
plugins.push(
  new TohoLogPlugin({ dev: true, isPray: false, defaultWords: true })
);

const devServerOptions = {
  port: 9099,
  hot: true,
  host: "localhost",
  noInfo: true,
  clientLogLevel: "error",
  contentBase: path.join(__dirname, "src")
};

const webpackConfig = {
  mode: "development",
  watch: false,
  devtool: "source-map",
  entry: [
    // 'react-hot-loader/patch',
    "webpack-dev-server/client?http://" +
      devServerOptions.host +
      ":" +
      devServerOptions.port,
    "webpack/hot/only-dev-server",
    __dirname + "/src"
  ],
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "vendor/[name].[hash].js"
  },
  plugins,
  module: commonModule
};

const compiler = webpack(webpackConfig);

const server = new webpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host);
