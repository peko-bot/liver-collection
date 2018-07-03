/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-01 11:28:56 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-03 22:17:15
 * @Description: 初始化本地存储
 */
import options from './options'
import Store from '../util/Store'

// 初始化默认配置
const local = new Store('options');

// 加载黑名单
fetch('./assets/black_list.json', {})
.then(result => result.json())
.then(result => {
    let black_list = local.get('black_list');

    /**
     * 更新数据
     */
    let list = [];
    for(let item of result) {
        const { id: new_id } = item; 

        if(black_list && black_list.length > 0) {
            for(let jtem of black_list) {
                const { id: local_id } = jtem;

                if(local_id == new_id) {
                    list.push(Object.assign({}, jtem, item));
                }
            }
        } else {
            list = result;
        }
    }

    local.set('black_list', list);
});

// 如果localStorage已经有了配置，那合并
const oldStorage = local.toObject();
const newStorage = local.fromObject(Object.assign({}, options, oldStorage));

module.exports = { local };