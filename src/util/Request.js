/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-08 09:13:33 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-22 22:38:42
 */
// 上传数据到服务器
export const upload_to_server = (url, data, callback) => {
    if(!url) return;

    let params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    }
    params = Object.assign(params, data);

    fetch(url, params).then(result => result.text()).then(result => callback(result))
    .catch(error => {
        // console.log(error)
    });
}

// 请求游戏内接口
export const get_by_cookie = (url, data, callback) => {
    if(!url) return;

    let params = {
        credentials: 'include', // 加入cookie
    };
    params = Object.assign(params, data);

    fetch(url, params).then(result => result.json()).then(result => callback(result))
    .catch(error => {
        // console.log(error);
    });
}

// 浏览器通信
export const extensions_to_content = (messages, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, messages, response => callback && callback(response));
    });
}