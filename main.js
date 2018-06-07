/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-07 21:49:43
 */
chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    let tasks = [];
    const { message } = response;

    switch(message) {
        case 'init_room_listener':
            const nodes = document.getElementsByClassName('txt-room-comment');

            nodes.addListener('', e => {
                
            });

            for(let node of nodes) {
                const { innerText = '' } = node;

                tasks.push(node);
            }
        break;

        default:

        break;
    }

    sendResponse({ tasks });
});