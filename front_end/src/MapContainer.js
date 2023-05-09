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
        let positionArr = [
            [113.357224, 34.977186],
            [114.555528, 37.727903],
            [112.106257, 36.962733],
            [109.830097, 31.859027],
            [116.449181, 39.986142],
        ]
        for (let item of positionArr) {
            let marker = new window.AMap.Marker({
                position: [item[0], item[1]],
            })
            this.map.add(marker)
        }

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


