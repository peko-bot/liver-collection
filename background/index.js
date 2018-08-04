/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-04 23:36:45
 */
import { local } from './initLocalStorage';
import { initUserId } from './user';
import { initInputForBattle, getBattleRoomHref, handleBoardPost } from './battleCheck';
import { initGacha } from './gachaBanner';
import { sendToOption } from './checkHomework';
import { redoEntryScene } from './redoScene';

let timer;

window.store = local;

initUserId(local);

// local.set('isEunuch', false);

// 舔婊模式开启时，令popup点击失效
chrome.browserAction.setPopup({ popup: local.get('isMultil') ? '' : 'index.html' });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const { url, status } = tab;

	if(status == 'complete') {
		if(url.includes('gacha')) { // 禁用抽卡
			initGacha(tab.url, local.get('isEunuch'));
		} else if(url.includes('result')) {
			// 防止多次跳转导致的过度刷新
			if(!timer) {
				timer = setTimeout(() => {
					redoEntryScene(local.get('sceneHref'), local.get('entrySceneApLowerLimit'), local.get('isRedoEntryScene'));

					clearTimeout(timer);
					timer = null;
				}, 2000);
			}
		}
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
			handleBoardPost();
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
			// getBattleRoomHref(local.get('isListenBoard'));
			local.get('isListenBoard') && handleBoardPost();
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

		case 'get_key_board_listener_status':
			tasks = Object.assign(tasks, { status: local.get('isListenToKeyBoard') });
			break;

		case 'is_show_wife':
			tasks = Object.assign(tasks, { status: local.get('isShowYourWife') });
			break;

		default:

			break;
	}

	sendResponse(tasks);
});