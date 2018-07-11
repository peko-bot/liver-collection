/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-04 21:49:54 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-11 16:13:01
 */
// http://game.granbluefantasy.jp
const get_battle_room_href = (battle_id, user_id) => {
    const body = { special_token: null, battle_key: battle_id };
    // const url = `/quest/battle_key_check?t=${ new Date().getTime() }&uid=${ user_id }`;
    const url = `/quest/battle_key_check`;

    document.getElementById('init_window').dispatchEvent(new CustomEvent('content_script_to_inject', { detail: { message: 'get_battle_room_href', data: JSON.stringify(body), url } }));
}

const use_bp = count => {
    chrome.extension.sendMessage({ message: 'get_user_id' }, response => {
        const { user_id } = response;

        const body = { special_token: null, num: count, item_id: '5' };
        // const url = `/item/use_normal_item?t=${ new Date().getTime() }&uid=${ user_id }`;
        const url = `/item/use_normal_item`;
    
        document.getElementById('init_window').dispatchEvent(new CustomEvent('content_script_to_inject', { detail: { message: 'to_use_bp', data: JSON.stringify(body), url } }));
    });
}

module.exports = { get_battle_room_href, use_bp }