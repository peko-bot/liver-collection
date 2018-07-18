/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-08 11:15:23 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-17 22:54:43
 */
import { initStyles, initZoom, setZoom, controlLeftSider, controlRightSider, removeEvent, initScrollHoverContainer } from './style';
import { roomObserve, roomObserveBreaker, initRoomSearch, check_characters, is_character_page, check_black_list } from './coopraid';
import { get_battle_room_href, use_bp, listen_clip_board_battle_check } from './battleCheck';
import { control_gacha, init_gacha } from './gachaBanner';
import { get_member_id } from './checkHomework';

const injectScript = file => {
	var th = document.getElementsByTagName('body')[0];

	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', file);

	let windowWraper = document.createElement('script');
	windowWraper.id = 'init_window';

	th.appendChild(s);
	th.appendChild(windowWraper);
};
injectScript(chrome.extension.getURL('/inject.js'));

// 修改全局样式
initStyles();
initZoom();

// 如果搜索过，自动应用搜索内容
initRoomSearch();

// 初始化抽卡页面
init_gacha();

// 初始化一键舔婊
if(location.href.includes('raidfinder')) {
	listen_clip_board_battle_check();
}

// 用作接收inject返回的值
document.getElementById('init_window').addEventListener('inject_to_content_script', e => {
	const { message, data, url, count } = e.detail;

	switch(message) {
	case 'get_battle_room_href': // 跳转地址的转发
		chrome.extension.sendMessage({ message: 'battle_room_href', url });
		break;

	case 'to_use_bp': // 获得吃药参数
		use_bp(count);
		break;

	case 'do_use_bp': // 吃完药了
		chrome.extension.sendMessage({ message: 'redo_battle_room_href_check' });
		break;

	case 'notify_error': // 进房异常处理
		chrome.extension.sendMessage({ message: 'notify_error', data });
		break;

	case 'do_get_member_id': // 获得团员id
		chrome.extension.sendMessage({ message: 'do_get_member_id', data });
		break;
	}
});

// 长连接监听统一写在这
chrome.runtime.onConnect.addListener(port => {
	const { name } = port;

	switch(name) {
	case 'popup_to_content':
		port.onMessage.addListener(response => {
			const { zoom, message, search, type, status, battleId, userId, event } = response;
        
			switch(message) {
			case 'set_zoom': // 用作Popup中拖动Slider时，实时改变窗口大小
				setZoom(zoom);
				break;

			case 'open_coopraid_search': // 开启共斗搜索
				roomObserve(search);
				break;

			case 'close_coopraid_search': // 关闭共斗搜索

				break;

			case 'is_character_page': // 检查是否人员页面
				port.postMessage({ flag: is_character_page() });
				break;

			case 'check_ub_characters': // 检查超巴房队友天人情况
				port.postMessage({ datas: check_characters() });
				break;

			case 'sider_status': // 控制左右面板显示
				type == 'is_left_sider_show' ? controlLeftSider(status): controlRightSider(status);
				break;

			case 'check_black_list': // 检查黑名单
				port.postMessage({ datas: check_characters() });
				break;

			case 'scroll_style_status': // 设置是否开启滚动条样式
				status ? initScrollHoverContainer() : removeEvent();
				break;

			case 'battle_key_check': // 根据battle id获得房间地址
				get_battle_room_href(battleId, userId);
				break;

			case 'to_be_a_eunuch': // 禁用抽卡
				control_gacha(status);
				break;

			case 'init_eunuch':
				init_gacha();
				break;

			case 'check_homework':
				get_member_id();
				break;
			}
		});
		break;
	}
});