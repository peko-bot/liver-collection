/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-21 21:29:04
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-06 21:42:28
 */
import { ajax } from './ajax';
import { dispatchInjectToContentScript } from '../util/Request';
import { useBp } from './commonAjax';

const getBattleRoomHref = battleId => {
	ajax({
		url: '/quest/battle_key_check',
		data: JSON.stringify({ 'special_token': null, 'battle_key': battleId }),
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

				// 吃豆
				useBp(result => {
					dispatchInjectToContentScript({ message: 'do_useBp' });
				}, count);
			}
		}
	});
};

const checkHasHL = () => {
	const resultId = location.hash.split('/')[1];
	const url = `/result/data/${ resultId }`;

	ajax({
		url,
		data: JSON.stringify({ 'special_token': null }),
		method: 'POST',
		success: result => {
			const { appearance } = result;

			dispatchInjectToContentScript({ message: 'check_has_hl', status: !!appearance });
		}
	});
};

export { getBattleRoomHref, checkHasHL };