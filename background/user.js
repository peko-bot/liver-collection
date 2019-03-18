import { getByCookie } from '../util/Request';

// 获得userId
const getUserId = 'http://game.granbluefantasy.jp/user/user_id';

export const initUserId = STORE => {
  !STORE.get('userId') &&
    getByCookie(getUserId, {}, result => {
      const { user_id: userId } = result;

      STORE.set('userId', userId);
    });
};
