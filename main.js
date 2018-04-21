/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-04-21 16:11:50 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-04-21 20:52:17
 */

// 接收popup发来的消息
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    load_item_datas('http://game.granbluefantasy.jp/item/article_list_by_filter_mode', function(result) {
        upload_item_datas(result, function(result) {
            console.log(result)
            sendResponse({ result: result });
        });
    });
});

// function load_item_datas(url, callback) {
//     $.ajax({
//         url: url,
//         xhrFields: { withCredentials: true },
//         crossDomain: true,
//         dataType: 'json',
//         success: function(result) {
//             callback(result);
//         }
//     });
// }

// function upload_item_datas(data, callback) {
//     $.ajax({
//         url: 'http://localhost:8023/Memo/gbf/i_item.do',
//         type: 'POST',
//         data: {
//             user_id: '6964955',
//             data: JSON.stringify(data),
//         },
//         success: function(result) {
//             callback(result);
//         }
//     });
// }

function load_item_datas(url, callback) {
    fetch(url, {
        credentials: 'include', // 强制加入凭据头
    }).then(result => {
        return result.json();
    }).then(result => {
        callback(result);
    });
}

function upload_item_datas(data, callback) {
    fetch('http://localhost:8023/Memo/gbf/i_item.do', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'user_id=6964955&data=' + JSON.stringify(data),
    }).then(result => {
        return result.text();
    }).then(result => {
        callback(result);
    });
}