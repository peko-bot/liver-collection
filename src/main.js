/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-28 15:20:13 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-05-28 15:29:50
 */
import React from 'react'
import ReactDOM from 'react-dom'

import { Route, NavLink, HashRouter } from "react-router-dom"

import RedBox from 'redbox-react'

import TEST from './modules/Popup/Popup'

const MOUNT_NODE = document.getElementById('root');

try {
    ReactDOM.render((
        <BrowserRouter>
            <TEST />
        </BrowserRouter>
    ), MOUNT_NODE);
} catch (e) {
    ReactDOM.render(<RedBox error={e} />, MOUNT_NODE);
}