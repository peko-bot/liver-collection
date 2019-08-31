/*
 * @Author: zy9@github.com/orzyyyy
 * @Date: 2018-07-13 20:33:24
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-31 14:09:03
 */
const initGacha = (url, checked) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    port.postMessage({ message: 'init_eunuch', status: checked });
  });
};

export { initGacha };
