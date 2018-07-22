/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-28 15:20:13
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-22 21:59:27
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader'

import Router from './router';

const MOUNT_NODE = document.getElementById('root');

// const render = Component => ReactDOM.render(
//     <AppContainer>
//         <Component />
//     </AppContainer>, MOUNT_NODE
// )

ReactDOM.render(<Router />, MOUNT_NODE);
// render(Router);

if (module.hot) {
	// module.hot.accept('./router', () => {
	//     render(require('./router').default);
	// });
	module.hot.accept();
}