/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-07 13:41:02 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-26 15:10:30
 */
import React, { Component } from 'react'

import './css/Charts.css'

export default class Charts extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            input_value_1: '',
            input_value_2: '',
        }
    }

    onChange = (e, name) => {
        this.setState({ [name]: e.target.value });
    }

    render() {
        const { input_value_1, input_value_2 } = this.state;

        return (
            <div className='Charts'>
                <input value={ input_value_1 } onChange={ e => this.onChange(e, 'input_value_1') } />
                <input value={ input_value_2 } onChange={ e => this.onChange(e, 'input_value_2') } />
                <div>test</div>
            </div>
        )
    }
}