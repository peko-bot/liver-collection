/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-17 21:31:53
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-26 17:41:50
 */
import React, { Component } from 'react';

import { Button, Table, Tooltip, InputNumber, DatePicker } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';

const { RangePicker } = DatePicker;

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
	environment = { store: new store() };
}
const { store: STORE } = environment;

export default class CheckHomework extends Component {
	constructor (props) {
		super(props);

		this.state = {
			dataSource: [],
			loading: false,
			groupId: '',
		};

		window.checkHomeworkStart = parseInt(new Date(moment().format('YYYY/MM/DD') + ' 00:00:00').getTime() / 1000);
		window.checkHomeworkEnd = parseInt(new Date(moment().add(1, 'days').format('YYYY/MM/DD') + '00:00:00').getTime() / 1000);
	}

    handleHomework = () => {
    	const { groupId } = this.state;

    	this.setState({ loading: true });

    	chrome.tabs.query({ active: false }, tabs => {
    		let tabId;

    		for(let tab of tabs) {
    			const { id, url } = tab;

    			if(tab.url.includes('game')) {
    				tabId = id;

    				break;
    			}
    		}

    		const port = chrome.tabs.connect(tabId, { name: 'popup_to_content' });

    		port.postMessage({ message: 'check_homework', groupId });
    	});

    	// 轮询获得团员id
    	let timer;

    	timer = setInterval(() => {
    		if(window.memberDatas && window.memberDatas.length > 0) {
    			this.setState({ dataSource: window.memberDatas, loading: false });

    			clearInterval(timer);
    		}
    	}, 800);
    }

	handleRangePicker = (date, dateString) => {
		window.checkHomeworkStart = parseInt(new Date(dateString[0]).getTime() / 1000);
		window.checkHomeworkEnd = parseInt(new Date(dateString[1]).getTime() / 1000);
	}

	handleGroupId = groupId => this.setState({ groupId });

    render = () => {
    	const { dataSource, loading } = this.state;

    	const table = <Table dataSource={ dataSource } columns={ this.columns } rowKey='id' />;

    	return (
    		<div className='CheckHomework' style={{ marginLeft: '1%' }}>
    			<div>
    				<Tooltip title='起止时间都是当日0点'>
    					<span style={{ marginRight: 10 }}>历史时段：</span>
    				</Tooltip>
    				<RangePicker onChange={ this.handleRangePicker } placeholder={ ['开始时间', '结束时间'] } style={{ width: 220 }} />
    			</div>
    			<WhiteSpace />

    			<div style={{ marginRight: 10, display: 'inline' }}>
    				<Tooltip title='这里输入团id，不填默认看自己团的'>
    					<span style={{ marginRight: 10 }}>非本团id：</span>
    					<InputNumber style={{ width: 220 }} onChange={ this.handleGroupId } />
    				</Tooltip>
    			</div>
    			<Tooltip title='本战未开始时，数据会有误差。因为时间是从当天早上五点开始计算贡献的，预选期间因为当日贡献度清零不在五点，所以会产生误差，也就是当日贡献这列可以不看，但总贡献始终都是准的'>
    				<Button loading={ loading } type='primary' onClick={ this.handleHomework }>检查作业</Button>
    			</Tooltip>
    			<WhiteSpace />

    			{  dataSource && dataSource.length != 0 && table }
    		</div>
    	);
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
    		title: '时段内贡献',
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
    	{
    		title: '最后更新时间',
    		dataIndex: 'timeStamp',
    		key: 'timeStamp'
    	},
    ]
}