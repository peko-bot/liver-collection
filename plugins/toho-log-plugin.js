/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-17 21:44:44 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-17 21:46:00
 */
class TohoLogPlugin {
    apply(compiler) {
        compiler.plugin('compile', compilation => {
            console.log('compile');
        });
    }
}

module.exports = TohoLogPlugin;