import { Mapbox } from '@antv/l7-maps'
import { Map } from '@antv/l7-maps'
import { Scene, PointLayer, Zoom, Scale, MouseLocation, MapTheme, Source, HeatmapLayer, LineLayer } from '@antv/l7'
import '../styles/AntMap.css'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Button, message } from 'antd'
import { PlusOutlined, RedoOutlined } from '@ant-design/icons'
import {
    getToken,
    addClusterLayer,
    addHeatmapLayer,
    addHeatmapLayer2,
    addScatterLayer,
    addTextLayer,
    addBubbleLayer,
    addDynaTripLayer,
    addEqualLineLayer,
    addTripLayer,
} from '../tools'
import axios from 'axios'

const AntMap = () => {
    // render内定义的变量生命周期为当前渲染周期，重新渲染时会重新初始化
    // constructer中定义的变量是类的属性，在渲染后保持不变。（也可用useRef保存，构造中定义属性，useRef保存数据！）
    // useState定义的变量的改变会引起重新渲染，使用useEffect可以监听变量改变从而做出行为
    // setState会引起重新渲染，但其对应的变量在下一次渲染前才更新，期间一直保持原有值
    const [scene, setscene] = useState({})

    // 刷新时重新初始化地图
    useEffect(() => {
        // 创建需要添加到 scene 的控件
        const zoom = new Zoom({
            zoomInTitle: "放大",
            zoomOutTitle: "缩小",
        })
        const scale = new Scale({
            style: "background-color: transparent;",
            // zoomInTitle: "放大",
            // zoomOutTitle: "缩小",
        })
        const mapTheme = new MapTheme({})
        const mouseLocation = new MouseLocation({
            style: "background-color: transparent;",
            position: 'lefttop',
            transform: (position) => {
                return position
            }
        })

        // 创建 Scene 实例并设置到 state 中
        const sceneInstance = new Scene({
            id: 'antmap',
            map: new Mapbox({
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [121.417463, 31.215175],
                pitch: 0,
                zoom: 11,
                rotation: 0,
                token: 'pk.eyJ1IjoicHJpbnRlbXBzIiwiYSI6ImNsaGhwejU0cTAwY28zam8xbWludXo4bngifQ.LmDqGBLS65qC4bGVPmGgdA',
            }),
            logoVisible: false,
        })
        setscene(sceneInstance)

        // 在 Scene 加载完成后添加控件。直接给sceneInstance添加
        axios.get(`http://localhost:8088/userdata?username=${getToken()}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.data)
            .then((data) => {
                // console.log(data)
                // console.log(data.action)
                var i = 0
                for (i = 0; i < data.action.length; i++) {
                    switch (data.action[i]) {
                        case 'Scatter': {
                            addScatterLayer(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加散点图')
                            break
                        }
                        case 'Cluster': {
                            addClusterLayer(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加聚合点图')
                            break
                        }
                        case 'Equal': {
                            addEqualLineLayer(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加等值线图')
                            break
                        }
                        case 'Bubble': {
                            addBubbleLayer(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加气泡点图')
                            break
                        }
                        case 'Text': {
                            addTextLayer(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加文本标记')
                            break
                        }
                        case 'Heat': {
                            addHeatmapLayer2(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加热力图')
                            break
                        }
                        case 'HeatGrid': {
                            addHeatmapLayer(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加栅格热力图')
                            break
                        }
                        case 'Strip': {
                            addTripLayer(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加静态轨迹图')
                            break
                        }
                        case 'Dtrip': {
                            addDynaTripLayer(data.datas[i], sceneInstance, data.visible[i])
                            console.log('添加动态轨迹图')
                            break
                        }
                        default: console.log('null')
                    }
                }
            }
            )
            .catch((error) => {
                console.log(error)
            })

        // 执行热力图添加函数
        sceneInstance.on("loaded", () => {
            sceneInstance.addControl(scale)
            sceneInstance.addControl(zoom)
            sceneInstance.addControl(mapTheme)
            sceneInstance.addControl(mouseLocation)
        })
    }, [])
    // []:只在初始渲染时执行一次

    const addLayers = (action) => {

    }
    return (
        <>
            {/* <Helmet>
                <link rel="stylesheet" href="mapbox://styles/mapbox/navigation-night-v1" />
            </Helmet> */}
            <div
                style={{
                    minHeight: "500px",
                    justifyContent: "center",
                    position: "relative"
                }}
                id="antmap" />
        </>
    )
}
export default AntMap