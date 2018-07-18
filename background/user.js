import { getByCookie } from '../util/Request';

// 获得userId
const getUserId = 'http://game.granbluefantasy.jp/user/userId';

module.exports = {
	initUserId: STORE => {
		!STORE.get('userId') && getByCookie(getUserId, {}, result => {
			const { userId } = result;

			STORE.set('userId', userId);
		});
	}
};