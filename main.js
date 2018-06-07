/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-07 22:45:22
 */
let observer = null;
chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    let tasks = [];
    const { message } = response;

    switch(message) {
        case 'init_room_listener':
            const nodes = document.getElementsByClassName('prt-wanted-list')[0];

            observer = new MutationObserver(mutations => {
                
            });

            observer.observe(nodes, {
                attributes: true,
                childList: true,
                characterData: true
            });

            // observer.disconnect();
            // chrome.runtime.connect
        break;

        default:

        break;
    }

    sendResponse({ tasks });
});