/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 14:46:14 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-08 16:37:03
 */
import React, { Component } from 'react'

import { Button, Input, Select, notification, Switch } from 'antd'
const Option = Select.Option;

import * as Request from '../../util/Request'

import './css/Popup.css'

const head = 'http://';
const host = 'localhost:8023';
const article = 'http://game.granbluefantasy.jp/item/article_list_by_filter_mode'; // item第二页，红跟豆那页
const recovery = 'http://game.granbluefantasy.jp/item/recovery_and_evolution_list_by_filter_mode'; // item第一页，日常素材

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn_loading: false,
            btn_type: 'primary',
            address: host,
            head_address: head,
            tooltip_text: '',
        }
    }

    componentDidMount = () => {
        
    }

    handle_upload = () => {
        const { head_address, address } = this.state;

        this.setState({ btn_loading: true });
        
        Request.get_by_cookie(article, {}, result => {
            Request.get_by_cookie(recovery, {}, recovery => {
                recovery = this.steam_roller(recovery);
    
                result = [...result, ...recovery];
    
                Request.upload_to_server(`${head_address}${address}/Memo/gbf/i_item.do`, { body: 'user_id=6964955&data=' + JSON.stringify(result) }, result => {
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
        let newArr = [];

        for(let item of arr) {
            Array.isArray(item) ? newArr.push.apply(newArr, this.steam_roller(item)) : newArr.push(item);
        }

        return newArr;
    }

    handle_address = event => this.setState({ address: event.target.value });

    handle_head_address = value => this.setState({ head_address: value });

    handle_switch_checked = checked => {
        checked && Request.extensions_to_content({ message: 'init_coopraid_listener' }, response => {
            const { tasks } = response;
    
            switch(tasks.message) {
                case 'success':
    
                break;
    
                case 'failed':
                    notification.open({
                        message: '开启失败',
                        description: '',
                        duration: 3
                    });

                    console.log(tasks.error);
                break;
    
                default:
    
                break;
            }
        });
    }

    render = () => {
        const { btn_loading, address } = this.state;

        const selectBefore = (
            <Select defaultValue='http://' style={{ width: 90 }} onChange={ this.handle_head_address }>
                <Option value='http://'>http://</Option>
                <Option value='https://'>https://</Option>
                <Option value='ftp://'>ftp://</Option>
            </Select>
        );

        return (
            <div className='Popup'>
                <Input addonBefore={ selectBefore } style={{ width: '90%' }} onChange={ this.handle_address } value={ address } />
                <div className='white-space' />

                <Button type='primary' loading={ btn_loading } onClick={ this.handle_upload } style={{ width: '90%' }}>上传素材</Button>
                <div className='white-space' />

                <div style={{ marginLeft: '6%' }}>
                    <span style={{ float: 'left', color: '#666' }}>是否开启共斗搜索</span>
                    <Switch onChange={ this.handle_switch_checked } style={{ float: 'right', marginRight: '6%' }} />
                </div>
                
            </div>
        )
    }
}