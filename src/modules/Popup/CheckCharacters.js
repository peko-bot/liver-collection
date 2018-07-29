/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-30 15:03:11
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 07:57:54
 */
import React, { Component } from 'react';

import { Button, notification, Table } from 'antd';

import WhiteSpace from '../../component/white-space';

import { getByCookie } from '../../../util/Request';

import './css/CheckCharacters.css';

const profile = 'http://game.granbluefantasy.jp/profile/content/index/';

export default class CheckCharacters extends Component {
	constructor (props) {
		super(props);

		this.state = {
			checkUbCharactersBtnLoading: false,
			disabled: false,
		};
	}

    componentDidMount = () => {
    	// 不在人员页面时，检查功能禁用
    	chrome.extension && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    		port.postMessage({ message: 'isCharacterPage' });

    		port.onMessage.addListener(response => {
    			const { flag } = response;

    			this.setState({ disabled: !flag });
    		});
    	});
    }

	// TODO: 需要通过/profile/npc/[data-id]/[user-id]获得角色信息而不是图片
    handleCheckUbCharacters = () => {
    	const { disabled } = this.state;

    	if(disabled) {
    		return;
    	}
    	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    		const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

    		this.setState({ checkUbCharactersBtnLoading: true });

    		port.postMessage({ message: 'check_ub_characters' });

    		port.onMessage.addListener(response => {
    			const { datas } = response;

    			for(let item of datas) {
    				const { userId = 1 } = item;

    				item.url = profile + userId;
    				item.hasCharacter = '';
    			}

    			this.recursionRequest(datas, 0, result => {
    				// 这段判断天人图片太僵硬了，得用正则
    				for(let item of result) {
    					const { data } = item;
    					const splitStr = 'http%3A%2F%2Fgame-a.granbluefantasy.jp%2Fassets%2Fimg_light%2Fsp%2Fassets%2Fnpc%2Fquest';
    					let characterList = [];

    					for(let jtem of data.split(splitStr)) {

    						for(let ktem of characterImgs) {
    							const { key, url } = ktem;

    							if(jtem.includes(url)) {
    								characterList.push(key);
    							}
    						}
    					}

    					// 去重
    					item.hasCharacter = Array.from(new Set(characterList)).toString();
    				}

    				// 生成气泡节点
    				const popup = <Table scroll={{ y: 280 }} columns={ columns } dataSource={ result } pagination={ false } rowKey='id' />;

    				notification.open({
    					message: '红茶已泡好，跟谁喝自便，但请注意卫生',
    					description: popup,
    					duration: null
    				});

    				this.setState({ checkUbCharactersBtnLoading: false });
    			});
    		});
    	});
    }

    // 递归请求队友人物页数据
    recursionRequest = (datas, index, callback) => {
    	if(index >= datas.length) {
    		callback(datas);

    		return;
    	}

    	const item = datas[index];
    	const { url } = item;

    	getByCookie(url, {}, result => {
    		const { data = '' } = result;

    		item.data = decodeURI(data);

    		this.recursionRequest(datas, ++index, callback);
    	});
    }

    render = () => {
    	const { checkUbCharactersBtnLoading, disabled } = this.state;

    	return (
    		<div className='CheckCharacters'>
    			<Button type='primary' loading={ checkUbCharactersBtnLoading } disabled={ disabled } onClick={ this.handleCheckUbCharacters } style={{ width: '90%' }}>严格检查骑空士队友是否失格</Button>

    			<WhiteSpace />
    		</div>
    	);
    }
}

// 天人图片
const characterImgs = [
	{ key: 1, name: '', url: '3040030000' },
	{ key: 2, name: '', url: '3040031000' },
	{ key: 3, name: '', url: '3040032000' },
	{ key: 4, name: '', url: '3040033000' },
	{ key: 5, name: '', url: '3040034000' },
	{ key: 6, name: '', url: '3040035000' },
	{ key: 7, name: '', url: '3040036000' },
	{ key: 7, name: '', url: '3710074000' },
	{ key: 8, name: '', url: '3040037000' },
	{ key: 9, name: '', url: '3040038000' },
	{ key: 10, name: '', url: '3040039000' },
];

const columns = [
	{
		title: '姓名',
		dataIndex: 'nickName',
		key: 'nickName',
	},
	{
		title: '年龄',
		dataIndex: 'userRank',
		key: 'userRank',
	},
	{
		title: '天人',
		dataIndex: 'hasCharacter',
		key: 'hasCharacter',
	}
];