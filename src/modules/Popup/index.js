/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 14:46:14 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-30 16:01:44
 */
import React, { Component } from 'react'

import UploadItems from './UploadItems'
import CoopraidSearch from './CoopraidSearch'
import SetZoom from './SetZoom'
import CheckCharacters from './CheckCharacters'

import './css/index.css'

export default class Popup extends Component {
    render = () => {
        return (
            <div className='Popup'>
                {/* 上传素材，需要本地数据库 */}
                <UploadItems />

                {/* 共斗房间筛选 */}
                <CoopraidSearch />

                {/* 设置游戏窗口大小 */}
                <SetZoom />
                
                {/* ub房检查队友天人 */}
                <CheckCharacters />
            </div>
        )
    }
}