import React from 'react'
import ReactDOM from 'react-dom'
import RedBox from 'redbox-react'

import TEST from './modules/Popup/Popup'

const MOUNT_NODE = document.getElementById('root');

try {
    ReactDOM.render(<TEST />, MOUNT_NODE);
} catch (e) {
    ReactDOM.render(<RedBox error={e} />, MOUNT_NODE);
}