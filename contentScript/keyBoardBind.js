/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-21 08:21:53
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-21 10:21:33
 */
import { dispatchContentScriptToInject } from '../util/Request';

const beforeEntryScene = () => {
	// 获得ap下限
	chrome.extension.sendMessage({ message: 'get_ap_limit' }, response => {
		const { limit, href } = response;

		const url = '/user/status';

		// 获得当前状态
		// 如果跳转地址为空，则不执行
		href && dispatchContentScriptToInject({ message: 'get_status', url, data: { limit } });
	});
};

const entryScene = () => {
	// 获得跳转地址
	chrome.extension.sendMessage({ message: 'get_scene_href' }, response => {
		const { href } = response;

		location.href = href;
	});
};

module.exports = { beforeEntryScene, entryScene };