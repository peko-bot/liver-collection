/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-22 22:45:34
 */
import { setZoom, initStyles } from './style'
import { observer, roomObserve, roomObserveBreaker } from './coopraid'
// import contextMenus from './contextMenus'

// 修改全局样式
initStyles();

// 右键菜单
// contextMenus();

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    const { message, zoom, search } = response;
    let tasks = { error: '', tasks: '' };

    switch(message) {
        case 'init_coopraid_listener': // 开启共斗搜索
            roomObserve(search);
        break;

        case 'close_coopraid_listener':

        break;

        case 'set_zoom':
            console.log(zoom)
            setZoom(zoom);
        break;

        default:
        
        break;
    }

    sendResponse({ tasks });
});