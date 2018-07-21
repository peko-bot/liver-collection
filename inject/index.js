/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-08 09:26:10 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-21 20:37:10
 */
// TODO: 文件需要单独一个文件夹分离功能
import { dispatchInjectToContentScript } from '../util/Request';
import { ajax } from './ajax';

document.getElementById('init_window').addEventListener('content_script_to_inject', e => {
	const { message, data, url } = e.detail;

	switch(message) {
		case 'getBattleRoomHref':
			ajax({
				url,
				data,
				method: 'POST',
				success: result => {
					const { redirect, current_battle_point: currentBattlePoint, battle_point_check: battlePointCheck, used_battle_point: userdBattlePoint, popup } = result;

					// 如果豆够，直接进房间
					if(redirect) {
						dispatchInjectToContentScript({ message: 'getBattleRoomHref', url: redirect });
					}

					// 进入异常
					if(popup) {
						dispatchInjectToContentScript({ message: 'notify_error', data: popup.body ? popup.body : '未知错误' });
					}

					// 如果豆不够
					if(typeof currentBattlePoint === 'number' && !battlePointCheck) {
						let count = userdBattlePoint - currentBattlePoint;

						if(count <= 0) {
							count = 5;
						}
                        
						dispatchInjectToContentScript({ message: 'to_useBp', count });
					}
				}
			});
			break;

		case 'to_useBp': // 吃药
			ajax({
				url,
				data,
				method: 'POST',
				success: result => {
					const { useFlag } = result;
                    
					dispatchInjectToContentScript({ message: 'do_useBp' });
				}
			});
			break;

		case 'getMemberId': // 获得团友id
			ajaxNew(url, 1, []);
			break;

		case 'get_status': // 获得状态
			ajax({
				url,
				method: 'GET',
				success: result => {
					const { ap } = result.status;

					// 判断是否吃药
					if(ap < data.limit) {
						ajax({
							url: '/item/use_normal_item',
							data: JSON.stringify({ 'special_token': null, 'item_id': 2, num: 1 }),
							method: 'POST',
							success: result => {
								const { useFlag } = result;
			
								dispatchInjectToContentScript({ message: 'do_useAp' });
							},
						});
					} else {
						dispatchInjectToContentScript({ message: 'do_useAp' });
					}
				
				}
			});
			break;
	}
});

const ajaxNew = (url, index, result) => {
	ajax({
		url: url.replace('@', index),
		method: 'GET',
		success: resp => {
			const { count, list } = resp;

			if(count > (index - 1) * 10) {
				result = [...result, ...list];
				index++;

				ajax(url, index, result);
			} else {
				dispatchInjectToContentScript({ message: 'do_getMemberId', data: result });
			}
		}
	});
};