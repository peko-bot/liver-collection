/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-04-21 16:11:50 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-04-21 18:20:51
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
        // method: 'GET',
        credentials: 'include', // 强制加入凭据头
        // headers: new Headers({
        //     'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
        // })
    }).then(result => {
        return result.json();
    }).then(result => {
        callback(result);
    });
}

function upload_item_datas(data, callback) {
    var param = {
        user_id: '6964955',
        data: JSON.stringify(data),
    };
    fetch('http://localhost:8023/Memo/gbf/i_item.do', {
        method: 'POST',
        // mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(param),
    }).then(result => {
        return result.text();
    }).then(result => {
        callback(result);
    });
}