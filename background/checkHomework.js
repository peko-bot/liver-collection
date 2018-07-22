/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-17 22:32:26
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-22 11:33:54
 */
const sendToOption = datas => {
	// 拼id
	let userIds = [];

	for(let item of datas) {
		const { id } = item;

		userIds.push(id);
	}

	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const start = parseInt(new Date(`${ year }-${ month }-${ day } 05:00:00`).getTime() / 1000);
	const end = parseInt(new Date().getTime() / 1000);

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

					timeStamp = `${ timeStamp.getFullYear() }-${ timeStamp.getMonth() + 1 }-${ timeStamp.getDate() } ${ timeStamp.getHours() }:${ timeStamp.getMinutes() }:${ timeStamp.getSeconds() }`;

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

// const ajax = (datas, index, callback) => {
// 	let item = datas[index];
// 	const { id } = item;

// 	fetch('https://granbluefantasy.trim21.cn/api/v0.1/teamraid039/group/individual?user_id=' + id, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
// 		},
// 		body: JSON.stringify({ 'user_ids': [], start: '', end: '' })
// 	})
// 		.then(result => result.json())
// 		.then(result => {
// 			let { data = [] } = result;

// 			let max, min, keys = Object.keys(data);

// 			for(let i = 0, len = keys.length; i < len; i++) {
// 				keys[i] = parseInt(keys[i]);
// 			}

// 			max = Math.max(...keys);
// 			min = Math.min(...keys);

// 			if(keys.length > 0) {
// 				max = data[max];
// 				min = data[min];

// 				item.singleDayPoint = max.point - min.point;
// 				item.rank = max.rank;
// 				item.totalPoint = max.point;
// 			} else {
// 				item.singleDayPoint = '此人未进排名查无可查';
// 				item.rank = '-';
// 				item.totalPoint = '-';
// 			}

// 			if(index < datas.length - 1) {
// 				ajax(datas, (index + 1), callback);
// 			} else {
// 				callback(datas);
// 			}
// 		});
// };

module.exports = { sendToOption };