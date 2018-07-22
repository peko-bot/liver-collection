/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-13 19:35:55
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 09:30:50
 */
import React, { Component } from 'react';

import { Switch, Tooltip } from 'antd';

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

export default class GachaOptions extends Component {
	constructor (props) {
		super(props);

		this.state = {
			checked: STORE.get('isEunuch'),
			title: '开启该选项时，你将成为穷空士',
		};
	}

    handleSwitchOnChange = checked => {
    	STORE.set('isEunuch', checked);

    	if(chrome.extension && checked) {
    		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    			const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    			port.postMessage({ message: 'to_be_a_eunuch', status: checked });
    		});

    		this.setState({ title: '这就是我想要的生活（便乘' });
    	}

    	if(chrome.extension && !checked) {
    		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    			const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    			port.postMessage({ message: 'to_be_a_gbfer', status: checked });
    		});

    		this.setState({ title: '开启该选项时，你将成为穷空士' });
    	}

    	this.setState({ checked });
    }

    render = () => {
    	const { checked, title } = this.state;

    	return (
    		<div className='GachaOptions'>
    			<div style={{ marginLeft: '6%' }}>
    				<Tooltip title={ title }>
    					<span style={{ float: 'left', color: '#666' }}>是否精神阉割骑空士</span>
    				</Tooltip>
    				<Switch onChange={ this.handleSwitchOnChange } defaultChecked={ checked } disabled={ checked } style={{ float: 'right', marginRight: '6%' }} />
    				<WhiteSpace clear />
    			</div>
    			<WhiteSpace clear />
    		</div>
    	);
    }
}