/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-13 19:53:01 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-13 20:27:30
 */
const control_gacha = status => {
    let button_group = document.getElementsByClassName('btn-gacha');

    for(let button of button_group) {
        button.style.visibility = status ? 'hidden' : '';
    }
}

const init_gacha = () => {
    chrome.extension.sendMessage({ message: 'is_eunuch' }, response => {
        const { status } = response;
    
        let timer = null;
    
        if(location.hash.includes('gacha')) {
            timer = setInterval(() => {
                let button_group = document.getElementsByClassName('btn-gacha');
                
                if(button_group.length > 0) {
                    control_gacha(status);
    
                    clearInterval(timer);
                }
            }, 800)
        }
    });
}

module.exports = { init_gacha, control_gacha };