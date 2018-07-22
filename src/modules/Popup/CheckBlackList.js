/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-01 10:39:37
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 12:07:28
 */
import React, { Component } from 'react';

import { Button, notification, Table } from 'antd';

import WhiteSpace from '../../component/white-space';

import store from '../../../util/Store';

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
	constructor (props) {
		super(props);

		this.state = {
			exportLoading: false,
			checkLoading: false,
			disabled: false,
		};
	}

    componentDidMount = () => {
    	// 不在人员页面时，检查功能禁用
    	chrome.extension && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    		port.postMessage({ message: 'isCharacterPage' });

    		port.onMessage.addListener(response => {
    			const { flag } = response;

    			this.setState({ disabled: !flag });
    		});
    	});
    }

    handleExportBlackList = () => {
    	const data = JSON.stringify(STORE.get('blackList'));

    	// 下载json文件
    	let vLink = document.createElement('a'),
    		vBlob = new Blob([data], { type: 'octet/stream' }),
    		vName = 'black_list.json',
    		vUrl = window.URL.createObjectURL(vBlob);

    	vLink.setAttribute('href', vUrl);
    	vLink.setAttribute('download', vName);

    	vLink.click();
    }

    handleCheckBlackList = () => {
    	chrome.extension && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    		this.setState({ checkLoading: true });

    		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    		port.postMessage({ message: 'checkBlackList' });

    		port.onMessage.addListener(response => {
    			const { datas } = response;

    			let targetUsers = [];

    			for(let item of datas) {
    				const { nickName, userId } = item;

    				for(let jtem of STORE.get('blackList')) {
    					const { id, description } = jtem;

    					if(userId == id) {
    						targetUsers.push({ id, nickName, description });
    					}
    				}
    			}

    			const haveTarget = <Table scroll={{ y: 280 }} columns={ columns } dataSource={ targetUsers } pagination={ false } rowKey='id' />;

    			notification.open({
    				message: targetUsers.length ? '有目标人物' : '无目标人物',
    				description: targetUsers.length ? haveTarget : `你和另${ datas.length }个人的关系尚未发生，可能有新的基会。咦？为什么会多了一个人？`,
    				duration: null
    			});

    			this.setState({ checkLoading: false });
    		});
    	});
    }

    render = () => {
    	const { exportLoading, checkLoading, disabled } = this.state;

    	return (
    		<div className='CheckBlackList'>
    			<Button type='primary' loading={ exportLoading } onClick={ this.handleExportBlackList } style={{ width: '90%' }}>下载黑名单</Button>
    			<WhiteSpace />
    			<Button type='primary' loading={ checkLoading } disabled={ disabled } onClick={ this.handleCheckBlackList } style={{ width: '90%' }}>检查黑名单</Button>
    			<WhiteSpace />
    		</div>
    	);
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
];