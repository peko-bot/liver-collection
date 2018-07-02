/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-02 21:36:02 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-02 22:27:37
 */
import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import './css/Option.css'

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
    environment = { store: new store('options') };
}
const { store: STORE } = environment;

export default class Option extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        }
    }

    componentDidMount = () => {

    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render = () => {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className='logo' />
                    <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
                        <Menu.Item key='1'>
                            <Icon type='pie-chart' />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Icon type='desktop' />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu key='sub1' title={<span><Icon type='user' /><span>User</span></span>}>
                            <Menu.Item key='3'>Tom</Menu.Item>
                            <Menu.Item key='4'>Bill</Menu.Item>
                            <Menu.Item key='5'>Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key='sub2' title={<span><Icon type='team' /><span>Team</span></span>}>
                            <Menu.Item key='6'>Team 1</Menu.Item>
                            <Menu.Item key='8'>Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key='9'>
                            <Icon type='file' />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <div>贫穷使我们相遇，但后来，只有你发出了母猪的声音</div>
                        <div>Poverty makes us meet, but later, only you come out of the closet.</div>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}