/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-17 22:32:26 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 00:03:21
 */
const send_to_option = datas => {
	ajax(datas, 0, result => {
		window.memberDatas = result;
	});
};

const ajax = (datas, index, callback) => {
	let item = datas[index];
	const { id } = item;
    
	fetch('https://granbluefantasy.trim21.cn/api/v0.1/teamraid039/individual?user_id=' + id, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
	})
		.then(result => result.json())
		.then(result => {
			let { data = [] } = result;

			let max, min, keys = Object.keys(data);

			for(let i = 0, len = keys.length; i < len; i++) {
				keys[i] = parseInt(keys[i]);
			}

			max = Math.max(...keys);
			min = Math.min(...keys);

			if(keys.length > 0) {
				max = data[max];
				min = data[min];
            
				item.singleDayPoint = max.point - min.point;
				item.rank = max.rank;
				item.totalPoint = max.point;
			} else {
				item.singleDayPoint = '此人未进排名查无可查';
				item.rank = '-';
				item.totalPoint = '-';
			}

			if(index < datas.length - 1) {
				ajax(datas, (index + 1), callback);
			} else {
				callback(datas);
			}
		});
};

module.exports = { send_to_option };