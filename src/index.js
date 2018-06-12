/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-28 15:20:13 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-12 11:30:28
 */
import React from 'react'
import ReactDOM from 'react-dom'
import RedBox from 'redbox-react'

import Router from './router'

const MOUNT_NODE = document.getElementById('root');

try {
    ReactDOM.render(<Router />, MOUNT_NODE);
} catch(e) {
    ReactDOM.render(<RedBox error={ e } />, MOUNT_NODE);
}