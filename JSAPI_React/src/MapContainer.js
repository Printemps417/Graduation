import React, { Component } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import './MapContainer.css'

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
        AMapLoader.load({
            key: '2109b1cf6320763f85398e3a305f34c1', //需要设置您申请的key
            version: "2.0",
            plugins: ['AMap.ToolBar', 'AMap.Driving'],
            AMapUI: {
                version: "1.1",
                plugins: [],

            },
            Loca: {
                version: "2.0.0"
            },
        }).then((AMap) => {
            this.map = new AMap.Map("mapcontainer", {
                viewMode: "3D",
                zoom: 5,
                zooms: [2, 22],
                center: [105.602725, 37.076636],
            })
            let positionArr = [
                [113.357224, 34.977186],
                [114.555528, 37.727903],
                [112.106257, 36.962733],
                [109.830097, 31.859027],
                [116.449181, 39.98614],
            ]
            for (let item of positionArr) {
                let marker = new AMap.Marker({
                    position: [item[0], item[1]],
                })
                this.map.add(marker)
            }
        }).catch(e => {
            console.log(e)
        })
    }
    render () {
        // 1.创建地图容器
        return (
            <div className="home_div">
                <div className="map-title">
                    <h3>JSAPI React地图组件示例</h3>
                </div>
                <div id="mapcontainer" className="map" style={{ height: '100%' }} />
            </div>
        )
    }

}
export default MapComponent;


