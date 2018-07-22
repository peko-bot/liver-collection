/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-02 16:28:55
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 11:10:21
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

export default class ScrollOptions extends Component {
	constructor (props) {
		super(props);

		this.state = {
			checked: STORE.get('isScrollStyleShow'),
		};
	}

    componentDidMount = () => {

    }

    handleSwitchOnChange = checked => {
    	STORE.set('isScrollStyleShow', checked);

    	chrome.extension && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    		port.postMessage({ message: 'scroll_style_status', status: checked });
    	});
    }

    render = () => {
    	const { checked } = this.state;

    	return (
    		<div className='ScrollOptions'>
    			<div style={{ marginLeft: '6%' }}>
    				<Tooltip title='开启该选项时，你鼠标移到滚动条附近，滚动条会变粗三秒'>
    					<span style={{ float: 'left', color: '#666' }}>滚动条样式变化</span>
    					<Switch onChange={ this.handleSwitchOnChange } defaultChecked={ checked } style={{ float: 'right', marginRight: '6%' }} />
    					<div style={{ clear: 'both' }} ></div>
    				</Tooltip>
    			</div>
    			<WhiteSpace />
    		</div>
    	);
    }
}