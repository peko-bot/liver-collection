/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-30 15:20:01
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-22 10:10:23
 */
import React, { Component } from 'react';

import { Slider } from 'antd';

import WhiteSpace from '../../component/white-space';

import store from '../../../util/Store';

import './css/SetZoom.css';

/**
 * start时是没有chrome的api的，用到localStorage的地方都会报错，
 * 这会让我感觉很多无关紧要的代码白写了，很气，
 * 于是有了以下容错
 * TODO: 这些初始化到background中
*/
let environment;

if (chrome.extension) {
	environment = chrome.extension.getBackgroundPage();
} else {
	environment = { store: new store() };
}
const { store: STORE } = environment;

export default class SetZoom extends Component {
	constructor (props) {
		super(props);

		this.state = {
			defaultZoom: STORE.get('zoom')
		};
	}

    componentDidMount = () => {

    }

    handleZoom = zoom => {
    	STORE.set('zoom', zoom);

    	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    		port.postMessage({ zoom, message: 'set_zoom' });
    	});
    }

    render = () => {
    	const { defaultZoom } = this.state;

    	return (
    		<div className='SetZoom'>
    			<div style={{ margin: '0 6%', textAlign: 'left' }}>
    				<span style={{ color: '#666' }}>调节窗口大小</span>
    				<Slider step={ 0.01 } min={ 0.7 } max={ 2 } defaultValue={ defaultZoom } onChange={ this.handleZoom } />
    			</div>
    			<WhiteSpace />
    		</div>
    	);
    }
}