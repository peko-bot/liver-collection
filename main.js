/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-05-30 22:49:11
 */
window.onload = function() {
    var node = document.getElementsByClassName('prt-button-cover');
    console.dir(node.length)

    chrome.runtime.sendMessage({ node: node.length }, function (response) {
        console.log(response);
    });
}