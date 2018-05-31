/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 14:46:14 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-05-31 22:26:03
 */
import React, { Component } from 'react'

import { Button,Input, Select, Tooltip, notification } from 'antd'
const Option = Select.Option;

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
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                console.log(request)
                sendResponse('test');
            }
        );
    }

    handle_upload = () => {
        this.setState({ btn_loading: true });
        
        this.load_item_datas(article, result => {
            this.load_item_datas(recovery, recovery => {
                recovery = this.steam_roller(recovery);
    
                result = [...result, ...recovery];
    
                this.upload_item_datas(result, result => {
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

    // 处理异常
    handle_fetch_error = error => {
        notification.open({
            message: '上传失败',
            description: '先看看网，再看看是不是地址错了',
            duration: 3
        });
        this.setState({ btn_loading: false });
    }

    // 数组扁平化
    steam_roller = arr => {
        let newArr = [];

        for(let item of arr) {
            Array.isArray(item) ? newArr.push.apply(newArr, this.steam_roller(item)) : newArr.push(item);
        }

        return newArr;
    }

    load_item_datas = (url, callback) => {
        fetch(url, {
            credentials: 'include', // 加入cookie
        }).then(result => result.json()).then(result => callback(result))
        .catch(this.handle_fetch_error);
    }

    upload_item_datas = (data, callback) => {
        const { head_address, address } = this.state;

        fetch(`${head_address}${address}/Memo/gbf/i_item.do`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'user_id=6964955&data=' + JSON.stringify(data),
        }).then(result => result.text()).then(result => callback(result))
        .catch(this.handle_fetch_error);
    }

    handle_address = event => {
        this.setState({ address: event.target.value });
    }

    handle_head_address = value => {
        this.setState({ head_address: value });
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
                <Tooltip title='地址可别输错了..'>
                    <Input addonBefore={ selectBefore } style={{ width: '90%' }} onChange={ this.handle_address } value={ address } />
                </Tooltip>
                <div className='white-space' />
                <Tooltip title=''>
                    <Button type='primary' loading={ btn_loading } onClick={ this.handle_upload } style={{ width: '90%' }}>上传素材</Button>
                </Tooltip>
            </div>
        )
    }
}