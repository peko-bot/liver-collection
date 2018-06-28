/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-28 22:12:11
 */
import Store from '../util/Store'
import * as Request from '../util/Request'
import options from './options'

// 初始化默认配置
const local = new Store('options');

// 如果localStorage已经有了配置，那合并
const oldStorage = local.toObject();
local.fromObject(Object.assign({}, options, oldStorage));

const zoom = local.get('zoom');

window.store = local;

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    const { message, zoom, search } = response;
    let tasks = { error: '', tasks: '' };

    switch(message) {
        case 'init_coopraid_listener': // 开启共斗搜索
            roomObserve(search);
        break;

        case 'close_coopraid_listener':

        break;

        case 'get_zoom':
            tasks = Object.assign(tasks, { zoom: local.get('zoom') });
        break;

        default:
        
        break;
    }

    sendResponse(tasks);
});