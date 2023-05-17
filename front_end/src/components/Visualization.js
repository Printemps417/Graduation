import React, { Component, useState } from 'react'
import { CodepenOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd'
import '../styles/Visualization.css'
import { useContext } from 'react'
import { DatabaseContext } from '../App'
import AntMap from './AntMap'

const { Header, Content, Footer, Sider } = Layout
const Visualization = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const [useritem, setUseritem] = useState(["Point-example"])
    const layers = useritem.map((item, index) => {
        const key = String(index + 1)
        return {
            key: `${index + 1}`,
            icon: <CodepenOutlined />,
            label:
                <p>图层{item}</p>,
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
            <AntMap></AntMap>
            {/* Mapbox地图 */}
            <div style={{ position: 'fixed', left: '3%', bottom: '15%' }}>
                <Button
                    type="primary"
                    icon=<PlusOutlined />
                    onClick={() => { window.location.reload() }}>添加图层</Button>
            </div>
            <div style={{ position: 'fixed', left: '3%', bottom: '7%' }}>
                <Button
                    type="primary"
                    icon=<RedoOutlined
                        style={{ zIndex: 9999 }} />
                    onClick={() => { window.location.reload() }}>刷新地图</Button>
            </div>
        </>
    )
}

export default Visualization
