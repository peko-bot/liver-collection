/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-08 09:26:10 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-12 16:04:05
 */
import { dispatch_inject_to_content_script } from '../util/Request'

document.getElementById('init_window').addEventListener('content_script_to_inject', e => {
    const { message, data, url } = e.detail;

    switch(message) {
        case 'get_battle_room_href':
            $.ajax({
                url,
                data,
                cache: false,
                global: false,
                dataType: 'json',
                method: 'POST',
                success: result => {
                    const { redirect, current_battle_point, battle_point_check, used_battle_point, popup } = result;

                    // 如果豆够，直接进房间
                    if(redirect) {
                        dispatch_inject_to_content_script({ message: 'get_battle_room_href', url: redirect });
                    }

                    // 进入异常
                    if(popup) {
                        dispatch_inject_to_content_script({ message: 'notify_error', data: popup.body ? popup.body : '未知错误' });
                    }

                    // 如果豆不够
                    if(typeof current_battle_point === 'number' && !battle_point_check) {
                        let count = used_battle_point - current_battle_point;

                        if(count <= 0) {
                            count = 5;
                        }
                        
                        dispatch_inject_to_content_script({ message: 'to_use_bp', count });
                    }
                }
            });
        break;

        case 'to_use_bp': // 吃药
            $.ajax({
                url,
                data,
                cache: false,
                global: false,
                dataType: 'json',
                method: 'POST',
                success: result => {
                    const { use_flag } = result;
                    
                    dispatch_inject_to_content_script({ message: 'do_use_bp' });
                }
            });
        break;
    }
});