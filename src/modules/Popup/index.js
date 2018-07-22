/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-20 14:46:14
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-20 08:35:05
 */
import React, { Component } from 'react';

// import UploadItems from './UploadItems'
import CoopraidSearch from './CoopraidSearch';
// import SetZoom from './SetZoom';
import CheckCharacters from './CheckCharacters';
// import SiderOptions from './SiderOptions'
import CheckBlackList from './CheckBlackList';
// import ScrollOptions from './ScrollOptions'
import GachaOptions from './GachaOptions';

import './css/index.css';

export default class Popup extends Component {
    render = () => {
    	return (
    		<div className='Popup'>
    			{/* 上传素材，需要本地数据库 */}
    			{/* <UploadItems /> */}

    			{/* 共斗房间筛选 */}
    			<CoopraidSearch />

    			{/* 设置游戏窗口大小 */}
    			{/* <SetZoom /> */}

    			{/* 检查黑名单 */}
    			<CheckBlackList />

    			{/* ub房检查队友天人 */}
    			<CheckCharacters />

    			{/* 左右面板显示开关 */}
    			{/* <SiderOptions /> */}

    			{/* 是否开启滚动条样式 */}
    			{/* <ScrollOptions /> */}

    			{/* 是否禁用抽卡 */}
    			<GachaOptions />
    		</div>
    	);
    }
}