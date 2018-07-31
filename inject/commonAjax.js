/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-21 20:57:15
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-31 14:09:49
 */
import { ajax } from './ajax';

const useOption = {
	url: '/item/use_normal_item',
	method: 'POST',
};

const getStatus = success => {
	ajax({
		url: '/user/status',
		method: 'GET',
		success
	});
};

const useAp = (success, useCount = 1) => ajax(Object.assign({}, useOption, { data: JSON.stringify({ 'special_token': null, 'item_id': 2, num: useCount }), success }));

const useBp = (success, useCount = 1) => ajax(Object.assign({}, useOption, { data: JSON.stringify({ 'special_token': null, 'item_id': 5, num: useCount }), success }));

export { getStatus, useAp, useBp };