/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-21 09:53:59 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-21 13:21:41
 */
import React, { Component } from 'react';

import { Input, InputNumber, Tooltip } from 'antd';

import WhiteSpace from '../../component/white-space';

import * as Request from '../../../util/Request';
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

    render = () => {
    	return (
    		<div className='EntryScene' style={{ marginLeft: '1%', marginTop: 10 }}>
    			<Tooltip title='当ap小于这个值时，会吃一个小红，默认为40'>
    				<span>AP下限：&nbsp;&nbsp;&nbsp;</span>
    			</Tooltip>
    			<InputNumber onChange={ this.handleApLimit } defaultValue={ STORE.get('entrySceneApLowerLimit') } />
    			<WhiteSpace />

    			<Tooltip title='这里填一个完整地址，比如http://game.granbluefantasy.jp/#quest/supporter/730571/1，按d键时会跳到这个地址并自动吃药'>
    				<span>跳转地址：</span>
    			</Tooltip>
    			<Input style={{ width: 400 }} onChange={ this.handleHref } defaultValue={ STORE.get('sceneHref') } />
    		</div>
    	);
    }
}