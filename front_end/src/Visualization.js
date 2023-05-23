import React, { Component } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Scene, PolygonLayer, LineLayer, PointLayer } from "@antv/l7"
import './Visualization.css'
import { useContext } from 'react'
import { DatabaseContext } from './App'
import { GaodeMap } from '@antv/l7-maps'
import { Map } from '@antv/l7-maps'
import AMapLoader from '@amap/amap-jsapi-loader'
import MapComponent from './MapContainer'

// const { Header, Content, Footer, Sider } = Layout
// // 加载地图底图
// const gaode = new GaodeMap({
//     viewMode: "3D",
//     pitch: 0,
//     style: 'light',
//     center: [104.288144, 31.239692],
//     zoom: 4.4,
//     token: '2109b1cf6320763f85398e3a305f34c1',
//     plugin: [], // 注册要使用的插件
// })
// const scene = new Scene({
//     id: 'antmap',
//     map: gaode
// })

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
                <p>Database{key}</p>,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1
                return {
                    key: subKey,
                    label: `option${subKey}`,
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
                        {/* <div style={{ minHeight: "600px", justifyContent: "center", width: "100%", position: "relative" }} id="antmap"></div> */}
                        <MapComponent></MapComponent>
                        {/* 高德地图 */}
                    </Layout>
                </Content>
            </Layout>
        </>
    )
}

export default Visualization
