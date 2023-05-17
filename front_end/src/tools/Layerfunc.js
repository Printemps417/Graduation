import { PointLayer, Source, HeatmapLayer, LineLayer } from '@antv/l7'

const addClusterLayer = (url, sceneInstance) => {
    fetch('http://localhost:3000/ScatterSample.csv')
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
            sceneInstance.addLayer(pointLayer)
            sceneInstance.addLayer(pointLayerText)
        })
}

const addScatterLayer = (url, sceneInstance) => {
    fetch('http://localhost:3000/ScatterSample.csv')
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

            sceneInstance.addLayer(ScatterLayer)
        })
}
const addHeatmapLayer = (url, sceneInstance) => {
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
}

export {
    addClusterLayer,
    addHeatmapLayer,
    addScatterLayer
}