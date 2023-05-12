import { Mapbox } from '@antv/l7-maps'
import { Map } from '@antv/l7-maps'
import { Scene, PointLayer, Zoom, Scale, MouseLocation, MapTheme } from '@antv/l7'
import '../styles/AntMap.css'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const AntMap = () => {
    // render内定义的变量生命周期为当前渲染周期，重新渲染时会重新初始化
    // constructer中定义的变量是类的属性，在渲染后保持不变。（也可用useRef保存，构造中定义属性，useRef保存数据！）
    // useState定义的变量的改变会引起重新渲染，使用useEffect可以监听变量改变从而做出行为
    // setState会引起重新渲染，但其对应的变量在下一次渲染前才更新，期间一直保持原有值
    const [scene, setscene] = useState({})
    const [flag, setFlag] = useState(false)
    // 组件函数只在被挂载到DOM树时执行一次，此后的更新放在useeffect
    // async function addcon (scene) {
    //     scene.on("loaded", () => {
    //     const zoom = new Zoom({
    //         zoomInTitle: "放大",
    //         zoomOutTitle: "缩小"
    //     })
    //     const scale = new Scale({
    //         zoomInTitle: "放大",
    //         zoomOutTitle: "缩小"
    //     })
    //     const mapTheme = new MapTheme({})
    //     const mouseLocation = new MouseLocation({
    //         transform: (position) => {
    //             return position
    //         }
    //     })
    //     scene.addControl(scale)
    //     scene.addControl(zoom)
    //     scene.addControl(mapTheme)
    //     scene.addControl(mouseLocation)
    //     console.log('加载组件成功！')
    // })
    // }
    // 定义组件加载函数

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
                center: [104.288144, 31.239692],
                pitch: 0,
                zoom: 4,
                rotation: 0,
                token: 'pk.eyJ1IjoicHJpbnRlbXBzIiwiYSI6ImNsaGhwejU0cTAwY28zam8xbWludXo4bngifQ.LmDqGBLS65qC4bGVPmGgdA',
            }),
            logoVisible: false,
        })
        setscene(sceneInstance)

        // 在 Scene 加载完成后添加控件
        sceneInstance.on("loaded", () => {
            sceneInstance.addControl(scale)
            sceneInstance.addControl(zoom)
            sceneInstance.addControl(mapTheme)
            sceneInstance.addControl(mouseLocation)
            console.log('加载组件成功！')
        })
    }, [])
    // []:只在初始渲染时执行一次

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