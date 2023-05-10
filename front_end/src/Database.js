import { Breadcrumb } from "antd"
import { useSearchParams } from "react-router-dom"
import { useContext } from 'react'
import { DatabaseContext } from './App'
import { Collapse } from 'antd'
import { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd'
import axios from 'axios'
import './Database.css'

const { Panel } = Collapse
const { Column, ColumnGroup } = Table
const Database = () => {
    const { useritem, setUseritem, dbname, setDbname } = useContext(DatabaseContext)
    let [params] = useSearchParams()
    let database = params.get('database')
    let [curtable, setCurtable] = useState("taxi10005")
    const [tablename, setTablename] = useState([])
    const [tabledata, setTabledata] = useState([])
    // useSearch从路由跳转的url地址中传参

    // 发送get请求，抓取数据表项列表
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get(`http://localhost:8088/gettablename?databasename=${database}`)
                console.log(`http://localhost:8088/gettablename?databasename=${database}`)
                const data = response.data
                setTablename(data.slice(0, 50))
                console.log(tablename[0])
                setCurtable(tablename[0])
                // 为了页面响应速度，只展示前50项内容
            } catch (error) {
                console.error(error)
                const tablename = ["Error! Please check your network connection!"]
            }
        }
        fetchData()
    }, [database])
    // 依赖项为database，而不是tablename

    // 发送get请求，抓取数据表内容
    useEffect(() => {
        async function fetchtableData () {
            try {
                const response = await axios.get(`http://localhost:8088/gettabledata?databasename=${database}&tablename=${curtable}`)
                console.log(`http://localhost:8088/gettabledata?databasename=${database}&tablename=${curtable}`)
                const data = response.data
                setTabledata([])
                // 防乱码
                setTabledata(data.slice(0, 500))
                curtable = data[0]
                // 为了页面响应速度，只展示前500项内容
            } catch (error) {
                console.error(error)
                const tablename = ["Error! Please check your network connection!"]
            }
        }
        fetchtableData()
    }, [curtable, database])

    const onChange = (key) => {
        console.log(key)
    }
    // console.log(database)
    // console.log('进入database')
    return (
        <>
            <h1>DATABASE:{database}</h1>
            <Collapse accordion>
                {tablename.map((name, index) => (
                    <Panel
                        header={`车辆编号：${name}`}
                        key={index + 1}
                        onClick={() => {
                            setCurtable(name)
                            console.log(name)
                        }}>
                        <Table dataSource={tabledata}>
                            <Column title="车辆编号" dataIndex="id" key="id" />
                            <Column title="时间" dataIndex="time" key="time" />
                            <Column title="精度" dataIndex="lon" key="lon" />
                            <Column title="维度" dataIndex="lat" key="lat" />
                            <Column title="载客状态" dataIndex="if_empty" key="if_empty"
                                // 对是否空车进行二级渲染
                                render={(if_empty) => {
                                    return if_empty ? (<Tag color="green">Yes</Tag>) : (<Tag color="blue">No</Tag>)
                                }} />
                            <Column title="车辆速度" dataIndex="speed" key="speed" />
                        </Table>
                        {/* <p>{tabledata.map((data) => (
                            <div key={data.index}>
                                <span>ID: {data.id}</span>
                                <span>Time: {data.time}</span>
                                <span>Lon: {data.lon}</span>
                                <span>Lat: {data.lat}</span>
                                <span>Empty: {data.if_empty ? 'Yes' : 'No'}</span>
                                <span>Speed: {data.speed}</span>
                            </div>
                        ))}</p> */}
                        {/* 映射成span组件 */}
                    </Panel>
                ))}
            </Collapse>
        </>
    )
}
export default Database