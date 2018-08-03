/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-08-03 20:43:45
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-03 21:10:04
 */
const redoEntryScene = (sceneHref, limit, flag) => {
	const status = !!sceneHref && !!limit && !!flag;

	console.log(status);

	status && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

		port.postMessage({ message: 'redo_entry_scene' });
	});
};

export { redoEntryScene };