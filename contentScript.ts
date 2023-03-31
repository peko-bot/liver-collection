import {
  setZoom,
  controlLeftSider,
  controlRightSider,
  removeEvent,
  initScrollHoverContainer,
  hideMenus,
} from './contentScript/style';
import { roomObserve, checkCharacters, isCharacterPage } from './contentScript/coopraid';
import { getBattleRoomHref, checkHasHL } from './contentScript/battleCheck';
import { useBp } from './inject/commonAjax';
import { controlGacha, initGacha } from './contentScript/gachaBanner';
import { getMemberId } from './contentScript/checkHomework';
import { entryScene, bindKeyBoardListener, beforeEntryScene } from './contentScript/keyBoardBind';

const injectScript = (file) => {
  let th = document.getElementsByTagName('body')[0];

  let s = document.createElement('script');

  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);

  let windowWraper = document.createElement('script');

  windowWraper.id = 'init_window';

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

bindKeyBoardListener();

// 用作接收inject返回的值
document.getElementById('init_window').addEventListener('inject_to_content_script', (e) => {
  const { message, data, url, count, error, status } = e.detail;

  switch (message) {
    case 'getBattleRoomHref': // 跳转地址的转发
      chrome.runtime.sendMessage({ message: 'battle_room_href', url });
      break;

    case 'to_useBp': // 获得吃药参数
      useBp(count);
      break;

    case 'do_useBp': // 吃完药了
      chrome.runtime.sendMessage({
        message: 'redo_battle_room_href_check',
      });
      break;

    case 'do_useAp':
      entryScene();
      break;

    case 'notify_error': // 进房异常处理
      chrome.runtime.sendMessage({ message: 'notify_error', data });
      break;

    case 'do_getMemberId': // 获得团员id
      chrome.runtime.sendMessage({ message: 'do_getMemberId', data });
      break;

    case 'inject_ajax_error': // inject中ajax错误需要提示
      chrome.runtime.sendMessage({ message: 'inject_ajax_error', error });
      break;

    case 'check_has_hl':
      chrome.runtime.sendMessage({ message: 'is_has_hl', status });
      break;

    default:
      break;
  }
});

// 长连接监听统一写在这
chrome.runtime.onConnect.addListener((port) => {
  const { name } = port;

  switch (name) {
    case 'popup_to_content':
      port.onMessage.addListener((response) => {
        const { zoom, message, search, type, status, battleId, groupId, interval } = response;

        switch (message) {
          case 'set_zoom': // 用作Popup中拖动Slider时，实时改变窗口大小
            setZoom(zoom);
            break;

          case 'open_coopraid_search': // 开启共斗搜索
            roomObserve(search);
            break;

          case 'close_coopraid_search': // 关闭共斗搜索
            break;

          case 'isCharacterPage': // 检查是否人员页面
            port.postMessage({ flag: isCharacterPage() });
            break;

          case 'check_ub_characters': // 检查超巴房队友天人情况
            port.postMessage({ datas: checkCharacters() });
            break;

          case 'sider_status': // 控制左右面板显示
            type == 'isLeftSiderShow' ? controlLeftSider(status) : controlRightSider(status);
            break;

          case 'checkBlackList': // 检查黑名单
            port.postMessage({ datas: checkCharacters() });
            break;

          case 'scroll_style_status': // 设置是否开启滚动条样式
            status ? initScrollHoverContainer() : removeEvent();
            break;

          case 'battle_key_check': // 根据battle id获得房间地址
            getBattleRoomHref(battleId);
            break;

          case 'to_be_a_eunuch': // 禁用抽卡
            controlGacha(status);
            break;

          case 'init_eunuch':
            initGacha();
            break;

          case 'check_homework':
            getMemberId(groupId);
            break;

          case 'listen_to_key_board':
            bindKeyBoardListener();
            break;

          case 'show_your_wife':
            hideMenus(status ? 'none' : '');
            break;

          case 'redo_entry_scene': // 在结算完成后，重新进入默认房间
            beforeEntryScene();
            break;

          case 'check_has_hl':
            checkHasHL();
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
