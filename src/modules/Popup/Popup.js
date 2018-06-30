/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 14:46:14 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-30 13:44:15
 */
import React, { Component } from 'react'

import { Button, Input, Select, notification, Switch, Tooltip, Slider } from 'antd'
const Option = Select.Option;

import * as Request from '../../../util/Request'
import store from '../../../util/Store'

/**
 * start时是没有chrome的api的，用到localStorage的地方都会报错，
 * 这会让我感觉很多无关紧要的代码白写了，很气，
 * 于是有了以下容错
*/
let environment;
if(chrome.extension) {
    environment = chrome.extension.getBackgroundPage();
} else {
    environment = { store: new store() };
}
const { store: STORE } = environment;

import './css/Popup.css'

// item第二页，红跟豆那页
const article = 'http://game.granbluefantasy.jp/item/article_list_by_filter_mode';
// item第一页，日常素材
const recovery = 'http://game.granbluefantasy.jp/item/recovery_and_evolution_list_by_filter_mode';

export default class Popup extends Component {
    constructor(props) {
        super(props);

        const coopraid_search_value = STORE.get('search') || '';

        this.state = {
            btn_loading: false,
            btn_type: 'primary',
            address: 'localhost:8023',
            head_address: 'http://',
            coopraid_search_value,
            coopraid_switch_checked: !!coopraid_search_value,
            defaultZoom: STORE.get('zoom'),
        }

        !!coopraid_search_value && this.handle_search();
    }

    componentWillMount = () => {

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
        let new_arr = [];

        for(let item of arr) {
            Array.isArray(item) ? new_arr.push.apply(new_arr, this.steam_roller(item)) : new_arr.push(item);
        }

        return new_arr;
    }

    handle_address = event => this.setState({ address: event.target.value });

    handle_head_address = head_address => this.setState({ head_address });

    handle_coopraid_search = event => this.setState({ coopraid_search_value: event.target.value });

    handle_coopraid_switch = checked => {
        if(checked) {
            this.handle_search();
        } else {
            STORE.remove('search');
            this.setState({ coopraid_search_value: '' });
        }

        this.setState({ coopraid_switch_checked: checked });
    }

    handle_search = () => {
        const { coopraid_search_value } = this.state;
        
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

            STORE.set('search', coopraid_search_value);
            
            port.postMessage({ message: 'open_coopraid_search', search: coopraid_search_value });
        });
    }

    handle_zoom = zoom => {
        STORE.set('zoom', zoom);

        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });
            
            port.postMessage({ zoom, message: 'set_zoom' });
        });
    }

    render = () => {
        const { btn_loading, address, coopraid_search_value, defaultZoom, coopraid_switch_checked } = this.state;

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

                <Input style={{ width: '90%' }} onChange={ this.handle_coopraid_search } value={ coopraid_search_value } placeholder='这里填房间描述' />
                <div className='white-space' />
                
                <div style={{ marginLeft: '6%' }}>
                    <Tooltip title='看见上面的文本框了么，填了这个你才能开启搜索'>
                        <span style={{ float: 'left', color: '#666' }}>是否开启共斗搜索</span>
                        <Switch disabled={ !coopraid_search_value } onChange={ this.handle_coopraid_switch } checked={ coopraid_switch_checked } style={{ float: 'right', marginRight: '6%' }} />
                        <div style={{ clear: 'both' }} ></div>
                    </Tooltip>
                </div>
                <div className='white-space' />
                
                <div style={{ margin: '0 6%', textAlign: 'left' }}>
                    <span style={{ color: '#666' }}>调节窗口大小</span>
                    <Slider step={ 0.01 } min={ 0.3 } max={ 1.5 } defaultValue={ defaultZoom } onChange={ this.handle_zoom } />
                </div>
            </div>
        )
    }
}