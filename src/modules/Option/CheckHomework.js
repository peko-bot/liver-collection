/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-17 21:31:53 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 00:04:01
 */
import React, { Component } from 'react'

import { Button, Table } from 'antd'

import WhiteSpace from '../../component/white-space'

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

export default class CheckHomework extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            loading: false,
        }
    }

    handle_homework = () => {
        this.setState({ loading: true });

        chrome.tabs.query({ active: false }, tabs => {
            let tab_id;
            for(let tab of tabs) {
                const { id, url } = tab;
    
                if(tab.url.includes('game')) {
                    tab_id = id;
    
                    break;
                }
            }
    
            const port = chrome.tabs.connect(tab_id, { name: 'popup_to_content' });
    
            port.postMessage({ message: 'check_homework' });
        });

        // 轮询获得团员id
        let timer;

        timer = setInterval(() => {
            if(window.memberDatas && window.memberDatas.length > 0) {
                this.setState({ dataSource: window.memberDatas, loading: false });

                clearInterval(timer);
            }
        }, 800)
    }

    render = () => {
        const { dataSource, loading } = this.state;
          
        const table = <Table dataSource={ dataSource } columns={ this.columns } rowKey='id' />

        return (
            <div className='CheckHomework' style={{ marginLeft: '1%' }}>
                <Button loading={ loading } type='primary' onClick={ this.handle_homework }>检查当天本战作业</Button>
                <WhiteSpace />

                {  dataSource && dataSource.length != 0 && table }
            </div>
        )
    }

    columns = [
        {
            title: '名字',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '等级',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: '当日贡献',
            dataIndex: 'singleDayPoint',
            key: 'singleDayPoint',
        },
        {
            title: '累计贡献',
            dataIndex: 'totalPoint',
            key: 'totalPoint',
        },
        {
            title: '排名',
            dataIndex: 'rank',
            key: 'rank',
        },
        {
            title: '上次登录时间',
            dataIndex: 'last_login',
            key: 'last_login'
        },
    ]
}