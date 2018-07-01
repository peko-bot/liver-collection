/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-01 10:39:37 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-01 13:09:48
 */
import React, { Component } from 'react'

import { Button, notification, Table } from 'antd'

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
    environment = { store: new store('options') };
}
const { store: STORE } = environment;

export default class CheckBlackList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            export_loading: false,
            check_loading: false,
            disabled: false,
        }
    }

    componentDidMount = () => {
        // 不在人员页面时，检查功能禁用
        chrome.extension && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

            port.postMessage({ message: 'is_character_page' });

            port.onMessage.addListener(response => {
                const { flag } = response;

                this.setState({ disabled: !flag });
            });
        });
    }

    handle_export_black_list = () => {
        const data = JSON.stringify([{ test1: '11', test2: '22' }]);

        // 下载json文件
        let vLink = document.createElement('a'),
        vBlob = new Blob([data], { type: 'octet/stream' }),
        vName = 'black_list.json',
        vUrl = window.URL.createObjectURL(vBlob);
        vLink.setAttribute('href', vUrl);
        vLink.setAttribute('download', vName);

        vLink.click();
    }

    handle_check_black_list = () => {
        chrome.extension && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            this.setState({ check_loading: true });

            const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

            port.postMessage({ message: 'check_black_list' });

            port.onMessage.addListener(response => {
                const { datas } = response;

                let targetUsers = [];
                for(let item of datas) {
                    const { nickName, userId } = item;

                    for(let jtem of STORE.get('black_list')) {
                        const { id, description } = jtem;

                        if(userId == id) {
                            targetUsers.push({ id, nickName, description });
                        }
                    }
                }

                const haveTarget = <Table columns={ columns } dataSource={ targetUsers } pagination={ false } rowKey='id' />;

                notification.open({
                    message: targetUsers.length ? '有目标人物' : '无目标人物',
                    description: targetUsers.length ? haveTarget : `你和另${ datas.length }个人的关系尚未发生，可能有新的基会。咦？为什么会多了一个人？`,
                    duration: null
                });

                this.setState({ check_loading: false });
            });
        });
    }

    render = () => {
        const { export_loading, check_loading, disabled } = this.state;

        return (
            <div className='CheckBlackList'>
                <Button type='primary' loading={ export_loading } onClick={ this.handle_export_black_list } style={{ width: '90%' }}>下载黑名单</Button>
                <WhiteSpace />
                <Button type='primary' loading={ check_loading } disabled={ disabled } onClick={ this.handle_check_black_list } style={{ width: '90%' }}>检查黑名单</Button>
                <WhiteSpace />
            </div>
        )
    }
}

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: 60
    },
    {
        title: '姓名',
        dataIndex: 'nickName',
        key: 'nickName',
        align: 'center',
        width: 100
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
    }
]