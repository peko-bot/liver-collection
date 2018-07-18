/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-17 22:07:09 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-17 22:15:00
 */
import { dispatch_content_script_to_inject } from '../util/Request';

const get_member_id = () => {
	dispatch_content_script_to_inject({ message: 'get_member_id', url: '/guild_main/guild_member_list/' });
};

module.exports = { get_member_id };