/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-17 17:23:54 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-17 21:47:13
 */
const chalk = require('chalk');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const tohoLogPlugin = require('./plugins/toho-log-plugin');

const log = text => console.log(chalk.greenBright(text));
const error = text => console.log(chalk.red(text));
const warn = text => console.log(chalk.yellowBright(text));
const info = text => console.log(chalk.cyanBright(text));

let successCount = 0;

module.exports = {
    log, error, warn, info,
    logInfo: (err, stats, dev) => {
        if (err) {
            error(err.stack || err);
    
            if (err.details) {
                error(err.details);
            }
            
            return;
        }
        
        const info = stats.toJson();
    
        if (stats.hasErrors()) {
            for(let item of info.errors) {
                error(item);
            }
    
            error('\n  少女以为能神穿，但缠在腰间的香火钱太多，戳之，卒 (°□°；) \n');
    
            return;
        }
    
        if (stats.hasWarnings()) {
            for(let item of info.warnings) {
                warn(item);
            }
    
            if(!dev) {
                warn('\n  虽然有些烦恼，但少女还是去和风车战斗了 ╮(╯_╰)╭\n');
    
                return;
            }
        }
    
        if(!dev) {
            log('  少女去寻找自己的诗和远方了 ╮(╯_╰)╭');
    
            return;
        }
    
        log(`♪(^∇^*)♪(^∇^*)♪(^∇^*) 少女第${ ++successCount }次捡到钱了 ♪(^∇^*)♪(^∇^*)♪(^∇^*)`);
    },
    commonModule: {
        rules: [
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
        ]
    },
    commonPlugin: [
        new htmlWebpackPlugin({ // 生成html
            template: './src/index.html',
            hash: true,
            minify: {
                minifyJS: true,
                minifyCSS: true,
                removeComments: true,
                collapseWhitespace: true,
            }
        }),
        // new tohoLogPlugin(),
    ]
}