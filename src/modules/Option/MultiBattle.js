/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-03 17:20:19
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-21 11:05:51
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

export default class MultiBattle extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isMultil: STORE.get('isMultil'), // 是否开启舔婊模式
			isListenBoard: STORE.get('isListenBoard'), // 是否监视剪切板
			isListenBp: STORE.get('isListenBp'), // 是否监视bp
			isRape: STORE.get('isRape'), // 是否强行进入
		};
	}

    componentDidMount = () => {

    }

    handleSwitchOnChange = (name, checked) => {
    	STORE.set(name, checked);

    	// 舔婊模式开启时，令popup失效
    	name == 'isMultil' && chrome.browserAction.setPopup({ popup: checked ? '' : 'index.html' });

    	this.setState({ [name]: checked });
    }

    render = () => {
    	const { isMultil, isListenBoard, isListenBp, isRape } = this.state;

    	/* 上一个选项未开启时，禁用下方所有选项 */
    	return (
    		<div className='MultiBattle' style={{ marginLeft: '1%' }}>
    			<Tooltip title='开启该选项时，点击icon将不会点开面板，而会照着下方几个选项决定行为，默认为读取剪切板中内容请求battle信息，不报错则进房'>
    				<span style={{ float: 'left', color: '#666' }}>是否开启舔婊模式</span>
    			</Tooltip>
    			<Switch onChange={ checked => this.handleSwitchOnChange('isMultil', checked) } checked={ isMultil } style={{ float: 'right', marginRight: '85%' }} />
    			<WhiteSpace clear />

    			<Tooltip title='开启该选项时，当你的剪切板内容发生变化且内容像battle id时，会直接进房，而不用点icon。初次开启时，两个窗口都需要刷新下'>
    				<span style={{ float: 'left', color: '#666' }}>是否监视剪切板</span>
    			</Tooltip>
    			<Switch onChange={ checked => this.handleSwitchOnChange('isListenBoard', checked) } checked={ isListenBoard } disabled={ !isMultil } style={{ float: 'right', marginRight: '85%' }} />
    			<WhiteSpace clear />

    			{/* <Tooltip title='开启该选项且监视剪切板时，每次进房前将不会额外判断bp是否能进房间'>
                    <span style={{ float: 'left', color: '#666' }}>是否监视bp</span>
                </Tooltip>
                <Switch onChange={ checked => this.handleSwitchOnChange('isListenBp', checked) } checked={ isListenBp } disabled={ !isListenBoard } style={{ float: 'right', marginRight: '85%' }} />
                <WhiteSpace clear />

                <Tooltip title='开启该选项时，可以强行进入下一个房间，而不是等当场战斗结束'>
                    <span style={{ float: 'left', color: '#666' }}>是否强行进入</span>
                </Tooltip>
                <Switch onChange={ checked => this.handleSwitchOnChange('isRape', checked) } checked={ isRape } disabled={ !isListenBp } style={{ float: 'right', marginRight: '85%' }} />
                <WhiteSpace clear /> */}
    		</div>
    	);
    }
}