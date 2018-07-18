/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-08 09:26:10 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 12:33:23
 */
import { dispatchInjectToContentScript } from '../util/Request';

document.getElementById('init_window').addEventListener('content_script_to_inject', e => {
	const { message, data, url } = e.detail;

	// TODO: 此处需要封装，太丑陋了
	switch(message) {
		case 'getBattleRoomHref':
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
						dispatchInjectToContentScript({ message: 'getBattleRoomHref', url: redirect });
					}

					// 进入异常
					if(popup) {
						dispatchInjectToContentScript({ message: 'notify_error', data: popup.body ? popup.body : '未知错误' });
					}

					// 如果豆不够
					if(typeof current_battle_point === 'number' && !battle_point_check) {
						let count = used_battle_point - current_battle_point;

						if(count <= 0) {
							count = 5;
						}
                        
						dispatchInjectToContentScript({ message: 'to_useBp', count });
					}
				}
			});
			break;

		case 'to_useBp': // 吃药
			$.ajax({
				url,
				data,
				cache: false,
				global: false,
				dataType: 'json',
				method: 'POST',
				success: result => {
					const { useFlag } = result;
                    
					dispatchInjectToContentScript({ message: 'do_useBp' });
				}
			});
			break;

		case 'getMemberId':
			let result = [];

			ajax(url, 1, result);
			break;
	}
});

const ajax = (url, index, result) => {
	$.ajax({
		url: url + index,
		cache: false,
		global: false,
		dataType: 'json',
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