import { dispatchInjectToContentScript } from '../util/Request';
import { ajax } from '../util';

const getBattleRoomHref = battleId => {
  ajax({
    url: '/quest/battle_key_check',
    data: JSON.stringify({ special_token: null, battle_key: battleId }),
    method: 'POST',
    success: result => {
      const { redirect, popup } = result;
      // 如果豆够，直接进房间
      if (redirect) {
        dispatchInjectToContentScript({
          message: 'getBattleRoomHref',
          url: redirect,
        });
      }
      // 进入异常
      if (popup) {
        dispatchInjectToContentScript({
          message: 'notify_error',
          data: popup.body ? popup.body : '未知错误',
        });
      }
    },
  });
};

export { getBattleRoomHref };
