/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-08 11:15:23 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-30 15:14:46
 */
import { initStyles, initZoom, setZoom } from './style'
import { roomObserve, roomObserveBreaker, initRoomSearch, check_characters } from './coopraid'

// 修改全局样式
initStyles();
initZoom();

// 如果搜索过，自动应用搜索内容
initRoomSearch();

// 长连接监听统一写在这
chrome.runtime.onConnect.addListener(port => {
    const { name } = port;

    switch(name) {
        case 'popup_to_content':
            port.onMessage.addListener(response => {
                const { zoom, message, search } = response;
        
                switch(message) {
                    case 'set_zoom': // 用作Popup中拖动Slider时，实时改变窗口大小
                        setZoom(zoom);
                    break;

                    case 'open_coopraid_search': // 开启共斗搜索
                        roomObserve(search);
                    break;

                    case 'close_coopraid_search': // 关闭共斗搜索

                    break;

                    case 'check_ub_characters': // 检查超巴房队友天人情况
                        port.postMessage({ datas: check_characters() });
                    break;
                }
            });
        break;
    }
});