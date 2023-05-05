import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { Button, Space } from 'antd'
import React from 'react'
import { useState } from 'react'
import Adddb from './Adddb'

const { Header, Content, Footer, Sider } = Layout
export const DatabaseContext = React.createContext()
// 用于传输数据
const Left_menu = ({ key, items2 }) => {
    // 定义渲染格式
    if (key == items2.length) {
        return (
            <Button type="primary">新建数据库</Button>
        )
    }
    else {
        return `Database${key}`
    }
}
const Data = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const [useritem, setUseritem] = useState([UserOutlined])
    const items2 = [...useritem, LaptopOutlined].map((icon, index) => {
        const key = String(index + 1)
        return {
            key: `${key}`,
            icon: React.createElement(icon),
            label:
                <Link
                    to={key > useritem.length ? `/Data/adddb` : `/Data/database?database=${key}`}
                    onClick={() => {
                        if (key > useritem.length) {
                            console.log('添加数据库被点击')
                            // setUseritem([...useritem, UserOutlined])
                        }
                        else {
                            console.log('数据库被点击')
                        }
                    }}
                >{key <= useritem.length ? `Database${key}` : '点击添加数据库'}</Link>
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
        <DatabaseContext.Provider value={{ useritem, setUseritem }}>
            {/* Provider要包裹上层组件 */}
            <Layout>
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                        marginLeft: '4%'
                    }}
                >
                    <Breadcrumb.Item>Data</Breadcrumb.Item>
                </Breadcrumb>


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
                            Content
                            <Outlet></Outlet>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </DatabaseContext.Provider>

    )
}
export default Data