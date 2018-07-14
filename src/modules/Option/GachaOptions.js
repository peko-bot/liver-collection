/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-13 19:35:55 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-14 15:32:50
 */
import React, { Component } from 'react'

import { Button, Modal, Tooltip } from 'antd'

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

export default class GachaOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            modal_visible: false,
            
        }
    }

    componentDidMount = () => {
        this.load_questions();
    }

    load_questions = () => {
        fetch('/assets/questions.json')
        .then(result => result.json())
        .then(questions => {
            this.setState({ questions });
        });
    }

    handle_modal_visible = visible => {
        let { modal_visible } = this.state;

        this.setState({ modal_visible: !modal_visible });
    }

    // STORE.set('is_eunuch', checked);

    render = () => {
        const { modal_visible, questions } = this.state;

        return (
            <div className='GachaOptions'>
                <Button type='danger' onClick={ this.handle_modal_visible }>成为真正的骑空士</Button>

                <Modal visible={ modal_visible } onCancel={ this.handle_modal_visible } mask>
                    {
                        questions.map((item, i) => {
                            const { question } = item;

                            return (
                                <div key={ `quest_${ i }` }>{ question }</div>
                            );
                        })
                    }
                </Modal>
            </div>
        )
    }
}