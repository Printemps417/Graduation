import React, { Component } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import './MapContainer.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
class MapComponent extends Component {
    constructor() {
        super()
        // this.state = {
        //     map:{}
        // };       
        this.map = {}

    }
    // 2.dom渲染成功后进行map对象的创建
    componentDidMount () {
        this.map = new window.AMap.Map("mapcontainer", {
            viewMode: "3D",
            zoom: 11,
            zooms: [2, 22],
            center: [116.397428, 39.90923]  //初始化地图中心点
        })
        // this.map.on('complete', () => {
        //     // 创建 AMap.LabelsLayer 图层
        //     var layer = new window.AMap.LabelsLayer({
        //         zooms: [3, 20],
        //         zIndex: 1000,
        //         collision: false
        //     })

        //     // 将图层添加到地图
        //     this.map.add(layer)

        //     var markers = []
        //     var positions = window.Positions.slice(0, 3E4)

        //     var icon = {
        //         type: 'image',
        //         image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        //         size: [6, 9],
        //         anchor: 'bottom-center',
        //     }

        //     for (var i = 0; i < positions.length; i++) {
        //         var curPosition = positions[i]
        //         var curData = {
        //             position: curPosition,
        //             icon
        //         }

        //         var labelMarker = new window.AMap.LabelMarker(curData)

        //         markers.push(labelMarker)

        //         // 给marker绑定事件
        //         labelMarker.on('mouseover', (e) => {
        //             var position = e.data.data && e.data.data.position

        //             if (position) {
        //                 normalMarker.setContent(
        //                     '<div class="amap-info-window">'
        //                     + position +
        //                     '<div class="amap-info-sharp"></div>' +
        //                     '</div>')
        //                 normalMarker.setPosition(position)
        //                 this.map.add(normalMarker)
        //             }
        //         })

        //         labelMarker.on('mouseout', () => {
        //             this.map.remove(normalMarker)
        //         })
        //     }

        //     // 一次性将海量点添加到图层
        //     layer.add(markers)

        //     // 普通点
        //     var normalMarker = new window.AMap.Marker({
        //         anchor: 'bottom-center',
        //         offset: [0, -15],
        //     })
        // })

        window.AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.ControlBar", "AMap.HawkEye"], () => { // 异步加载插件
            let toolbar = new window.AMap.ToolBar({
                visible: true,
                position: {
                    top: '60px',
                    right: '40px'
                }
            }) // 缩放工具条实例化
            let scale = new window.AMap.Scale()
            let controlBar = new window.AMap.ControlBar()
            let overView = new window.AMap.HawkEye()

            this.map.addControl(toolbar)
            this.map.addControl(overView)
            this.map.addControl(controlBar)
            this.map.addControl(scale)
        })
        // toolbar.hide()

        // axios.get('https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json')
        //     .then(response => {
        //         // 将数据保存到变量中
        //         const jsonData = response.data
        //         console.log(jsonData)
        //         // 使用数据源创建 PolygonLayer 组件
        //         const chinaPolygonLayer = new PolygonLayer({
        //             source: jsonData,
        //             color: 'name',
        //             style: {
        //                 color: [
        //                     'rgb(239,243,255)',
        //                     'rgb(189,215,231)',
        //                     'rgb(107,174,214)',
        //                     'rgb(49,130,189)',
        //                     'rgb(8,81,156)'
        //                 ]
        //             }
        //         })
        //         this.map.addLayer(chinaPolygonLayer)
        //     })
    }
    render () {
        // 1.创建地图容器
        return (
            <div className="home_div">
                {/* <div className="map-title">
                    <h3>Map</h3>
                </div> */}
                <Helmet>
                    <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css" />
                </Helmet>
                <div id="mapcontainer" className="map" style={{ height: '100%' }} />
            </div>
        )
    }

}
export default MapComponent;


