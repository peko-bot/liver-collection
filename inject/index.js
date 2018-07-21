/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-08 09:26:10 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-21 21:55:56
 */
// TODO: 文件需要单独一个文件夹分离功能
import { dispatchInjectToContentScript } from '../util/Request';
import { getStatus, useAp } from './commonAjax';
import { getAllMemberIds } from './checkHomework';
import { getBattleRoomHref } from './battleCheck';

document.getElementById('init_window').addEventListener('content_script_to_inject', e => {
	const { message, data, url } = e.detail;

	switch(message) {
		case 'getBattleRoomHref':
			getBattleRoomHref(data);
			break;

		case 'getMemberId': // 获得团友id
			getAllMemberIds(url, 1, []);
			break;

		case 'get_status': // 获得状态
			getStatus(result => {
				const { ap } = result.status;

				// 判断是否吃药
				if(ap < data.limit) {
					useAp(response => dispatchInjectToContentScript({ message: 'do_useAp' }));
				} else {
					dispatchInjectToContentScript({ message: 'do_useAp' });
				}
			});
			break;
	}
});