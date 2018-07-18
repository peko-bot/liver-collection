/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-30 22:56:38 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 09:31:01
 */
import React, { Component } from 'react';

import { Switch } from 'antd';

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

export default class SiderOptions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			left_checked: STORE.get('is_left_sider_show'),
			right_checked: STORE.get('is_right_sider_show'),
		};
	}

    componentDidMount = () => {
    
    }

    handle_coopraid_switch = (checked, name) => {
    	STORE.set(name, checked);

    	chrome.extension && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    		port.postMessage({ message: 'sider_status', type: name, status: checked });
    	});
    }

    render = () => {
    	const { left_checked, right_checked } = this.state;

    	return (
    		<div className='SiderOptions'>
    			<div style={{ marginLeft: '6%' }}>
    				<span style={{ float: 'left', color: '#666' }}>左侧面板</span>
    				<Switch onChange={ checked => this.handle_coopraid_switch(checked, 'is_left_sider_show') } defaultChecked={ left_checked } style={{ float: 'right', marginRight: '6%' }} />
    				<div style={{ clear: 'both' }} ></div>
    			</div>
    			<WhiteSpace />
    			<div style={{ marginLeft: '6%' }}>
    				<span style={{ float: 'left', color: '#666' }}>右侧面板</span>
    				<Switch onChange={ checked => this.handle_coopraid_switch(checked, 'is_right_sider_show') } defaultChecked={ right_checked } style={{ float: 'right', marginRight: '6%' }} />
    				<div style={{ clear: 'both' }} ></div>
    			</div>
    			<WhiteSpace />
    		</div>
    	);
    }
}