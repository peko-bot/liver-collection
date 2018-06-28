/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-28 17:30:14
 */
import { setZoom, initStyles } from './style'
import { observer, roomObserve, roomObserveBreaker } from './coopraid'
// import contextMenus from './contextMenus'

// 修改全局样式
initStyles();

// 右键菜单
// contextMenus();

import Store from '../util/Store'
import options from './options'

// 初始化默认配置
const local = new Store('options');

// 如果localStorage已经有了配置，那合并
const oldStorage = local.toObject();
local.fromObject(Object.assign({}, options, oldStorage));

// window.store = { local };
setZoom(local.get('zoom'));

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
            setZoom(zoom);

            local.set('zoom', zoom);
        break;

        case 'get_zoom':
            tasks.zoom = local.get('zoom');
        break;

        default:
        
        break;
    }

    console.log(tasks)
    sendResponse({ tasks });
});