import { Table, Tag, Card } from 'antd'
import { useState, useContext, useEffect } from 'react'
import { ExtractListContext } from './Database'
import AMapLoader from '@amap/amap-jsapi-loader'
import axios from 'axios'
import { Line } from '@antv/g2plot'
import Plot from './Plot'

const TripReport = ({ tabledata }) => {
    const columns = [
        {
            title: '所在位置',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '接受时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '速度（km/s）',
            dataIndex: 'speed',
            key: 'speed',
        },
    ]

    const Amap = AMapLoader.load({
        key: '2109b1cf6320763f85398e3a305f34c1', // 申请好的Web端开发者Key，首次调用 load 时必填
        securityJsCode: '6253b21ba2418ff654d06778cc04ab38',
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })

    const [timearray, setTimeArray] = useState([])
    const [speedarray, setSpeedArray] = useState([])
    const [triparray, setTripArray] = useState([])
    const [totaltime, setTotalTime] = useState(0)
    const [runtime, setRuntime] = useState(0)
    const [totaltrip, setTotalTrip] = useState(0)

    function calculateManhattanDistance (lat1, lon1, lat2, lon2) {
        const earthRadius = 6371 // 地球半径（单位：千米）
        // 将经纬度转换为弧度
        const toRadians = (degrees) => { return degrees * (Math.PI / 180) }
        const deltaLat = toRadians(lat2 - lat1)
        const deltaLon = toRadians(lon2 - lon1)
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
        const distance = 2 * Math.asin(Math.sqrt(a)) * earthRadius
        return distance * 1000
    }
    function calculateTimeDifferenceInSeconds (time1, time2) {
        const date1 = new Date(time1)
        const date2 = new Date(time2)

        // 获取两个时间的时间戳（单位：毫秒）
        const timestamp1 = date1.getTime()
        const timestamp2 = date2.getTime()

        // 计算秒数差
        const differenceInSeconds = Math.abs(timestamp2 - timestamp1) / 1000

        return differenceInSeconds
    }
    useEffect(() => {
        console.log(tabledata)
        async function processdata () {
            for (let i = 0; i < 300; i++) {
                let dis = calculateManhattanDistance(
                    tabledata[i].lat,
                    tabledata[i].lon,
                    tabledata[i + 1].lat,
                    tabledata[i + 1].lon
                )
                let distime = calculateTimeDifferenceInSeconds(tabledata[i].time, tabledata[i + 1].time)
                if (dis > 20) {
                    setRuntime(prevRuntime => prevRuntime + distime)
                }
                setTotalTime(prevTotalTime => prevTotalTime + distime)
                setTotalTrip(prevTotalTrip => prevTotalTrip + dis)
                setTimeArray(prevTimeArray => [...prevTimeArray, tabledata[i].time])
                setSpeedArray(prevSpeedArray => [...prevSpeedArray, (dis / distime).toFixed(2)])

                const response = await axios.get(`http://localhost:8088/location?loca=${tabledata[i].lat}%2C${tabledata[i].lon}`)
                const formattedAddress = response.data.result.formatted_address
                setTripArray(prevTripArray => [...prevTripArray, formattedAddress])
            }
        }
        processdata()

    }, []) // Empty dependency array to ensure the effect runs only once


    return (
        <>
            <Card title={`轨迹1： 从 ${triparray[0]} 至 ${triparray[triparray.length - 1]}`} bordered={false} style={{ width: "100%" }}>
                <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ marginRight: '50px' }}>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹总路程：{(totaltrip).toFixed(2)}米</p>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>全程平均速度：{(3.6 * totaltrip / totaltime).toFixed(2)}km/h</p>
                        <p style={{ fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>最高瞬时速度：{Math.max(...speedarray)}</p>
                    </div>
                    <div>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹开始时间：{timearray[0]}</p>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹结束时间：{timearray[99] ? timearray[99] : timearray[-1]}</p>
                        <p style={{ fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>非停靠时间: {runtime}秒</p>
                    </div>
                </div>
            </Card>
            {/* <Plot></Plot> */}
            <Table dataSource={timearray.slice(0, 100).map((item, index) => (
                {
                    key: index,
                    name: triparray[index],
                    time: timearray[index],
                    speed: speedarray[index]
                }
            ))} columns={columns}></Table>

            <Card title={`轨迹2： 从 ${triparray[100]} 至 ${triparray[199] ? triparray[199] : triparray[-1]}`} bordered={false} style={{ width: "100%" }}>
                <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ marginRight: '50px' }}>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹总路程：{(totaltrip).toFixed(2)}米</p>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>全程平均速度：{(3.6 * totaltrip / totaltime).toFixed(2)}km/h</p>
                        <p style={{ fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>最高瞬时速度：{Math.max(...speedarray)}</p>
                    </div>
                    <div>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹开始时间：{timearray[100]}</p>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹结束时间：{timearray[199] ? timearray[199] : timearray[-1]}</p>
                        <p style={{ fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>非停靠时间: {runtime}秒</p>
                    </div>
                </div>
            </Card>
            {/* <Plot></Plot> */}
            <Table dataSource={timearray.slice(100, 200).map((item, index) => (
                {
                    key: index,
                    name: triparray[index],
                    time: timearray[index],
                    speed: speedarray[index]
                }
            ))} columns={columns}></Table>

            <Card title={`轨迹3： 从 ${triparray[200]} 至 ${triparray[299] ? triparray[299] : triparray[-1]}`} bordered={false} style={{ width: "100%" }}>
                <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ marginRight: '50px' }}>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹总路程：{(totaltrip).toFixed(2)}米</p>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>全程平均速度：{(3.6 * totaltrip / totaltime).toFixed(2)}km/h</p>
                        <p style={{ fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>最高瞬时速度：{Math.max(...speedarray)}</p>
                    </div>
                    <div>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹开始时间：{timearray[200]}</p>
                        <p style={{ marginBottom: '10px', fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>轨迹结束时间：{timearray[299] ? timearray[299] : timearray[-1]}</p>
                        <p style={{ fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>非停靠时间: {runtime}秒</p>
                    </div>
                </div>
            </Card>
            {/* <Plot></Plot> */}
            <Table dataSource={timearray.slice(200, 300).map((item, index) => (
                {
                    key: index,
                    name: triparray[index],
                    time: timearray[index],
                    speed: speedarray[index]
                }
            ))} columns={columns}></Table>
        </>
    )
}

export default TripReport