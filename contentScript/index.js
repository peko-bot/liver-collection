/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-08 11:15:23 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-29 16:27:20
 */
import { initStyles, initZoom, setZoom } from './style'
import { observer, roomObserve, roomObserveBreaker } from './coopraid'

// 修改全局样式
initStyles();
initZoom();

// 长连接监听统一写在这
chrome.runtime.onConnect.addListener(port => {
    const { name } = port;

    switch(name) {
        case 'zoom_connect':
            port.onMessage.addListener(response => {
                const { zoom, message, search } = response;
        
                switch(message) {
                    case 'set_zoom': // 用作Popup中拖动Slider时，实时改变窗口大小
                        setZoom(zoom);
                    break;

                    case 'init_coopraid_listener': // 开启共斗搜索
                        roomObserve(search);
                    break;

                    case 'close_coopraid_listener':

                    break;
                }
            });
        break;
    }
});