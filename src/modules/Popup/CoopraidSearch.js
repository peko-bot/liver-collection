/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-30 15:11:32
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 11:30:59
 */
import React, { Component } from 'react';

import { Input, Switch, Tooltip } from 'antd';

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
	environment = { store: new store('options') };
}
const { store: STORE } = environment;

import './css/CoopraidSearch.css';

export default class CoopraidSearch extends Component {
	constructor (props) {
		super(props);

		const coopraidSearchValue = STORE.get('search') || '';

		this.state = {
			coopraidSearchValue,
			coopraidSwitchChecked: !!coopraidSearchValue,
		};

		!!coopraidSearchValue && this.handleSearch();
	}

    componentDidMount = () => {

    }

    handleSearch = () => {
    	const { coopraidSearchValue } = this.state;

    	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    		STORE.set('search', coopraidSearchValue);

    		port.postMessage({ message: 'open_coopraid_search', search: coopraidSearchValue });
    	});
    }

    handleCoopraidSearch = event => this.setState({ coopraidSearchValue: event.target.value });

    handleCoopraidSwitch = checked => {
    	if(checked) {
    		this.handleSearch();
    	} else {
    		STORE.remove('search');
    		this.setState({ coopraidSearchValue: '' });
    	}

    	this.setState({ coopraidSwitchChecked: checked });
    }

    render = () => {
    	const { coopraidSearchValue, coopraidSwitchChecked } = this.state;

    	return (
    		<div className='CoopraidSearch'>
    			<Input style={{ width: '90%' }} onChange={ this.handleCoopraidSearch } value={ coopraidSearchValue } placeholder='这里填房间描述' />
    			<WhiteSpace />

    			<div style={{ marginLeft: '6%' }}>
    				<Tooltip title='看见上面的文本框了么，填了这个你才能开启搜索'>
    					<span style={{ float: 'left', color: '#666' }}>是否开启共斗搜索</span>
    				</Tooltip>
    				<Switch disabled={ !coopraidSearchValue } onChange={ this.handleCoopraidSwitch } checked={ coopraidSwitchChecked } style={{ float: 'right', marginRight: '6%' }} />
    				<div style={{ clear: 'both' }} ></div>
    			</div>
    			<WhiteSpace />
    		</div>
    	);
    }
}