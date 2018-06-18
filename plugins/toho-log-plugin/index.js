/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 20180617 21:44:44 
 * @Last Modified by: zy9
 * @Last Modified time: 20180617 22:41:46
 */
const { log, error, warn, info, logInfo } = require('./log');

class TohoLogPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compile.tap('tohoLog', () => {
            info('  少女祈祷中...');
        });

        compiler.watch({}, (err, stats) => logInfo(err, stats, true));
    }
}

module.exports = TohoLogPlugin; 