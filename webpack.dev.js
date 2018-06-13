/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 13:48:08 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-13 16:03:42
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const chalk = require('chalk');

const log = text => console.log(chalk.greenBright(text));
const error = text => console.log(chalk.red(text));
const warn = text => console.log(chalk.yellowBright(text)); 

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
];

const devServerOptions = {
    port: 9099,
    hot: true,
    host: 'localhost',
    // watchContentBase: true,
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

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host, () => {
    log('Starting server on http://' + devServerOptions.host + ':' + devServerOptions.port);
});