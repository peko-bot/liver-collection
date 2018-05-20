/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 14:46:14 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-05-20 19:16:11
 */
import React, { Component } from 'react'

import { Button,Input, Select, Tooltip } from 'antd'
const Option = Select.Option;

import './css/Popup.css'

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn_loading: false,
            address: 'localhost:8023',
            head_address: 'http://',
        }
    }

    componentDidMount = () => {
        // 获得当前选中标签
        // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, { message: 'test' }, function(response) { // popup => contentscript
        //         console.log(response)
        //     });
        // });
    }

    handle_upload = () => {
        this.setState({ btn_loading: true });
        
        this.load_item_datas('http://game.granbluefantasy.jp/item/article_list_by_filter_mode', result => {
            this.load_item_datas('http://game.granbluefantasy.jp/item/recovery_and_evolution_list_by_filter_mode', recovery => {
                recovery = this.steam_roller(recovery);
    
                result = [...result, ...recovery];
    
                this.upload_item_datas(result, result => {
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

    load_item_datas = (url, callback) => {
        fetch(url, {
            credentials: 'include', // 加入cookie
        }).then(result => result.json()).then(result => callback(result));
    }

    upload_item_datas = (data, callback) => {
        const { head_address, address } = this.state;

        fetch(`${head_address}${address}/Memo/gbf/i_item.do`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'user_id=6964955&data=' + JSON.stringify(data),
        }).then(result => result.text()).then(result => callback(result));
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
                <Tooltip title='服务器地址'>
                    <Input addonBefore={ selectBefore } style={{ width: '90%' }} onChange={ this.handle_address } value={ address } />
                </Tooltip>
                <div className='white-space' />
                <Tooltip title='会上传item中素材和回复'>
                    <Button type='primary' loading={ btn_loading } onClick={ this.handle_upload } style={{ width: '90%' }}>上传素材</Button>
                </Tooltip>
            </div>
        )
    }
}