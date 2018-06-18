/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-18 13:43:52 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-18 13:44:35
 */
const chalk = require('chalk');

const log = text => console.log(chalk.greenBright(text));
const error = text => console.log(chalk.red(text));
const warn = text => console.log(chalk.yellowBright(text));
const info = text => console.log(chalk.cyanBright(text));

const logInfo = (err, stats, dev) => {
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
}

module.exports = { log, error, warn, info, logInfo };