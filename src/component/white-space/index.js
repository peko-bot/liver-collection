/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-30 15:03:24
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-03 21:34:37
 */
import React, { Component } from 'react';

import './css/index.css';

export default class index extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    render = () => {
    	const { clear, style } = this.props;

    	return <div className='white-space' style={ Object.assign({ clear: clear ? 'both' : 'none' }, style) } />;
    };
}