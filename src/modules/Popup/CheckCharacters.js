/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-30 15:03:11 
 * @Last Modified by:   zy9 
 * @Last Modified time: 2018-06-30 16:03:19 
 */
import React, { Component } from 'react'

import { Button } from 'antd'

import './css/CheckCharacters.css'

export default class CheckCharacters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            check_ub_characters_btn_loading: false,
        }
    }

    componentDidMount = () => {
    
    }

    handle_check_ub_characters = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });
            
            port.postMessage({ message: 'check_ub_characters' });

            port.onMessage.addListener(response => {
                const { datas } = response;

                console.log(datas)
                // TODO: 递归请求队友人物页数据
            });
        });
    }

    render = () => {
        const { check_ub_characters_btn_loading } = this.state;

        return (
            <div className='CheckCharacters'>
                <Button type='primary' loading={ check_ub_characters_btn_loading } onClick={ this.handle_check_ub_characters } style={{ width: '90%' }}>严格检查骑空士队友是否失格</Button>
            </div>
        )
    }
}