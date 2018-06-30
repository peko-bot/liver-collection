/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-08 11:13:09 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-30 23:40:54
 * @Description 全局样式设置
 */
/**
 * 修改滚动条样式
 * 因为容器className不知道是从哪来的，反正是无规律可循的字符串，
 * 又因为它的子节点名称固定，于是从子节点给容器加上个id，再用css修改容器滚动条属性
 */
const initStyles = () => {
    if(!document.getElementById('mobage-game-container')) {
        return;
    }

    // 修改滚动条样式
    let scroll = document.getElementById('mobage-game-container').parentNode;
    scroll.id = 'liver-collection-container';

    chrome.extension.sendMessage({ message: 'get_sider_options'}, response => {
        const { left, right } = response;

        !left && controlLeftSider(left);

        !right && controlRightSider(right);
    });
}

// 隐藏左侧侧边栏
const controlLeftSider = flag => {
    let leftPanel = document.getElementById('mobage-game-container').parentNode.parentNode.firstChild;
    let scroll = document.getElementById('mobage-game-container').parentNode;
    
    if(!flag) {
        leftPanel.style.display = 'none';
        scroll.style.marginLeft = '0px';
    } else {
        leftPanel.style.display = 'block';
        scroll.style.marginLeft = '64px';
    }
}

// 隐藏右侧侧边栏
const controlRightSider = flag => {
    let rightPanel = document.getElementById('submenu');
    rightPanel.style.display = flag ? 'block' : 'none';
}

const setZoom = zoom => {
    let htmlBody = document.getElementsByTagName('html')[0];

    htmlBody.style.zoom = zoom;
}

const initZoom = () => {
    chrome.extension.sendMessage({ message: 'get_zoom'}, response => {
        const { zoom } = response;
    
        setZoom(zoom);
    });
}

module.exports = { initStyles, initZoom, setZoom, controlLeftSider, controlRightSider };