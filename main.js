/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-07 14:45:43
 */

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    var text = document.getElementsByTagName('th')[0].innerText;

    sendResponse({ text: text });
});