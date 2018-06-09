/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-09 19:47:44
 * @Description 共斗时的设置
 */
let observer = null;

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    let tasks = { error: '', tasks: '' };
    const { message, search } = response;

    switch(message) {
        case 'init_coopraid_listener': // 开启共斗搜索
            let rooms = document.getElementsByClassName('prt-wanted-list')[0];

            if(!observer) {
                observer = new MutationObserver(mutations => {
                    let texts = document.getElementsByClassName('txt-room-comment');
                    let selectTexts = [];

                    for(let i = 0, roomLen = texts.length; i < roomLen; i++) {
                        let room = texts[i];
                        let innerText = room.innerText;

                        // アル;↑
                        // 获得房名含有文本框内容项的索引
                        let flag = true, searchs = search.split(';');
                        for(let j = 0, searchsLen = searchs.length; j < searchsLen; j++) {
                            let jtem = searchs[j];
                            let isIncludes = innerText.includes(jtem);

                            if(flag && isIncludes && j == searchsLen - 1) {
                                selectTexts.push(i);
                            }
                        }
                    }

                    // 隐藏不符合搜索项的房间
                    for(let i = 0, roomLen = rooms.children.length; i < roomLen; i++) {
                        let room = rooms.children[i];
                        room.style.display = 'none';
                        
                        for(let j = 0, selectTextsLen = selectTexts.length; j < selectTextsLen; j++) {
                            if(i == selectTexts[j]) {
                                room.style.display = '';
                            }
                        }
                    }
                });

                observer.observe(rooms, {
                    attributes: true,
                    childList: true,
                    characterData: true
                });
                console.log('observer start')
            }
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