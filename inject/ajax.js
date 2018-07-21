/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-21 20:09:42 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-21 20:19:52
 */
import { dispatchInjectToContentScript } from '../util/Request';

const ajax = params => {
	const defaultOptions = {
		cache: false,
		global: false,
		dataType: 'json',
		error: error => {
			dispatchInjectToContentScript({ message: 'inject_ajax_error', error });
		}
	};

	$.ajax(Object.assign({}, defaultOptions, params));
};

module.exports = { ajax };