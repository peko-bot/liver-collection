/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 13:48:08 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-05-20 15:16:41
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const WebpackOnBuildPlugin = require('on-build-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const buildPath = './dist/';

module.exports = {
  devServer: {
    port: 9099
  },
  devtool: 'source-map',
  entry: {
    Modules: './src/main.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'Popup.[chunkHash:8].js'
  },
  plugins: [
    new HtmlWebpackPlugin({ // 生成html
      template: './src/index.html'
    }),
    new WebpackOnBuildPlugin(stats => { // 删除dist下原有文件
      const newlyCreatedAssets = stats.compilation.assets;

      fs.readdir(path.resolve(buildPath), (err, files) => {
        files && files.forEach(file => {
          if (!newlyCreatedAssets[file]) {
            fs.unlink(path.resolve(buildPath + file), () => {});
          }
        });
      })
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/assets',
        to: __dirname + '/dist/assets'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      }, {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};