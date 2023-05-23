import { Table, Tag } from 'antd'
import { useState, useContext, useEffect } from 'react'
import { ExtractListContext } from './Database'
import AMapLoader from '@amap/amap-jsapi-loader'
import axios from 'axios'
const TripReport = ({ tabledata }) => {
    const { Column, ColumnGroup } = Table
    const Amap = AMapLoader.load({
        key: '2109b1cf6320763f85398e3a305f34c1', // 申请好的Web端开发者Key，首次调用 load 时必填
        securityJsCode: '6253b21ba2418ff654d06778cc04ab38',
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
    const [totaltime, setTotaltime] = useState(0)
    const [totaltrip, setTotaltrip] = useState(0)
    const [tripinfo, setTripinfo] = useState(["途径地点"]) // 使用 useState 创建 tripinfo 状态
    function calculateManhattanDistance (lat1, lon1, lat2, lon2) {
        const earthRadius = 6371 // 地球半径（单位：千米）

        // 将经纬度转换为弧度
        const toRadians = (degrees) => {
            return degrees * (Math.PI / 180)
        }
        // 计算曼哈顿距离
        const deltaLat = toRadians(lat2 - lat1)
        const deltaLon = toRadians(lon2 - lon1)
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = earthRadius * c * 1000

        // 返回距离（以米为单位）
        return distance
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
        // 异步请求地理位置信息的函数
        const fetchLocationInfo = async (lat, lon) => {
            try {
                const response = await axios.get(`http://localhost:8088/location?loca=${lat}%2C${lon}`)
                const formattedAddress = response.data.result.formatted_address
                setTripinfo(prevTripinfo => [...prevTripinfo, formattedAddress]) // 更新 tripinfo 数组
            } catch (error) {
                console.log(error)
            }
        }

        // 计算总路程和总行驶时间的变量
        let totaltrip = 0
        let totaltime = 0

        // 循环处理每个表格数据
        for (let i = 0; i < tabledata.length - 1; i++) {
            if (tabledata[i].speed !== 0) {
                setTotaltime(totaltime + calculateTimeDifferenceInSeconds(tabledata[i].time, tabledata[i + 1].time))
            }
            setTotaltrip(totaltrip + calculateManhattanDistance(tabledata[i].lat, tabledata[i].lon, tabledata[i + 1].lat, tabledata[i + 1].lon))
            // 发起异步请求获取地理位置信息
            fetchLocationInfo(tabledata[i].lat, tabledata[i].lon)
        }
    }, [])

    return (
        <>
            <p>总路程：{(totaltrip).toFixed(2)}米</p>
            <p>总行驶时间：{totaltime}秒</p>
            <p>平均速度：{(3.6 * totaltrip / totaltime).toFixed(2)}km/h</p>
            {tripinfo.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
        </>
    )
}

export default TripReport