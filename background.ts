import { initUserId } from './user';
import { initInputForBattle, handleBoardPost } from './battleCheck';
import { getByCookie } from './util/Request';

window.store = local;

initUserId(local);

// 初始化舔婊配置
initInputForBattle();

const getUserId = 'http://game.granbluefantasy.jp/user/user_id';

const initUserId = (STORE) => {
  !STORE.get('userId') &&
    getByCookie(getUserId, {}, (result) => {
      const { user_id: userId } = result;
      STORE.set('userId', userId);
    });
};

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

      case 'get_userId':
        tasks = Object.assign(tasks, { userId: local.get('userId') });
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

      case 'get_ap_limit':
        tasks = Object.assign(tasks, {
          limit: local.get('entrySceneApLowerLimit'),
          href: local.get('sceneHref'),
        });
        break;

      case 'get_scene_href':
        tasks = Object.assign(tasks, { href: local.get('sceneHref') });
        break;

      case 'inject_ajax_error':
        chrome.notifications.create({
          type: 'basic',
          iconUrl: './assets/img/54878633_p0.png',
          title: 'ajax未知异常',
          message: error,
        });
        break;

      case 'get_key_board_listener_status':
        tasks = Object.assign(tasks, { status: local.get('isListenToKeyBoard') });
        break;

      default:
        break;
    }

    sendResponse(tasks);
  });
} catch (error) {
  console.log(error);
}
