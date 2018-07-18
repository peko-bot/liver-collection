/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-04 21:49:54 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 11:34:41
 */
import { dispatchContentScriptToInject } from '../util/Request';
// http://game.granbluefantasy.jp
const getBattleRoomHref = (battleId, userId) => {
	const body = { 'special_token': null, 'battle_key': battleId };
	const url = '/quest/battle_key_check';

	dispatchContentScriptToInject({ message: 'getBattleRoomHref', data: JSON.stringify(body), url });
};

const useBp = count => {
	chrome.extension.sendMessage({ message: 'get_userId' }, response => {
		const { userId } = response;

		const body = { 'special_token': null, num: count, 'item_id': '5' };
		const url = '/item/use_normal_item';
    
		dispatchContentScriptToInject({ message: 'to_useBp', data: JSON.stringify(body), url });
	});
};

const listenClipBoardBattleCheck = () => {
	let timer = null;
    
	timer = setInterval(() => {
		let list = document.getElementsByClassName('gbfrf-tweets');
        
		if(list.length > 0 ) {
			for(let item of list) {
				item.addEventListener('click', e => {
					chrome.extension.sendMessage({ message: 'listenClipBoardBattleCheck' });
				});
			}
            
			clearInterval(timer);
		}

	}, 800);
};

module.exports = { getBattleRoomHref, useBp, listenClipBoardBattleCheck };