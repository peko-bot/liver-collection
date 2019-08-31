/*
 * @Author: zy9@github.com/orzyyyy
 * @Date: 2018-07-21 08:21:53
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-31 14:09:41
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

const bindKeyBoardListener = () => {
	// 获得键盘监听状态
	chrome.extension.sendMessage({ message: 'get_key_board_listener_status' }, response => {
		const { status } = response;

		window.onkeydown = e => status ? listener(e) : null;
	});
};

const listener = e => {
	const { keyCode } = e;

	switch(keyCode) {
		case 70: // F键刷新页面
			location.reload();
			break;

		case 68: // D键进标签房顺带检查状态及吃药
			beforeEntryScene();
			break;

		default:
			break;
	}
};

export { beforeEntryScene, entryScene, bindKeyBoardListener };