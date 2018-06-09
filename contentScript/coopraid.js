/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-09 11:40:00
 * @Description 共斗时的设置
 */
let observer = null;

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    let tasks = { error: '', tasks: '' };
    const { message, search } = response;

    switch(message) {
        case 'init_coopraid_listener': // 开启共斗搜索
            const nodes = document.getElementsByClassName('prt-wanted-list')[0];

            if(!observer) {
                observer = new MutationObserver(mutations => {
                    let rooms = document.getElementsByClassName('txt-room-comment');

                    for(let room of rooms) {
                        let text = room.innerText;

                        // 匹配房名含有文本框内容项
                        for(let item of search.split(';')) {
                            if(text.includes(item)) {
                                console.log(text)
                            }
                        }
                    }
                });

                observer.observe(nodes, {
                    attributes: true,
                    childList: true,
                    characterData: true
                });
                console.log('observer start')
            }

            // chrome.runtime.connect
        break;

        case 'close_coopraid_listener':
            observer.disconnect();
            console.log('observer end')
        break;

        default:

        break;
    }

    sendResponse({ tasks });
});