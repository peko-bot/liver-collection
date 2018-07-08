/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-04 21:49:54 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-08 21:30:22
 */
// http://game.granbluefantasy.jp
const get_battle_room_href = (battle_id, user_id, $) => {
    const body = { special_token: null, battle_key: battle_id };
    const url = `/quest/battle_key_check?t=${ new Date().getTime() }&uid=${ user_id }`;

    const options = {
        data: JSON.stringify(body),
        cache: false,
        global: false,
        method: 'POST',
        success: result => {
            const { redirect, current_battle_point, battle_point_check, used_battle_point } = result;

            // 如果豆够，直接进房间
            if(redirect) {
                window.location.href = redirect;
            }

            // 如果豆不够
            if(typeof current_battle_point === 'number' && !battle_point_check) {
                let count = used_battle_point - current_battle_point;

                if(count <= 0) {
                    count = 5;
                }
                
                // 吃药
                // use_bp(count, user_id, result => get_battle_room_href(battle_id, user_id));
            }
        }
    };

    let dom = document.getElementById('init_window').textContent;
    let ajax = eval(`(${ dom })`);
    console.dir(ajax)
    ajax(url, options);

    // $.ajax(url, options);
    // post_by_cookie(url, { body: JSON.stringify(body) }, result => {
    //     const { redirect, current_battle_point, battle_point_check, used_battle_point } = JSON.stringify(result);

    //     // 如果豆够，直接进房间
    //     if(redirect) {
    //         console.log(redirect)
    //         window.location.href = redirect;
    //     }

    //     // 如果豆不够
    //     if(typeof current_battle_point === 'number' && !battle_point_check) {
    //         let count = used_battle_point - current_battle_point;

    //         if(count <= 0) {
    //             count = 5;
    //         }
            
    //         // 吃药
    //         use_bp(count, user_id, result => get_battle_room_href(battle_id, user_id));
    //     }
    // });
}

const use_bp = (use_count, user_id, callback) => {
    const body = { special_token: null, num: use_count, item_id: '5' };
    const url = `/quest/use_normal_item?t=${ new Date().getTime() }&uid=${ user_id }`;

    // $.ajax(url, {
    //     data: JSON.stringify(body),
    //     method: 'POST',
    //     cache: false,
    //     global: false,
    //     success: result => callback(result)
    // });

    post_by_cookie(url, { body: JSON.stringify(body) }, result => callback(result));
}

module.exports = { get_battle_room_href }