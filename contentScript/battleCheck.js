/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-04 21:49:54 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 09:32:00
 */
import { dispatch_content_script_to_inject } from '../util/Request';
// http://game.granbluefantasy.jp
const get_battle_room_href = (battle_id, user_id) => {
	const body = { special_token: null, battle_key: battle_id };
	const url = '/quest/battle_key_check';

	dispatch_content_script_to_inject({ message: 'get_battle_room_href', data: JSON.stringify(body), url });
};

const use_bp = count => {
	chrome.extension.sendMessage({ message: 'get_user_id' }, response => {
		const { user_id } = response;

		const body = { special_token: null, num: count, item_id: '5' };
		const url = '/item/use_normal_item';
    
		dispatch_content_script_to_inject({ message: 'to_use_bp', data: JSON.stringify(body), url });
	});
};

const listen_clip_board_battle_check = () => {
	let timer = null;
    
	timer = setInterval(() => {
		let list = document.getElementsByClassName('gbfrf-tweets');
        
		if(list.length > 0 ) {
			for(let item of list) {
				item.addEventListener('click', e => {
					chrome.extension.sendMessage({ message: 'listen_clip_board_battle_check' });
				});
			}
            
			clearInterval(timer);
		}

	}, 800);
};

module.exports = { get_battle_room_href, use_bp, listen_clip_board_battle_check };