/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-04 21:49:54 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-04 22:48:53
 */
import { post_by_cookie } from '../util/Request'

const get_battle_room_href = (battle_id, user_id) => {
    const body = { special_token: null, battle_key: battle_id };
    const url = `http://game.granbluefantasy.jp/quest/battle_key_check?t=${ new Date().getTime() }&uid=${ user_id }`;

    post_by_cookie(url, { body: JSON.stringify(body) }, result => {
        const { redirect, current_battle_point, battle_point_check, used_battle_point } = result;

        // 如果豆够，直接进房间
        if(redirect) {
            window.location.href = redirect;
        }

        // 如果豆不够
        if(typeof current_battle_point === 'number' && !battle_point_check) {
            let count = battle_point_check - current_battle_point;

            if(count <= 0) {
                count = 5;
            }
            
            // 吃药
            user_bp(count, result => get_battle_room_href(battle_id, user_id));
        }
    });
}

const user_bp = (use_count, callback) => {
    const body = { special_token: null, battle_key: battle_id };
    const url = `http://game.granbluefantasy.jp/quest/use_normal_item?t=${ new Date().getTime() }&uid=${ user_id }`;

    post_by_cookie(url, { body: JSON.stringify(body) }, result => callback(result));
}

module.exports = { get_battle_room_href }