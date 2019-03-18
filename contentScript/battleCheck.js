import { dispatchContentScriptToInject } from '../util/Request';

// http://game.granbluefantasy.jp
const getBattleRoomHref = battleId => {
  // const body = { 'special_token': null, 'battle_key': battleId };
  // const url = '/quest/battle_key_check';

  dispatchContentScriptToInject({
    message: 'getBattleRoomHref',
    data: battleId,
  });
};

const listenClipBoardBattleCheck = () => {
  let timer = null;

  timer = setInterval(() => {
    let list = document.getElementsByClassName('gbfrf-tweets');

    // TODO: 改成容器的事件委托
    if (list.length > 0) {
      for (let item of list) {
        item.addEventListener('click', e => {
          chrome.extension.sendMessage({
            message: 'listenClipBoardBattleCheck',
          });
        });
      }

      clearInterval(timer);
    }
  }, 800);
};

const checkHasHL = () => {
  dispatchContentScriptToInject({ message: 'checkHasHL' });
};

export { getBattleRoomHref, listenClipBoardBattleCheck, checkHasHL };
