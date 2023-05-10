import React, { Component } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import './Visualization.css'
import { useContext } from 'react'
import { DatabaseContext } from './App'
import AntMap from './AntMap'

const { Header, Content, Footer, Sider } = Layout
const Visualization = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const { useritem, setUseritem } = useContext(DatabaseContext)
    const items2 = [...useritem].map((icon, index) => {
        const key = String(index + 1)
        return {
            key: `${key}`,
            icon: React.createElement(icon),
            label:
                <p>图层{key}</p>,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1
                return {
                    key: subKey,
                    label: `option-${subKey}`,
                }
            }),
        }
    })
    return (
        <>
            <Layout>
                <Content
                    style={{
                        margin: '0px',
                        padding: '0 0px',
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
                        <AntMap></AntMap>
                        {/* 高德地图 */}
                    </Layout>
                </Content>
            </Layout>
        </>
    )
}

export default Visualization
