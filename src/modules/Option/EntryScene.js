/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-21 09:53:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-06 22:40:48
 */
import React, { Component } from 'react';

import { Input, InputNumber, Tooltip, Switch } from 'antd';

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

export default class EntryScene extends Component {
    handleApLimit = value => STORE.set('entrySceneApLowerLimit', value);

	handleHref = e => STORE.set('sceneHref', e.target.value);

	handleSwitchOnChange = checked => {
		STORE.set('isListenToKeyBoard', checked);

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

    		port.postMessage({ message: 'listen_to_key_board', status: checked });
		});

		this.setState({});
	};

	handleHasHL = checked => STORE.set('checkHL', checked);

	handleRedoSwitchOnChange = checked => STORE.set('isRedoEntryScene', checked);

    render = () => {
    	return (
    		<div className='EntryScene' style={{ marginLeft: '1%', marginTop: 10 }}>
    			<Tooltip title='开启该选项时，键盘功能，比如F键按下去才会刷新'>
    				<span style={{ float: 'left', color: '#666' }}>是否监听键盘</span>
    			</Tooltip>
    			<Switch onChange={ this.handleSwitchOnChange } defaultChecked={ STORE.get('isListenToKeyBoard') } style={{ float: 'right', marginRight: '85%' }} />
    			<WhiteSpace clear />

    			<Tooltip title='开启该选项时，会在结算页自动跳转到下面的地址'>
    				<span style={{ float: 'left', color: '#666' }}>是否自动跳转</span>
    			</Tooltip>
    			<Switch onChange={ this.handleRedoSwitchOnChange } defaultChecked={ STORE.get('isRedoEntryScene') } style={{ float: 'right', marginRight: '85%' }} disabled={ !STORE.get('isListenToKeyBoard') } />
    			<WhiteSpace clear style={{ height: 8 }} />

    			<Tooltip title='（周回无HL本时，不建议开启该选项）开启该选项时，在结算页会判断是否出现HL，如果有，则停止并弹框提示；否则继续周回'>
    				<span>是否检查HL：</span>
    			</Tooltip>
    			<Switch onChange={ this.handleHasHL } defaultChecked={ STORE.get('checkHL') } style={{ float: 'right', marginRight: '85%' }} disabled={ !STORE.get('isListenToKeyBoard') } />
    			<WhiteSpace clear />

    			<Tooltip title='当ap小于这个值时，会吃一个小红，默认为40'>
    				<span>AP下限：&nbsp;&nbsp;&nbsp;</span>
    			</Tooltip>
    			<InputNumber onChange={ this.handleApLimit } defaultValue={ STORE.get('entrySceneApLowerLimit') } disabled={ !STORE.get('isListenToKeyBoard') } />
    			<WhiteSpace clear />

    			<Tooltip title='这里填一个完整地址，比如http://game.granbluefantasy.jp/#quest/supporter/730571/1，按D键时会跳到这个地址并自动吃药'>
    				<span>跳转地址：</span>
    			</Tooltip>
    			<Input style={{ width: 400 }} onChange={ this.handleHref } defaultValue={ STORE.get('sceneHref') } disabled={ !STORE.get('isListenToKeyBoard') } />
    			<WhiteSpace clear />
    		</div>
    	);
    }
}