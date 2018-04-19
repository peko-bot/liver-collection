// window.onload = function () {
    
// }

// function load_item_datas(url, callback) {
//     fetch(url, {
//         // method: 'GET',
//         credentials: 'include', // 强制加入凭据头
//         // headers: new Headers({
//         //     'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
//         // })
//     }).then(result => {
//         return result.json();
//     }).then(result => {
//         callback(result);
//     });
// }

// function upload_item_datas(data) {
//     var param = {
//         user_id: '6964955',
//         data: data,
//     };
//     fetch('http://localhost:8023/Memo/gbf/i_item.do', {
//         method: 'POST',
//         credentials: 'include', // 强制加入凭据头
//         body: JSON.stringify(param),
//     }).then(result => {
//         return result.json();
//     }).then(result => {
//         console.log(result);
//     });
// }