window.onload = function () {
    var upload_items = document.getElementById('u_items');

    upload_items.addEventListener('click', function(e) {
        load_item_datas('http://game.granbluefantasy.jp/item/article_list_by_filter_mode', function(result) {
            upload_item_datas(result);
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