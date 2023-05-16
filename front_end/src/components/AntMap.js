import { Mapbox } from '@antv/l7-maps'
import { Map } from '@antv/l7-maps'
import { Scene, PointLayer, Zoom, Scale, MouseLocation, MapTheme, Source, HeatmapLayer, LineLayer } from '@antv/l7'
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
                zoom: 4,
                rotation: 0,
                token: 'pk.eyJ1IjoicHJpbnRlbXBzIiwiYSI6ImNsaGhwejU0cTAwY28zam8xbWludXo4bngifQ.LmDqGBLS65qC4bGVPmGgdA',
            }),
            logoVisible: false,
        })
        setscene(sceneInstance)

        // 在 Scene 加载完成后添加控件。直接给sceneInstance添加
        sceneInstance.on("loaded", () => {
            sceneInstance.addControl(scale)
            sceneInstance.addControl(zoom)
            sceneInstance.addControl(mapTheme)
            sceneInstance.addControl(mouseLocation)
            // fetch('http://localhost:3000/Sampledata.csv')
            //     .then(response => response.text())
            //     .then(data => {
            //         // console.log('获取数据：' + data)
            //         // 聚合点数据
            //         const dataSource = new Source(data, {
            //             parser: {
            //                 type: 'csv',
            //                 x: 'Lon',
            //                 y: 'Lat'

            //             },
            //             cluster: true
            //         })
            //         const pointLayer = new PointLayer({
            //             autoFit: true
            //         })
            //             .source(dataSource)
            //             .shape('circle')
            //             .scale('point_count', {
            //                 type: 'quantile'
            //             })
            //             .size('point_count', [5, 10, 15, 20, 25])
            //             .active(true)
            //             .color('green')
            //             .style({
            //                 strokeWidth: 0,
            //                 stroke: '#fff',
            //                 opacity: 0.5
            //             })
            //         // 聚合图标注
            //         const pointLayerText = new PointLayer({
            //             autoFit: false
            //         })
            //             .source(dataSource)
            //             .shape('point_count', 'text')
            //             .size(15)
            //             .active(true)
            //             .color('#fff')
            //             .style({
            //                 strokeWidth: 0.5,
            //                 stroke: '#fff'
            //             })
            //         // 散点图数据
            //         const ScatterLayer = new PointLayer({})
            //             .source(data, {
            //                 parser: {
            //                     type: 'csv',
            //                     x: 'Lon',
            //                     y: 'Lat'
            //                 }
            //             })
            //             .size(0.5)
            //             .color('#080298')

            //         sceneInstance.addLayer(ScatterLayer)
            //         sceneInstance.addLayer(pointLayer)
            //         sceneInstance.addLayer(pointLayerText)
            //     })
            fetch(
                'http://localhost:3000/HeatSample.csv'
            )
                .then(res => res.text())
                .then(data => {
                    const layer = new HeatmapLayer({})
                        .source(data, {
                            parser: {
                                type: 'csv',
                                x: 'lng',
                                y: 'lat'
                            },
                            transforms: [
                                {
                                    type: 'grid',
                                    size: 20000,
                                    field: 'v',
                                    method: 'sum'
                                }
                            ]
                        })
                        .shape('circle')
                        .style({
                            coverage: 0.9,
                            angle: 0
                        })
                        .color(
                            'count',
                            [
                                '#8C1EB2',
                                '#8C1EB2',
                                '#DA05AA',
                                '#F0051A',
                                '#FF2A3C',
                                '#FF4818',
                                '#FF4818',
                                '#FF8B18',
                                '#F77B00',
                                '#ED9909',
                                '#ECC357',
                                '#EDE59C'
                            ].reverse()
                        )
                    sceneInstance.addLayer(layer)
                })
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