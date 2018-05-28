/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-28 15:20:13 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-05-28 17:27:19
 */
import React from 'react'
import ReactDOM from 'react-dom'

import { Route, NavLink, HashRouter } from 'react-router-dom'

import RedBox from 'redbox-react'

import Popup from './modules/Popup/Popup'
import Charts from './modules/Charts/Charts'

const MOUNT_NODE = document.getElementById('root');

try {
    ReactDOM.render(
        <HashRouter>
            <div>
                {/* <ul className='header'>
                    <li>
                        <NavLink to='/main'>main</NavLink>
                    </li>
                    <li>
                        <NavLink to='/charts'>charts</NavLink>
                    </li>
                </ul> */}
                <Route path='/' exact  component={ Popup } />
                <Route path='/charts' component={ Charts } />
            </div>
        </HashRouter>
    , MOUNT_NODE);
} catch (e) {
    ReactDOM.render(<RedBox error={e} />, MOUNT_NODE);
}