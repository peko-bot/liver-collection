/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-11 15:23:33
 * @Description 共斗时的设置
 */
let observer = null;

// 根据搜索项筛选房间
const roomObserve = search => {
    let rooms = document.getElementsByClassName('prt-wanted-list')[0];

    if(!rooms) {
        return;
    }

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

            /**
             * 隐藏不符合搜索项的房间
             * 这里得注意dom的操作，有些操作是会被观察到，然后会直接跳出循环又从头开始执行这个方法
             * 换句话说，如果操作不当，这里会死循环
            */
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
}

const roomObserveBreaker = observer => {
    observer.disconnect();
    console.log('observer end')
}

const initRoomSearch = () => {
    if(!location.href.includes('coopraid')) {
        return;
    }
    
    chrome.extension.sendMessage({ message: 'get_search' }, response => {
        const { search } = response;

        /**
         * 因为页面加载是异步的，在content_script加载完成后，页面仍在loading状态
         * 所以要观察下，在房间刷出来以后才有筛选的价值
         */
        let loadingObserver = new MutationObserver(mutations => {
            let rooms = document.getElementsByClassName('prt-wanted-list')[0];

            if(rooms) {
                // 开始观察房间
                roomObserve(search);
                // 结束观察loading的observer
                roomObserveBreaker(loadingObserver);
            }
        });

        loadingObserver.observe(document.getElementsByTagName('body')[0], {
            attributes: true,
            childList: true,
            characterData: true
        });
    });
}

// 检查是否人员页面
const is_character_page = () => {
    return !!(document.getElementsByClassName('btn-lis-user').length);
}

/**
 * 返回房间内队友信息
 */
const check_characters = () => {
    let characters = [];

    for(let item of document.getElementsByClassName('btn-lis-user')) {
        const { dataset } = item;
        const { nickName, userId, userRank } = dataset;

        characters.push({ nickName, userId, userRank });
    }

    return characters;
}

module.exports = {
    roomObserve, roomObserveBreaker, initRoomSearch, // 搜索相关
    is_character_page, check_characters, // 超巴房相关
}