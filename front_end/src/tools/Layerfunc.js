import { PointLayer, Source, HeatmapLayer, LineLayer } from '@antv/l7'

const addClusterLayer = (url, sceneInstance, ifvisible) => {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // console.log('获取数据：' + data)
            // 聚合点数据
            const dataSource = new Source(data, {
                parser: {
                    type: 'csv',
                    x: 'Lon',
                    y: 'Lat'

                },
                cluster: true
            })
            const pointLayer = new PointLayer({
                autoFit: true
            })
                .source(dataSource)
                .shape('circle')
                .scale('point_count', {
                    type: 'quantile'
                })
                .size('point_count', [5, 10, 15, 20, 25])
                .active(true)
                .color('green')
                .style({
                    strokeWidth: 0,
                    stroke: '#fff',
                    opacity: 0.5
                })


            // 聚合图标注
            const pointLayerText = new PointLayer({
                autoFit: false
            })
                .source(dataSource)
                .shape('point_count', 'text')
                .size(15)
                .active(true)
                .color('#fff')
                .style({
                    strokeWidth: 0.5,
                    stroke: '#fff'
                })

            if (ifvisible) {
                pointLayer.show()
                pointLayerText.show()
            }
            else {
                pointLayer.hide()
                pointLayerText.hide()
            }
            sceneInstance.addLayer(pointLayer)
            sceneInstance.addLayer(pointLayerText)
        })
}

const addScatterLayer = (url, sceneInstance, ifvisible) => {
    fetch('http://localhost:3000/SampleData/ScatterSample.csv')
        .then(response => response.text())
        .then(data => {
            // 散点图数据
            const ScatterLayer = new PointLayer({})
                .source(data, {
                    parser: {
                        type: 'csv',
                        x: 'Lon',
                        y: 'Lat'
                    }
                })
                .size(0.5)
                .color('#080298')
            if (ifvisible) {
                ScatterLayer.show()
            }
            else {
                ScatterLayer.hide()
            }
            sceneInstance.addLayer(ScatterLayer)
        })
}
const addHeatmapLayer = (url, sceneInstance, ifvisible) => {
    fetch(
        'http://localhost:3000/SampleData/HeatSample.csv'
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
            if (ifvisible) {
                layer.show()
            }
            else {
                layer.hide()
            }
            sceneInstance.addLayer(layer)
        })
    console.log('加载组件成功！')
}
const addHeatmapLayer2 = (url, scene, ifvisible) => {
    fetch(
        'http://localhost:3000/SampleData/HeatmapSample2.json'
    )
        .then(res => res.json())
        .then(data => {
            const layer = new HeatmapLayer({})
                .source(data)
                .shape('heatmap')
                .size('mag', [0, 1.0]) // weight映射通道
                .style({
                    intensity: 2,
                    radius: 20,
                    rampColors: {
                        colors: [
                            '#FF4818',
                            '#F7B74A',
                            '#FFF598',
                            '#91EABC',
                            '#2EA9A1',
                            '#206C7C'
                        ].reverse(),
                        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
                    }
                })
            if (ifvisible) {
                layer.show()
            }
            else {
                layer.hide()
            }
            scene.addLayer(layer)
        })
}
const addTextLayer = (url, sceneInstance, ifvisible) => {
    fetch('http://localhost:3000/SampleData/TextSample.json')
        .then(res => res.json())
        .then(data => {
            const TextLayer = new PointLayer({})
                .source(data.list, {
                    parser: {
                        type: 'json',
                        x: 'j',
                        y: 'w'
                    }
                })
                .shape('m', 'text')
                .size(12)
                .color('w', ['#0e0030', '#0e0030', '#0e0030'])
                .style({
                    textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
                    textOffset: [0, 0], // 文本相对锚点的偏移量 [水平, 垂直]
                    spacing: 2, // 字符间距
                    padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
                    stroke: '#ffffff', // 描边颜色
                    strokeWidth: 0.3, // 描边宽度
                    strokeOpacity: 1.0
                })
            if (ifvisible) {
                TextLayer.show()
            }
            else {
                TextLayer.hide()
            }

            sceneInstance.addLayer(TextLayer)
        })
}
const addBubbleLayer = (url, scene, ifvisible) => {
    fetch(
        'http://localhost:3000/SampleData/BubbleSample.json'
    )
        .then(res => res.json())
        .then(data => {
            data.features = data.features.filter(item => {
                return item.properties.capacity > 800
            })
            const pointLayer = new PointLayer({})
                .source(data)
                .shape('circle')
                .size('capacity', [0, 16])
                .color('capacity', [
                    '#34B6B7',
                    '#4AC5AF',
                    '#5FD3A6',
                    '#7BE39E',
                    '#A1EDB8',
                    '#CEF8D6'
                ])
                .active(true)
                .style({
                    opacity: 0.5,
                    strokeWidth: 0
                })
            if (ifvisible) {
                pointLayer.show()
            }
            else {
                pointLayer.hide()
            }

            scene.addLayer(pointLayer)
        })
}
const addTripLayer = (url, scene, ifvisible) => {
    fetch(
        'http://localhost:3000/SampleData/TripDataSample.json'
    )
        .then(res => res.json())
        .then(data => {
            const layer = new LineLayer({})
                .source(data, {
                    parser: {
                        type: 'json',
                        coordinates: 'coordinates'
                    }
                })
                .size(0.5)
                .shape('line')
                .active(true)
                .color('length', [
                    '#0A3663',
                    '#1558AC',
                    '#3771D9',
                    '#4D89E5',
                    '#64A5D3',
                    '#72BED6',
                    '#83CED6',
                    '#A6E1E0',
                    '#B8EFE2',
                    '#D7F9F0'
                ])
            if (ifvisible) {
                layer.show()
            }
            else {
                layer.hide()
            }
            scene.addLayer(layer)
        })
}
const addDynaTripLayer = (url, scene, ifvisible) => {
    fetch(
        'http://localhost:3000/SampleData/DynamicTripSample.json'
    )
        .then(res => res.json())
        .then(data => {
            const lineLayer = new LineLayer()
                .source(data, {
                    parser: {
                        type: 'json',
                        coordinates: 'path'
                    }
                })
                .size(1.5)
                .shape('line')
                .color('color', v => {
                    return `rgb(${v})`
                })
                .animate({
                    interval: 0.6,
                    trailLength: 1.5,
                    duration: 6
                })
            if (ifvisible) {
                lineLayer.show()
            }
            else {
                lineLayer.hide()
            }
            scene.addLayer(lineLayer)
        })
}
const addEqualLineLayer = (url, scene, ifvisible) => {
    fetch(
        'http://localhost:3000/SampleData/EqualLineSample.json'
    )
        .then(res => res.json())
        .then(data => {
            const layer = new LineLayer({})
                .source(data)
                .scale('value', {
                    type: 'quantile'
                })
                .size('value', [0.5, 1, 1.5, 2])
                .shape('line')
                .color(
                    'value',
                    [
                        '#0A3663',
                        '#1558AC',
                        '#3771D9',
                        '#4D89E5',
                        '#64A5D3',
                        '#72BED6',
                        '#83CED6',
                        '#A6E1E0',
                        '#B8EFE2',
                        '#D7F9F0'
                    ].reverse()
                )
            if (ifvisible) {
                layer.show()
            }
            else {
                layer.hide()
            }
            scene.addLayer(layer)
        })
}
export {
    addClusterLayer,
    addHeatmapLayer,
    addHeatmapLayer2,
    addScatterLayer,
    addTextLayer,
    addBubbleLayer,
    addDynaTripLayer,
    addEqualLineLayer,
    addTripLayer,
}