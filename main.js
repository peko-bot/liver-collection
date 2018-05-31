/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-05-31 22:26:53
 */
window.onload = function() {
    var node = document.getElementsByClassName('_38sXs6kUdRiSAYy7O-rDEe');
    console.dir(node)

    chrome.runtime.sendMessage({ node: node }, function (response) {
        console.log(response);
    });
}