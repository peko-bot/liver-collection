/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-08-03 20:43:45
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-04 23:38:17
 */
const redoEntryScene = (sceneHref, limit, flag) => {
	const status = !!sceneHref && !!limit && !!flag;

	console.log(status);

	status && chrome.tabs.query({}, tabs => {
		let tabId;

		for(let tab of tabs) {
			const { url, id } = tab;

			if(url.includes('result')) {
				tabId = id;

				break;
			}
		}

		const port = chrome.tabs.connect(tabId, { name: 'popup_to_content' });

		port.postMessage({ message: 'redo_entry_scene' });
	});
};

export { redoEntryScene };