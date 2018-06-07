/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-07 15:37:15
 */
chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    let text = document.getElementsByTagName('th')[0].innerText;

    sendResponse({ text });
});