/*
 * @Author: zy9@github.com/orzyyyy
 * @Date: 2018-07-13 19:53:01
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-31 14:09:36
 */
const controlGacha = status => {
	let buttonGroup = document.getElementsByClassName('btn-gacha');

	for(let button of buttonGroup) {
		button.style.visibility = status ? 'hidden' : '';
	}
};

const initGacha = () => {
	chrome.extension.sendMessage({ message: 'isEunuch' }, response => {
		const { status } = response;

		let timer = null;

		if(location.hash.includes('gacha')) {
			timer = setInterval(() => {
				let buttonGroup = document.getElementsByClassName('btn-gacha');

				if(buttonGroup.length > 0) {
					controlGacha(status);

					clearInterval(timer);
				}
			}, 800);
		}
	});
};

export { initGacha, controlGacha };