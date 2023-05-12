import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Routes, Route, Link, Outlet, Navigate } from 'react-router-dom'
import { Button, Space } from 'antd'
import React from 'react'
import { useState } from 'react'
import Adddb from './Adddb'
import { useContext } from 'react'
import { DatabaseContext } from '../App'
import { setToken, getToken, removeToken } from '../tools'
import { PoweroffOutlined } from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout
const Data = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const { useritem, setUseritem, dbname, setDbname } = useContext(DatabaseContext)

    const items2 = [...useritem, LaptopOutlined].map((icon, index) => {
        const key = String(index + 1)
        return {
            key: `${key}`,
            icon: React.createElement(icon),
            label:
                <Link
                    to={key > useritem.length ? `/Data/adddb` : `/Data/database?database=${dbname[index]}`}
                    // 点击时会将数据库的名称通过url传递给子组件
                    onClick={() => {
                        if (key > useritem.length) {
                            console.log('添加数据库被点击')
                            // setUseritem([...useritem, UserOutlined])
                        }
                        else {
                            console.log('数据库被点击')
                        }
                    }}
                >{key <= useritem.length ? `${dbname[index]}` : '点击添加数据库'}</Link>
            // children: new Array(4).fill(null).map((_, j) => {
            //     const subKey = index * 4 + j + 1
            //     return {
            //         key: subKey,
            //         label: `option${subKey}`,
            //     }
            // }),
        }
    })
    return (
        <Layout>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                            }}
                            items={items2}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Content>
            <div style={{ position: 'fixed', left: '6%', bottom: '5%' }}>
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    onClick={() => { window.location.reload() }}>刷新数据库</Button>
            </div>
        </Layout>

    )
}
export default Data