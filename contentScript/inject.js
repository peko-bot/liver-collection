/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-08 09:26:10 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-08 21:24:26
 */
let timer = null;

timer = setInterval(() => {
    if(window.$) {
        clearInterval(timer);
        
        let windowWraper = document.getElementById('init_window');
        windowWraper.textContent = window.$.toString();

        // window.postMessage({ message: 'init_window', text: window.$.ajax.toString() }, '*');
    }
}, 800);