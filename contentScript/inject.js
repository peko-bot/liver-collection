/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-08-03 15:17:37
 * @Last Modified by:   zy9
 * @Last Modified time: 2018-08-03 15:17:37
 */
const injectScript = file => {
	let th = document.getElementsByTagName('body')[0];

	let s = document.createElement('script');

	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', file);

	let windowWraper = document.createElement('script');

	windowWraper.id = 'init_window';

	th.appendChild(s);
	th.appendChild(windowWraper);
};

export { injectScript };