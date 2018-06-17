/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-17 21:44:44 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-17 22:41:46
 */
class TohoLogPlugin {
    constructor(config) {
        
    }

    apply(compiler) {
        const chalk = require('chalk');

        compiler.plugin('compile', compilation => {
            console.log(chalk.cyanBright('compile'));
        });
    }
}

module.exports = TohoLogPlugin;