/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-03 17:20:19 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-03 17:36:28
 */
import React, { Component } from 'react'

import { Switch, Tooltip } from 'antd'

import WhiteSpace from '../../component/white-space'

import store from '../../../util/Store'

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
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {
    
    }

    render = () => {
        return (
            <div className='MultiBattle' style={{ marginLeft: '1%' }}>
                <Tooltip title='开启该选项时，点击icon将不会点开面板，而会照着下方几个选项决定行为，默认为读取剪切板中内容请求battle信息，不报错则进房'>
                    <span style={{ float: 'left', color: '#666' }}>是否开启舔婊模式</span>
                    <Switch onChange={ this.handle_switch_onchange } defaultChecked={ false } style={{ float: 'right', marginRight: '85%' }} />
                    <div style={{ clear: 'both' }} ></div>
                </Tooltip>
                <WhiteSpace />

                <Tooltip title='开启该选项时，当你的剪切板内容发生变化且内容像battle id时，会直接进房，而不用点icon'>
                    <span style={{ float: 'left', color: '#666' }}>是否监视剪切板</span>
                    <Switch onChange={ this.handle_switch_onchange } defaultChecked={ false } style={{ float: 'right', marginRight: '85%' }} />
                    <div style={{ clear: 'both' }} ></div>
                </Tooltip>
                <WhiteSpace />

                <Tooltip title='开启该选项且监视剪切板时，每次进房前将会额外判断bp是否能进房间，不够就会吃药'>
                    <span style={{ float: 'left', color: '#666' }}>是否监视bp</span>
                    <Switch onChange={ this.handle_switch_onchange } defaultChecked={ false } style={{ float: 'right', marginRight: '85%' }} />
                    <div style={{ clear: 'both' }} ></div>
                </Tooltip>
                <WhiteSpace />
            </div>
        )
    }
}