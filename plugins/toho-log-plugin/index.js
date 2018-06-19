/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-17 21:44:44 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-19 21:35:16
 */
const { log, error, warn, info, logInfo } = require('./log');

class TohoLogPlugin {
    constructor(options) {
        this.options = options;
    }

    /* 编不出好玩的故事，这些hooks只能搁浅了... */
    apply(compiler) {
        const { dev } = this.options;

        compiler.hooks.entryOption.tap('log', () => {
            
        });

        compiler.hooks.watchRun.tap('log', () => {
            info('  少女祈祷中...');
        });

        compiler.hooks.failed.tap('log', err => {
            logInfo(err, undefined, dev);
        })

        compiler.hooks.done.tap('log', stats => {
            logInfo(undefined, stats, dev);
        });
    }
}

module.exports = TohoLogPlugin;