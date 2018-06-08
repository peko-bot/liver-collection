/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-08 16:42:33
 * @Description 共斗时的设置
 */
let observer = null;

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    let tasks = [];
    const { message } = response;

    switch(message) {
        case 'init_coopraid_listener': // 开启共斗搜索
            const nodes = document.getElementsByClassName('prt-wanted-list')[0];

            if(!observer) {
                observer = new MutationObserver(mutations => {
                    const rooms = document.getElementsByClassName('txt-room-comment');

                    for(let room of rooms) {
                        console.log(room.innerText);
                    }
                });

                observer.observe(nodes, {
                    attributes: true,
                    childList: true,
                    characterData: true
                });
            }

            // chrome.runtime.connect
        break;

        case 'close_coopraid_listener':
            observer.disconnect();
        break;

        default:

        break;
    }

    sendResponse({ tasks });
});