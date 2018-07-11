/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-11 16:24:11
 */
import { local } from './initLocalStorage'
import { init_user_id } from './user'
import { init_input_for_battle, get_battle_room_href, handle_board_post } from './battleCheck'

window.store = local;

init_user_id(local);

// 舔婊模式开启时，令popup点击失效
chrome.browserAction.setPopup({ popup: local.get('is_multil') ? '' : 'index.html' });

init_input_for_battle();
get_battle_room_href(local.get('userId'));

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    const { message, zoom, search, url } = response;
    let tasks = { error: '', tasks: '' };

    switch(message) {
        case 'get_zoom':
            tasks = Object.assign(tasks, { zoom: local.get('zoom') });
        break;

        case 'get_search':
            tasks = Object.assign(tasks, { search: local.get('search') });
        break;

        case 'get_sider_options':
            tasks = Object.assign(tasks, { left: local.get('is_left_sider_show'), right: local.get('is_right_sider_show') });
        break;

        case 'get_scroll_options':
            tasks = Object.assign(tasks, { status: local.get('is_scroll_style_show') });
        break;

        case 'battle_room_href': // 用于跳转地址
            chrome.tabs.update(sender.tab.id, { url: 'http://game.granbluefantasy.jp' + url });
        break;

        case 'get_user_id':
            tasks = Object.assign(tasks, { user_id: local.get('userId') });
        break;

        case 'redo_battle_room_href_check': // 吃药成功后，重新执行进入房间的方法
            handle_board_post(local.get('userId'));
        break;

        default:
        
        break;
    }

    sendResponse(tasks);
});