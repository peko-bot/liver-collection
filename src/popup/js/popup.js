/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-04-21 16:11:31 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-04-21 17:45:31
 */
window.onload = function () {
    var upload_items = document.getElementById('u_items');

    upload_items.addEventListener('click', function(e) {
        // load_item_datas('http://game.granbluefantasy.jp/item/article_list_by_filter_mode', function(result) {
        //     upload_item_datas(result);
        // });
        // 获得当前选中标签
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: 'test' }, function(response) { // popup => contentscript
                console.log(response)
            });
        });
    }, false);
}

function load_item_datas(url, callback) {
    $.ajax({
        url: url,
        xhrFields: { withCredentials: true },
        crossDomain: true,
        dataType: 'json',
        success: function(result) {
            callback(result);
        }
    });
}

function upload_item_datas(data) {
    $.ajax({
        url: 'http://localhost:8023/Memo/gbf/i_item.do',
        type: 'POST',
        data: {
            user_id: '6964955',
            data: JSON.stringify(data),
        },
        success: function(result) {
            console.log(result)
        }
    });
}