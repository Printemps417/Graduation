import { Mapbox } from '@antv/l7-maps'
import { Map } from '@antv/l7-maps'
import { Scene, PointLayer, Zoom, Scale } from '@antv/l7'
import './AntMap.css'
import { useEffect, useState, MapTheme } from 'react'
import { Helmet } from 'react-helmet'

const AntMap = () => {
    const [scene, setScene] = useState({})
    useEffect(() => {
        setScene(
            new Scene({
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
        )
    }, [])
    // []:只在初始渲染时执行一次
    useEffect(() => {
        if (scene && scene.on) {
            scene.on('loaded', () => {
                const zoom = new Zoom({
                    zoomInTitle: '放大',
                    zoomOutTitle: '缩小',
                })
                const scale = new Scale({
                    zoomInTitle: '放大',
                    zoomOutTitle: '缩小',
                })
                const mapTheme = new MapTheme({})
                scene.addControl(scale)
                scene.addControl(zoom)
                scene.addControl(mapTheme)
            })
        }
    }, [scene])
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