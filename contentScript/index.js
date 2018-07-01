/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-08 11:15:23 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-01 12:23:10
 */
import { initStyles, initZoom, setZoom, controlLeftSider, controlRightSider } from './style'
import { roomObserve, roomObserveBreaker, initRoomSearch, check_characters, is_character_page, check_black_list } from './coopraid'

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
                const { zoom, message, search, type, status } = response;
        
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
                }
            });
        break;
    }
});