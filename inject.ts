import { dispatchInjectToContentScript } from './util/Request';
import { getStatus, useAp } from './inject/commonAjax';
import { getBattleRoomHref } from './inject/battleCheck';

document.getElementById('init_window').addEventListener('content_script_to_inject', (e) => {
  const { message, data } = e.detail;
  switch (message) {
    case 'getBattleRoomHref':
      getBattleRoomHref(data);
      break;

    case 'get_status': // 获得状态
      getStatus((result) => {
        const { ap } = result.status;
        // 判断是否吃药
        if (ap < data.limit) {
          useAp((response) => dispatchInjectToContentScript({ message: 'do_useAp' }));
        } else {
          dispatchInjectToContentScript({ message: 'do_useAp' });
        }
      });
      break;

    default:
      break;
  }
});
