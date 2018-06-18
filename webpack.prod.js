/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 13:48:08 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-18 20:47:52
 */
const webpack = require('webpack');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const WebpackOnBuildPlugin = require('on-build-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TohoLogPlugin = require('./plugins/toho-log-plugin');
const path = require('path');
const { logInfo, commonModule, commonPlugin, log, onCompile } = require('./webpack.common');

const buildPath = __dirname + '/dist/';
const dev = process.argv.includes('development') ? true : false;

let plugins = commonPlugin;

plugins.push(
    new CopyWebpackPlugin([
        {
            from: __dirname + '/src/assets',
            to: __dirname + '/dist/assets'
        },
        {
            from: __dirname + '/manifest.json',
            to: __dirname + '/dist',
            force: true
        },
        {
            from: __dirname + '/contentScript/css',
            to: __dirname + '/dist/assets/contentScript'
        }
    ])
);

// plugins.push(new TohoLogPlugin());

dev && plugins.push(new CleanWebpackPlugin(['dist'], {
    exclude: ['mainifest.json'], // 如果不加这个，在rebuild时，不会再复制json到dist中
    verbose: false
}));

!dev && plugins.push(new CleanWebpackPlugin(['dist'], {
    verbose: false
}));

const options = {
    mode: dev ? 'development' : 'production',
    // watch: dev,
    devServer: {
        port: 9099
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: dev ? 'source-map' : '',
    entry: {
        popup: __dirname + '/src',
        contentScript: __dirname + '/contentScript',
        background: __dirname + '/background'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        chunkFilename: dev ? 'vendor/[name].[chunkHash:8].js' : 'vendor/[name].js'
    },
    plugins,
    module: commonModule
}

// webpack(options)
const compiler = webpack(options);

onCompile(compiler);

dev && compiler.watch({}, (err, stats) => logInfo(err, stats, dev));

!dev && compiler.run((err, stats) => {
    logInfo(err, stats, dev);

    log('  铁血的热血的冷血的可笑的可悲的可爱的可敬的少女死去了，但好像又活了过来');
});