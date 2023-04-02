import { getBattleRoomHref } from './inject/battleCheck';

document.getElementById('inject_window').addEventListener('content_script_to_inject', (e: any) => {
  const { message, data } = e.detail;
  switch (message) {
    case 'getBattleRoomHref':
      getBattleRoomHref(data);
      break;

    default:
      break;
  }
});
