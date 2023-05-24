import { Table, Tag } from 'antd'
import { useState, useContext, useEffect } from 'react'
import { ExtractListContext } from './Database'
import AMapLoader from '@amap/amap-jsapi-loader'
import axios from 'axios'
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
    // let totaltime = 0
    // let runtime = 0
    // let totaltrip = 0

    // let timearray = []
    // let speedarray = []
    // let triparray = []

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
            for (let i = 0; i < 200; i++) {
                let dis = calculateManhattanDistance(
                    tabledata[i].lat,
                    tabledata[i].lon,
                    tabledata[i + 1].lat,
                    tabledata[i + 1].lon
                )
                let distime = calculateTimeDifferenceInSeconds(tabledata[i].time, tabledata[i + 1].time)
                if (dis > 10) {
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


    // 
    // const processdata = async () => {
    //     for (let i = 0; i < 200; i++) {
    //         let dis = calculateManhattanDistance(tabledata[i].lat, tabledata[i].lon, tabledata[i + 1].lat, tabledata[i + 1].lon)
    //         let distime = calculateTimeDifferenceInSeconds(tabledata[i].time, tabledata[i + 1].time)
    //         if (dis > 10) {
    //             runtime += distime
    //         }
    //         totaltime += distime
    //         totaltrip += dis
    //         timearray.push(tabledata[i].time)
    //         speedarray.push((dis / distime).toFixed(2))

    //         const response = await axios.get(`http://localhost:8088/location?loca=${tabledata[i].lat}%2C${tabledata[i].lon}`)
    //         const formattedAddress = response.data.result.formatted_address
    //         triparray.push(formattedAddress)
    //     }
    // }
    // processdata()

    return (
        <>
            <h1>轨迹1：</h1>
            <p>总路程：{(totaltrip).toFixed(2)}米</p>
            <p>总行程时间：{totaltime}秒</p>
            <p>非停靠时间: {runtime}</p>
            <p>平均速度：{(3.6 * totaltrip / totaltime).toFixed(2)}km/h</p>
            <Table dataSource={timearray.map((item, index) => (
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