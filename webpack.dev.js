/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 13:48:08 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-17 17:36:00
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { logInfo } = require('./webpack.common');

let plugins = [
    new HtmlWebpackPlugin({ // 生成html
        template: './src/index.html',
        hash: true,
        minify: {
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            collapseWhitespace: true,
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
];

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

// const compiler = webpack(webpackConfig, (err, stats) => logInfo(err, stats, true));
const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host, () => {
    // log('Starting server on http://' + devServerOptions.host + ':' + devServerOptions.port);
});