/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-30 13:53:17
 */
import Store from '../util/Store'
import * as Request from '../util/Request'
import options from './options'

import { init_user_id } from './user'

// 初始化默认配置
const local = new Store('options');

// 如果localStorage已经有了配置，那合并
const oldStorage = local.toObject();
local.fromObject(Object.assign({}, options, oldStorage));

const zoom = local.get('zoom');

window.store = local;

init_user_id(local);

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    const { message, zoom, search } = response;
    let tasks = { error: '', tasks: '' };

    switch(message) {
        case 'get_zoom':
            tasks = Object.assign(tasks, { zoom: local.get('zoom') });
        break;

        case 'get_search':
            tasks = Object.assign(tasks, { search: local.get('search') });
        break;

        default:
        
        break;
    }

    sendResponse(tasks);
});