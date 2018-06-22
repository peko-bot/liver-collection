/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-22 22:25:56
 * @Description 共斗时的设置
 */
let observer = null;

module.exports = {
    observer,
    roomObserve: search => {
        let rooms = document.getElementsByClassName('prt-wanted-list')[0];

        if(!observer) {
            let observer = new MutationObserver(mutations => {
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
    },
    roomObserveBreaker: observer => {
        observer.disconnect();
        console.log('observer end')
    }
}