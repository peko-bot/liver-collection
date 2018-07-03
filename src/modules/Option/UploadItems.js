/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-30 15:34:22 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-03 17:09:33
 */
import React, { Component } from 'react'

import { Button, Input, Select, notification } from 'antd'
const Option = Select.Option;

import WhiteSpace from '../../component/white-space'

import * as Request from '../../../util/Request'
import store from '../../../util/Store'

/**
 * start时是没有chrome的api的，用到localStorage的地方都会报错，
 * 这会让我感觉很多无关紧要的代码白写了，很气，
 * 于是有了以下容错
 * TODO: 这些初始化到background中
*/
let environment;
if(chrome.extension) {
    environment = chrome.extension.getBackgroundPage();
} else {
    environment = { store: new store() };
}
const { store: STORE } = environment;

// item第二页，红跟豆那页
const article = 'http://game.granbluefantasy.jp/item/article_list_by_filter_mode';
// item第一页，日常素材
const recovery = 'http://game.granbluefantasy.jp/item/recovery_and_evolution_list_by_filter_mode';

export default class UploadItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: STORE.get('address'),
            head_address: STORE.get('head_address'),
            btn_loading: false,
        }
    }

    componentDidMount = () => {
    
    }

    handle_address = event => this.setState({ address: event.target.value });

    handle_head_address = head_address => this.setState({ head_address });

    handle_upload = () => {
        const { head_address, address } = this.state;

        STORE.set('address', address);
        STORE.set('head_address', head_address);

        this.setState({ btn_loading: true });

        const user_id = STORE.get('userId');
        if(!user_id) {
            notification.open({
                message: '非法操作',
                description: '没获得到userId',
                duration: 3
            });

            this.setState({ btn_loading: false });
            
            return;
        }
        
        Request.get_by_cookie(article, {}, result => {
            Request.get_by_cookie(recovery, {}, recovery => {
                recovery = this.steam_roller(recovery);
    
                result = [...result, ...recovery];
    
                const body = `user_id=${ user_id }&data=${JSON.stringify(result)}`;
                Request.upload_to_server(`${head_address}${address}/Memo/gbf/i_item.do`, { body }, result => {
                    if(result == 'success') {
                        notification.open({
                            message: '上传成功',
                            description: '',
                            duration: 3
                        });
                    }
                    
                    this.setState({ btn_loading: false });
                });
            });
        });
    }

    // 数组扁平化
    steam_roller = arr => {
        let new_arr = [];

        for(let item of arr) {
            Array.isArray(item) ? new_arr.push.apply(new_arr, this.steam_roller(item)) : new_arr.push(item);
        }

        return new_arr;
    }

    render = () => {
        const { address, head_address, btn_loading } = this.state;

        const selectBefore = (
            <Select defaultValue={ head_address } style={{ width: 90 }} onChange={ this.handle_head_address }>
                <Option value='http://'>http://</Option>
                <Option value='https://'>https://</Option>
                <Option value='ftp://'>ftp://</Option>
            </Select>
        );

        return (
            <div className='UploadItems'>
                <span>上传地址：</span>
                <Input addonBefore={ selectBefore } style={{ width: '20%' }} onChange={ this.handle_address } value={ address } />
                <Button type='primary' loading={ btn_loading } onClick={ this.handle_upload } style={{ marginLeft: '2%', width: '15%' }}>上传素材</Button>
                <WhiteSpace />
            </div>
        )
    }
}