/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 13:48:08 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-17 17:51:10
 */
const webpack = require('webpack');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const WebpackOnBuildPlugin = require('on-build-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { logInfo, commonModule, commonPlugin } = require('./webpack.common');

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

dev && plugins.push(new CleanWebpackPlugin(['dist'], {
    exclude: ['mainifest.json'],
    verbose: false
}));

!dev && plugins.push(new CleanWebpackPlugin(['dist'], {
    verbose: false
}));

const options = {
    mode: dev ? 'development' : 'production',
    watch: dev,
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

webpack(options, (err, stats) => logInfo(err, stats, dev));