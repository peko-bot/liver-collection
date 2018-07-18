/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-17 22:07:09 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 11:34:52
 */
import { dispatchContentScriptToInject } from '../util/Request';

const getMemberId = () => {
	dispatchContentScriptToInject({ message: 'getMemberId', url: '/guild_main/guild_member_list/' });
};

module.exports = { getMemberId };