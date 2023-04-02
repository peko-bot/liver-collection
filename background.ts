import { initInputForBattle, handleBoardPost } from './battleCheck';

// 初始化舔婊配置
initInputForBattle();

try {
  chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    const { message, url, data, error } = response;
    let tasks = { error: '', tasks: '' };
    switch (message) {
      case 'listenClipBoardBattleCheck':
        handleBoardPost();
        break;

      case 'battle_room_href': // 用于跳转地址
        chrome.tabs.update(sender.tab.id, {
          url: 'http://game.granbluefantasy.jp' + url,
        });
        break;

      case 'redo_battle_room_href_check': // 吃药成功后，重新执行进入房间的方法
        handleBoardPost();
        break;

      case 'notify_error':
        chrome.notifications.create({
          type: 'basic',
          iconUrl: './assets/img/54878633_p0.png',
          title: '进房异常',
          message: data,
        });
        break;

      case 'inject_ajax_error':
        chrome.notifications.create({
          type: 'basic',
          iconUrl: './assets/img/54878633_p0.png',
          title: '请求时未知异常',
          message: error,
        });
        break;

      default:
        break;
    }

    sendResponse(tasks);
  });
} catch (error) {
  console.error(error);
}
