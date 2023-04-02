import { dispatchContentScriptToInject } from '../util';

// http://game.granbluefantasy.jp
const getBattleRoomHref = battleId => {
  // const body = { 'special_token': null, 'battle_key': battleId };
  // const url = '/quest/battle_key_check';

  dispatchContentScriptToInject({
    message: 'getBattleRoomHref',
    data: battleId,
  });
};

const checkHasHL = () => {
  dispatchContentScriptToInject({ message: 'checkHasHL' });
};

export { getBattleRoomHref, checkHasHL };
