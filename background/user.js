import { get_by_cookie } from '../util/Request';

// 获得user_id
const getUserId = 'http://game.granbluefantasy.jp/user/user_id';

module.exports = {
	init_user_id: STORE => {
		!STORE.get('userId') && get_by_cookie(getUserId, {}, result => {
			const { user_id } = result;

			STORE.set('userId', user_id);
		});
	}
};