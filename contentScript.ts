import { getBattleRoomHref } from './contentScript/battleCheck';

const injectScript = file => {
  let th = document.getElementsByTagName('body')[0];

  let s = document.createElement('script');

  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);

  let windowWraper = document.createElement('script');

  windowWraper.id = 'inject_window';

  th.appendChild(s);
  th.appendChild(windowWraper);
};

injectScript(chrome.runtime.getURL('/inject.js'));

// 初始化一键舔婊
if (location.href.includes('raidfinder')) {
  const body = document.getElementsByTagName('body')[0];
  body.addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'listenClipBoardBattleCheck' });
  });
}

// 用作接收inject返回的值
document.getElementById('inject_window').addEventListener('inject_to_content_script', (e: any) => {
  const { message, data, url, error } = e.detail;

  switch (message) {
    case 'getBattleRoomHref': // 跳转地址的转发
      chrome.runtime.sendMessage({ message: 'battle_room_href', url });
      break;

    case 'notify_error': // 进房异常处理
      chrome.runtime.sendMessage({ message: 'notify_error', data });
      break;

    case 'inject_ajax_error': // inject中 ajax 错误需要提示
      chrome.runtime.sendMessage({ message: 'inject_ajax_error', error });
      break;

    default:
      break;
  }
});

// 长连接监听统一写在这
chrome.runtime.onConnect.addListener(port => {
  const { name } = port;
  switch (name) {
    case 'popup_to_content':
      port.onMessage.addListener(response => {
        const { message, battleId } = response;
        switch (message) {
          case 'battle_key_check': // 根据 battle id 获得房间地址
            getBattleRoomHref(battleId);
            break;

          default:
            break;
        }
      });
      break;

    default:
      break;
  }
});
