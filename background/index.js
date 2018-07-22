/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-22 10:16:13
 */
import { local } from './initLocalStorage';
import { initUserId } from './user';
import { initInputForBattle, getBattleRoomHref, handleBoardPost } from './battleCheck';
import { initGacha } from './gachaBanner';
import { sendToOption } from './checkHomework';

window.store = local;

initUserId(local);

// local.set('isEunuch', false);

// 舔婊模式开启时，令popup点击失效
chrome.browserAction.setPopup({ popup: local.get('isMultil') ? '' : 'index.html' });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const { url } = tab;

	if(url.includes('gacha')) { // 禁用抽卡
		initGacha(tab.url, local.get('isEunuch'));
	}
});

// 初始化舔婊配置
initInputForBattle();
getBattleRoomHref(local.get('isListenBoard'));

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
	const { message, zoom, search, url, data, error } = response;
	let tasks = { error: '', tasks: '' };

	switch(message) {
		case 'get_zoom':
			tasks = Object.assign(tasks, { zoom: local.get('zoom') });
			break;

		case 'get_search':
			tasks = Object.assign(tasks, { search: local.get('search') });
			break;

		case 'get_sider_options':
			tasks = Object.assign(tasks, { left: local.get('isLeftSiderShow'), right: local.get('isRightSiderShow') });
			break;

		case 'get_scroll_options':
			tasks = Object.assign(tasks, { status: local.get('isScrollStyleShow') });
			break;

		case 'battle_room_href': // 用于跳转地址
			chrome.tabs.update(sender.tab.id, { url: 'http://game.granbluefantasy.jp' + url });
			break;

		case 'get_userId':
			tasks = Object.assign(tasks, { userId: local.get('userId') });
			break;

		case 'redo_battle_room_href_check': // 吃药成功后，重新执行进入房间的方法
			handleBoardPost(local.get('userId'));
			break;

		case 'notify_error':
			chrome.notifications.create({
				type: 'basic',
				iconUrl: './assets/img/54878633_p0.png',
				title: '进房异常',
				message: data
			});
			break;

		case 'isEunuch':
			tasks = Object.assign(tasks, { status: local.get('isEunuch') });
			break;

		case 'listenClipBoardBattleCheck':
			getBattleRoomHref(local.get('isListenBoard'));
			break;

		case 'do_getMemberId':
			sendToOption(data);
			break;

		case 'get_ap_limit':
			tasks = Object.assign(tasks, { limit: local.get('entrySceneApLowerLimit'), href: local.get('sceneHref') });
			break;

		case 'get_scene_href':
			tasks = Object.assign(tasks, { href: local.get('sceneHref') });
			break;

		case 'inject_ajax_error':
			chrome.notifications.create({
				type: 'basic',
				iconUrl: './assets/img/54878633_p0.png',
				title: 'ajax未知异常',
				message: error
			});
			break;

		default:

			break;
	}

	sendResponse(tasks);
});