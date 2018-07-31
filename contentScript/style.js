/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-08 11:13:09
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-31 14:07:50
 * @Description 全局样式设置
 */
const initStyles = () => {
	if(!document.getElementById('mobage-game-container')) {
		return;
	}

	/**
     * 修改滚动条样式
     * 因为容器className不知道是从哪来的，反正是无规律可循的字符串，
     * 又因为它的子节点名称固定，于是从子节点给容器加上个id，再用css修改容器滚动条属性
     */
	let scroll = document.getElementById('mobage-game-container').parentNode;

	scroll.id = 'liver-collection-container';

	// 加载滚动条配置
	chrome.extension.sendMessage({ message: 'get_scroll_options' }, response => {
		const { status } = response;

		status && initScrollHoverContainer();
	});

	// 加载侧边栏配置
	chrome.extension.sendMessage({ message: 'get_sider_options' }, response => {
		const { left, right } = response;

		!left && controlLeftSider(left);

		!right && controlRightSider(right);
	});
};

// 用作控制滚动条样式
const initScrollHoverContainer = () => {
	let scroll = document.getElementById('liver-collection-container');

	let scrollHoverContainer = document.createElement('div');

	scrollHoverContainer.id = 'scrollHoverContainer';
	scrollHoverContainer.style.cssText = 'position:fixed;right:0px;top:0px;width:30px;height:100%;';
	scroll.appendChild(scrollHoverContainer);

	scrollHoverContainer.addEventListener('mouseover', scrollEvent.bind(this), false);
};

// 移除触发滚动条样式改变的元素
const removeEvent = () => {
	let scrollHoverContainer = document.getElementById('scrollHoverContainer');

	// scrollHoverContainer.removeEventListener('mouseover', scrollEvent.bind(this), false);
	scrollHoverContainer.parentNode.removeChild(scrollHoverContainer);
};

/**
 * 因为滚动条没有hover事件，或者说我不知道怎么写，这里用了个hack
 *
 * css里写了两种样式，一种是鼠标未移入样式#liver-collection-container
 * 另一种是移入的#liver-collection-container-hover
 * 创建一个额外的div，当鼠标移入时显示#liver-collection-container-hover的样式，移除这个额外的div
 * 时间间隔后把id改回来
 */
const scrollEvent = e => {
	let scrollHoverContainer = document.getElementById('scrollHoverContainer');
	let container = document.getElementById('liver-collection-container') || document.getElementById('liver-collection-container-hover');

	container.id = 'liver-collection-container-hover';
	scrollHoverContainer.style.display = 'none';

	setTimeout(() => {
		container.id = 'liver-collection-container';
		scrollHoverContainer.style.display = 'block';
	}, 3000);
};

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
};

// 隐藏右侧侧边栏
const controlRightSider = flag => {
	let rightPanel = document.getElementById('submenu');

	rightPanel.style.display = flag ? 'block' : 'none';
};

const setZoom = zoom => {
	// let htmlBody = document.getElementsByTagName('html')[0];
	let htmlBody = document.getElementById('mobage-game-container');

	if(!htmlBody) {
		return;
	}

	htmlBody.style.zoom = zoom;
};

const initZoom = () => {
	chrome.extension.sendMessage({ message: 'get_zoom' }, response => {
		const { zoom } = response;

		setZoom(zoom);
	});
};

const hideMenus = () => {
	console.log('hide');
};

export {
	initStyles, initZoom, setZoom, // 控制全局样式
	controlLeftSider, controlRightSider, // 控制侧边栏
	initScrollHoverContainer, removeEvent, // 控制滚动条样式
	hideMenus, // 空闲时隐藏菜单
};