/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-30 15:34:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-20 23:55:29
 */
import React, { Component } from 'react';

import { Button, Input, Select, notification } from 'antd';
const Option = Select.Option;

import WhiteSpace from '../../component/white-space';

import * as Request from '../../../util/Request';
import store from '../../../util/Store';

import './css/UploadItems.css';

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
const article = '/item/article_list_by_filter_mode';
// item第一页，日常素材
const recovery = '/item/recovery_and_evolution_list_by_filter_mode';

export default class UploadItems extends Component {
	constructor (props) {
		super(props);

		this.state = {
			address: STORE.get('address'),
			headAddress: STORE.get('headAddress'),
			btnLoading: false,
		};
	}

    componentDidMount = () => {

    }

    handleAddress = event => this.setState({ address: event.target.value });

    handleHeadAddress = headAddress => this.setState({ headAddress });

    handleUpload = () => {
    	const { headAddress, address } = this.state;

    	STORE.set('address', address);
    	STORE.set('headAddress', headAddress);

    	this.setState({ btnLoading: true });

    	const userId = STORE.get('userId');

    	if(!userId) {
    		notification.open({
    			message: '非法操作',
    			description: '没获得到userId',
    			duration: 3
    		});

    		this.setState({ btnLoading: false });

    		return;
    	}

    	Request.getByCookie(article, {}, result => {
    		Request.getByCookie(recovery, {}, recovery => {
    			recovery = this.steamRoller(recovery);

    			result = [...result, ...recovery];

    			const body = `user_id=${ userId }&data=${JSON.stringify(result)}`;

    			Request.uploadToServer(`${headAddress}${address}/Memo/gbf/i_item.do`, { body }, result => {
    				if(result == 'success') {
    					notification.open({
    						message: '上传成功',
    						description: '',
    						duration: 3
    					});
    				}

    				this.setState({ btnLoading: false });
    			});
    		});
    	});
    }

    // 数组扁平化
    steamRoller = arr => {
    	let newArr = [];

    	for(let item of arr) {
    		Array.isArray(item) ? newArr.push.apply(newArr, this.steamRoller(item)) : newArr.push(item);
    	}

    	return newArr;
    }

    render = () => {
    	const { address, headAddress, btnLoading } = this.state;

    	const selectBefore = (
    		<Select defaultValue={ headAddress } style={{ width: 90 }} onChange={ this.handleHeadAddress }>
    			<Option value='http://'>http://</Option>
    			<Option value='https://'>https://</Option>
    			<Option value='ftp://'>ftp://</Option>
    		</Select>
    	);

    	return (
    		<div className='UploadItems'>
    			<Input addonBefore={ selectBefore } style={{ width: '90%' }} onChange={ this.handleAddress } value={ address } />
    			<WhiteSpace />

    			<Button type='primary' loading={ btnLoading } onClick={ this.handleUpload } style={{ width: '90%' }}>上传素材</Button>
    			<WhiteSpace />
    		</div>
    	);
    }
}