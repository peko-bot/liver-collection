/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-21 21:19:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-21 22:25:29
 */
import { ajax } from './ajax';
import { dispatchInjectToContentScript } from '../util/Request';

const getAllMemberIds = (url, index, result) => {
	ajax({
		url: url.replace('@', index),
		method: 'GET',
		success: resp => {
			const { count, list } = resp;

			if(count > (index - 1) * 10) {
				result = [...result, ...list];
				index++;

				getAllMemberIds(url, index, result);
			} else {
				dispatchInjectToContentScript({ message: 'do_getMemberId', data: result });
			}
		}
	});
};

export { getAllMemberIds };