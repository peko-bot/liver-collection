/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 13:48:08 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-09 22:28:47
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = './dist/';
const dev = process.argv.includes('development') ? true : false;

let plugins = [
    new HtmlWebpackPlugin({ // 生成html
        template: './src/index.html',
        chunks: ['popup'],
        hash: true,
        minify: {
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            collapseWhitespace: true,
        }
    }),
    new CopyWebpackPlugin([
        {
            from: __dirname + '/src/assets',
            to: __dirname + '/dist/assets'
        },
        {
            from: __dirname + '/manifest.json',
            to: __dirname + '/dist'
        },
        {
            from: __dirname + '/contentScript/css',
            to: __dirname + '/dist/assets/contentScript'
        }
    ]),
    // new MiniCssExtractPlugin({
    //     filename: dev ? '[name].[chunkHash:8].css' : '[name].css',
    //     chunkFilename: '[id].[chunkHash:8].css'
    // })
];

!dev && plugins.push(new CleanWebpackPlugin(['dist']));

dev && plugins.push(new WebpackOnBuildPlugin(stats => { // 删除dist下原有文件
    const newlyCreatedAssets = stats.compilation.assets;

    fs.readdir(path.resolve(buildPath), (err, files) => {
        files && files.forEach(file => {
            if (!newlyCreatedAssets[file]) {
                fs.unlink(path.resolve(buildPath + file), () => { });
            }
        });
    })
}));

module.exports = {
    devServer: {
        port: 9099
    },
    stats: {
        assets: false,
        entrypoints: false,
        modules: false,
        warnings: dev
    },
    devtool: dev ? 'source-map' : '',
    entry: {
        popup: __dirname + '/src/main.js',
        contentScript: __dirname + '/contentScript',
        background: __dirname + '/background'
    },
    output: {
        path: __dirname + '/dist',
        filename: dev ? '[name].[chunkHash:8].js' : '[name].js',
        chunkFilename: dev ? 'vendor/[name].[chunkHash:8].js' : 'vendor/[name].js'
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // MiniCssExtractPlugin.loader,
            }
        ]
    }
};