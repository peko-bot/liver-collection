/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-17 22:32:26
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-25 13:40:45
 */
import moment from 'moment';

const sendToOption = datas => {
	// 拼id
	let userIds = [];

	for(let item of datas) {
		const { id } = item;

		userIds.push(id);
	}

	const start = window.checkHomeworkStart;
	const end = window.checkHomeworkEnd;

	const url = 'https://granbluefantasy.trim21.cn/api/v0.1/teamraid039/group/individual';

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		body: JSON.stringify({ 'user_ids': userIds, start, end })
	})
		.then(result => result.json())
		.then(result => {
			let { data = [] } = result;

			let points = [];

			for(let key in data) {
				let value = data[key];
				const { user_id: userId, history } = value;

				if(history) {
					// 获得贡献中最大最小差值，求单日贡献
					let max, min, keys = Object.keys(history);

					for(let i = 0, len = keys.length; i < len; i++) {
						keys[i] = parseInt(keys[i]);
					}

					let maxKey = Math.max(...keys);

					max = history[maxKey];
					min = history[Math.min(...keys)];

					let timeStamp = new Date(maxKey * 1000);

					timeStamp = moment(timeStamp).format('YYYY-MM-DD HH:mm:ss');

					points.push({
						id: userId,
						singleDayPoint: max.point - min.point,
						rank: max.rank,
						totalPoint: max.point,
						timeStamp
					});
				} else {
					points.push({
						id: userId,
						singleDayPoint: undefined,
						rank: undefined,
						totalPoint: undefined,
						timeStamp: undefined
					});
				}
			}

			// 合并数据
			let assignObject = [];

			for(let item of datas) {
				for(let jtem of points) {
					if(item.id == jtem.id) {
						assignObject.push(Object.assign({}, item, jtem));
					}
				}
			}

			window.memberDatas = assignObject;
		});
};

module.exports = { sendToOption };