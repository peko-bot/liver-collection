/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 13:48:08 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-17 17:53:52
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { logInfo, commonModule, commonPlugin } = require('./webpack.common');

let plugins = commonPlugin;

plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NamedModulesPlugin());

const devServerOptions = {
    port: 9099,
    hot: true,
    host: 'localhost',
    // noInfo: true,
    stats: 'errors-only',
    clientLogLevel: 'error'
};

const webpackConfig = {
    mode: 'development',
    watch: false,
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + devServerOptions.host + ':' + devServerOptions.port,
        'webpack/hot/only-dev-server',
        __dirname + '/src',
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: 'vendor/[name].[hash].js',
    },
    plugins,
    module: commonModule
};

// const compiler = webpack(webpackConfig, (err, stats) => logInfo(err, stats, true));
const compiler = webpack(webpackConfig);

const server = new webpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host, () => {
    // log('Starting server on http://' + devServerOptions.host + ':' + devServerOptions.port);
});