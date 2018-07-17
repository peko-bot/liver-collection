/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-02 21:36:02 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-17 21:32:38
 */
import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import UploadItems from './UploadItems'
import SiderOptions from './SiderOptions'
import ScrollOptions from './ScrollOptions'
import MultiBattle from './MultiBattle'
// import GachaOptions from './GachaOptions'
import CheckHomework from './CheckHomework'

import './css/Option.css'

export default class Option extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: '0',
        }
    }

    componentDidMount = () => {

    }

    handle_menu_item = menu => {
        const { item, key, keyPath } = menu;

        this.setState({ key });
    }

    render = () => {
        const { collapsed, key } = this.state;

        const global_style = (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>通用设置</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <SiderOptions />
                    <ScrollOptions />
                    {/* <GachaOptions /> */}
                    <CheckHomework />
                </div>
            </Content>
        );

        const multi_battle = (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>舔婊相关</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <MultiBattle />
                </div>
            </Content>
        );

        const upload_items = (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>记录上传</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <UploadItems />
                </div>
            </Content>
        );

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible>
                    <div className='logo' />
                    <Menu theme='dark' defaultSelectedKeys={ [key] } mode='inline'>
                        {
                            menu_items.map(item => {
                                const { key, type, text } = item;

                                return (
                                    <Menu.Item key={ key } onClick={ this.handle_menu_item }>
                                        <Icon type={ type } />
                                        <span>{ text }</span>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>

                <Layout>
                    { key == 0 && global_style }
                    { key == 1 && multi_battle }
                    { key == 2 && upload_items }
                    
                    <Footer style={{ textAlign: 'center' }}>
                        <div>贫穷使我们相遇，但后来，你却发出了母猪的声音。而我，只想为你豹跳一曲，如花净土...</div>
                        <div>Poverty makes us meet, but later, only you come out of the closet. But for me, I just want to marry to you...</div>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

const menu_items = [
    {
        key: 0,
        type: 'desktop',
        text: '通用设置'
    },
    {
        key: 1,
        type: 'team',
        text: '舔婊相关'
    },
    {
        key: 2,
        type: 'upload',
        text: '记录上传'
    },
]