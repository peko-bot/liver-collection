/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-08-02 12:00:57
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-06 22:08:24
 */
import React, { Component } from 'react';

import { Tooltip, Switch, InputNumber } from 'antd';

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

export default class MyPageOptions extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

	handleHideSwitch = checked => {
		STORE.set('isShowYourWife', checked);

		chrome.extension && chrome.tabs.query({ active: false }, tabs => {
    		let tabId;

    		for(let tab of tabs) {
    			const { id, url } = tab;

    			if(tab.url.includes('game')) {
    				tabId = id;

    				break;
    			}
    		}

    		const port = chrome.tabs.connect(tabId, { name: 'popup_to_content' });

    		port.postMessage({ message: 'show_your_wife', status: checked, interval: STORE.get('howLongToShowYourWife') });
    	});
	}

	handleTimeInterval = value => STORE.set('howLongToShowYourWife', value);

    render = () => {
    	// disabled={ !STORE.get('isShowYourWife') }
    	return (
    		<div className='MyPageOptions' style={{ marginLeft: '1%' }}>
    			<Tooltip title='（暂时只有开关有效）开启该选项时，当你停在主页一段时间后，无关项将会被隐藏，只留立绘和背景。鼠标移入后会显示所有'>
    				<span style={{ float: 'left', color: '#666' }}>隐藏主页无关项</span>
    			</Tooltip>
    			<Switch onChange={ this.handleHideSwitch } defaultChecked={ STORE.get('isShowYourWife') } style={{ float: 'right', marginRight: '85%' }} />
    			<WhiteSpace clear />

    			<Tooltip title='多久才会隐藏无关项（暂时无效）'>
    				<span style={{ float: 'left', color: '#666' }}>时间间隔：</span>
    			</Tooltip>
    			<InputNumber style={{ float: 'left', marginLeft: 10, width: 100, marginBottom: 10 }} onChange={ this.handleTimeInterval } defaultValue={ STORE.get('howLongToShowYourWife') } disabled={ true } />
    			<WhiteSpace clear />
    		</div>
    	);
    }
}