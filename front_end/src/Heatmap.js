import React, { Component } from 'react'
import './Heatmap.css'

class Heatmap extends Component {
    componentDidMount () {
        var map = new window.AMap.Map('container', {
            zoom: 4.8,
            showLabel: false,
            viewMode: '3D',
            center: [105.601, 35.32],
            mapStyle: 'amap://styles/45311ae996a8bea0da10ad5151f72979',
        })

        var tool = new window.AMap.ToolBar()
        tool.addTo(map)

        var loca = new window.Loca.Container({
            map,
        })

        var pl = window.pl = new window.Loca.PointLayer({
            zIndex: 10,
            opacity: 1,
            blend: 'normal',
        })

        var geo = new window.Loca.GeoJSONSource({
            url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
        })
        pl.setSource(geo)
        var colors = [
            'rgba(254,255,198,0.95)',
            'rgba(255,238,149,0.95)',
            'rgba(255,217,99,0.95)',
            'rgba(255,175,43,0.95)',
            'rgba(255,135,24,0.95)',
            'rgba(234,10,0,0.95)',
            'rgba(195,0,0,0.95)',
            'rgba(139,0,0,0.95)',
        ]

        var style = {
            unit: 'meter',
            radius: (index, f) => {
                var n = f.properties['人口']
                return n * 100
            },
            color: (index, f) => {
                var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000))
                return colors[n]
            },
            borderWidth: 0,
            blurRadius: -1,
        }

        pl.setStyle(style)
        loca.add(pl)

        // 图例
        var lengend = new window.Loca.Legend({
            loca: loca,
            title: {
                label: '人均GDP',
                fontColor: 'rgba(255,255,255,0.4)',
                fontSize: '16px',
            },
            style: {
                backgroundColor: 'rgba(255,255,255,0.1)',
                left: '20px',
                bottom: '40px',
                fontSize: '12px',
            },
            dataMap: [
                { label: '> 8万', color: colors[7] },
                { label: '< 7万', color: colors[6] },
                { label: '< 6万', color: colors[5] },
                { label: '< 5万', color: colors[4] },
                { label: '< 4万', color: colors[3] },
                { label: '< 3万', color: colors[2] },
                { label: '< 2万', color: colors[1] },
                { label: '< 1万', color: colors[0] },
            ],
        })

        var dat = new window.Loca.Dat()
        dat.addLayer(pl, 'GDP')

        // 动画
        map.on('complete', function () {
            pl.addAnimate({
                key: 'radius',
                value: [0, 1],
                duration: 2000,
                easing: 'ElasticOut',
                // yoyo: false,
                // repeat: 1,
            })
            pl.show(600)
        })

        map.on('mousemove', (e) => {
            const feat = pl.queryFeature(e.pixel.toArray())

            if (feat) {
                pl.setStyle({
                    unit: 'meter',
                    radius: (index, f) => {
                        var n = f.properties['人口'] * 100
                        if (f === feat) {
                            return n + 30000
                        }
                        return n
                    },
                    color: (index, f) => {
                        var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000))
                        return colors[n]
                    },
                    borderWidth: (index, f) => {
                        return f === feat ? 20000 : 0
                    },
                    blurWidth: -1,
                })
            }
        })
    }

    render () {
        return (
            <div>
                <div id="container"></div>
            </div>
        )
    }
}

export default Heatmap
