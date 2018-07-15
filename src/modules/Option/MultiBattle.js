/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-03 17:20:19 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-15 11:26:19
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
            is_multil: STORE.get('is_multil'), // 是否开启舔婊模式
            is_listen_board: STORE.get('is_listen_board'), // 是否监视剪切板
            is_listen_bp: STORE.get('is_listen_bp'), // 是否监视bp
            is_rape: STORE.get('is_rape'), // 是否强行进入
        }
    }

    componentDidMount = () => {
    
    }

    handle_switch_onchange = (name, checked) => {
        STORE.set(name, checked);

        // 舔婊模式开启时，令popup失效
        name == 'is_multil' && chrome.browserAction.setPopup({ popup: checked ? '' : 'index.html' });

        this.setState({ [name]: checked });
    }

    render = () => {
        const { is_multil, is_listen_board, is_listen_bp, is_rape } = this.state;

        /* 上一个选项未开启时，禁用下方所有选项 */
        return (
            <div className='MultiBattle' style={{ marginLeft: '1%' }}>
                <Tooltip title='开启该选项时，点击icon将不会点开面板，而会照着下方几个选项决定行为，默认为读取剪切板中内容请求battle信息，不报错则进房'>
                    <span style={{ float: 'left', color: '#666' }}>是否开启舔婊模式</span>
                </Tooltip>
                <Switch onChange={ checked => this.handle_switch_onchange('is_multil', checked) } checked={ is_multil } style={{ float: 'right', marginRight: '85%' }} />
                <WhiteSpace clear />

                {/* <Tooltip title='开启该选项时，当你的剪切板内容发生变化且内容像battle id时，会直接进房，而不用点icon'> */}
                <Tooltip title='（因为没法监听系统剪切板，卒）开启该选项时，当你的剪切板内容发生变化且内容像battle id时，会直接进房，而不用点icon'>
                    <span style={{ float: 'left', color: '#666' }}>是否监视剪切板</span>
                </Tooltip>
                <Switch onChange={ checked => this.handle_switch_onchange('is_listen_board', checked) } checked={ is_listen_board } disabled={ !is_multil } style={{ float: 'right', marginRight: '85%' }} />
                <WhiteSpace clear />

                {/* <Tooltip title='开启该选项且监视剪切板时，每次进房前将不会额外判断bp是否能进房间'>
                    <span style={{ float: 'left', color: '#666' }}>是否监视bp</span>
                </Tooltip>
                <Switch onChange={ checked => this.handle_switch_onchange('is_listen_bp', checked) } checked={ is_listen_bp } disabled={ !is_listen_board } style={{ float: 'right', marginRight: '85%' }} />
                <WhiteSpace clear />

                <Tooltip title='开启该选项时，可以强行进入下一个房间，而不是等当场战斗结束'>
                    <span style={{ float: 'left', color: '#666' }}>是否强行进入</span>
                </Tooltip>
                <Switch onChange={ checked => this.handle_switch_onchange('is_rape', checked) } checked={ is_rape } disabled={ !is_listen_bp } style={{ float: 'right', marginRight: '85%' }} />
                <WhiteSpace clear /> */}
            </div>
        )
    }
}