/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-04-21 16:11:50 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-05-20 13:01:35
 */

// 接收popup发来的消息
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     load_item_datas('http://game.granbluefantasy.jp/item/article_list_by_filter_mode', function(result) {
//         load_item_datas('http://game.granbluefantasy.jp/item/recovery_and_evolution_list_by_filter_mode', function(recovery) {
//             recovery = steam_roller(recovery);

//             result = [...result, ...recovery];

//             upload_item_datas(result, function(result) {
//                 sendResponse({ result: result });
//             });
//         });
//     });
// });

// // 数组扁平化
// function steam_roller(arr) {
//     var newArr = [];

//     for (var i = 0; i < arr.length; i++) {
//         if (Array.isArray(arr[i])) {
//             newArr.push.apply(newArr, steam_roller(arr[i]));
//         } else {
//             newArr.push(arr[i]);
//         }
//     }
//     return newArr;
// }

// function load_item_datas(url, callback) {
//     fetch(url, {
//         credentials: 'include', // 强制加入cookie
//     }).then(result => {
//         return result.json();
//     }).then(result => {
//         callback(result);
//     });
// }

// function upload_item_datas(data, callback) {
//     fetch('http://localhost:8023/Memo/gbf/i_item.do', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         },
//         body: 'user_id=6964955&data=' + JSON.stringify(data),
//     }).then(result => result.text()).then(result => callback(result));
// }