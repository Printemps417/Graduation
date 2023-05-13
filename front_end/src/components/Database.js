import { Breadcrumb } from "antd"
import { useSearchParams } from "react-router-dom"
import { useContext } from 'react'
import { DatabaseContext } from '../App'
import { Collapse } from 'antd'
import { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, message, Modal } from 'antd'
import axios from 'axios'
import { setToken, getToken, removeToken } from '../tools'
import { PoweroffOutlined } from '@ant-design/icons'
import '../styles/Database.css'

const { Panel } = Collapse
const { confirm } = Modal
const { Column, ColumnGroup } = Table

const Database = () => {
    const { useritem, setUseritem, dbname, setDbname } = useContext(DatabaseContext)
    let [params] = useSearchParams()
    let database = params.get('database')
    // useSearch从路由跳转的url地址中传参

    let [curtable, setCurtable] = useState("taxi10005")
    const [tablename, setTablename] = useState([])
    const [tabledata, setTabledata] = useState([])
    const [loadings, setLoadings] = useState([])
    const username = getToken()

    // 发送get请求，抓取数据表项列表
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get(`http://localhost:8088/gettablename?databasename=${database}`)
                // console.log(`http://localhost:8088/gettablename?databasename=${database}`)
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
    // 依赖项为database，而不是tablename。database更新时抓取数据表名列表

    // 发送get请求，抓取数据表内容
    useEffect(() => {
        async function fetchtableData () {
            try {
                const response = await axios.get(`http://localhost:8088/gettabledata?databasename=${database}&tablename=${curtable}`)
                console.log(`http://localhost:8088/gettabledata?databasename=${database}&tablename=${curtable}`)
                const data = response.data
                setTabledata([])
                // 重置防乱码
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
    const handleDelete = (username, database, setLoading) => {
        confirm({
            title: '确认删除该数据库吗？',
            okText: '确认',
            cancelText: '取消',
            onOk () {
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings]
                    newLoadings[1] = true
                    return newLoadings
                })
                axios
                    .delete(`http://localhost:8088/del_database?account=${username}&db=${database}`)
                    .then(() => {
                        message.success(`数据库${database}删除成功`)
                        setLoadings((prevLoadings) => {
                            const newLoadings = [...prevLoadings]
                            newLoadings[1] = false
                            // 更改数据库列表
                            return newLoadings
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        message.error(`数据库${database}删除失败`)
                        setLoadings((prevLoadings) => {
                            const newLoadings = [...prevLoadings]
                            newLoadings[1] = false
                            return newLoadings
                        })
                    })
            },
            onCancel () {
                console.log('Cancel')
            },
        })
    }
    const handleDistinct = (database, setLoading) => {
        confirm({
            title: '去重会导致重复数据丢失，确定去重？',
            okText: '确认',
            cancelText: '取消',
            onOk () {
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings]
                    newLoadings[2] = true
                    return newLoadings
                })
                axios
                    .delete(`http://localhost:8088/distinctTable?databasename=${database}`)
                    .then(() => {
                        message.success(`数据库${database}去重成功`)
                        setLoadings((prevLoadings) => {
                            const newLoadings = [...prevLoadings]
                            newLoadings[2] = false
                            // 更改数据库列表
                            return newLoadings
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        message.error('删除数据库失败')
                        setLoadings((prevLoadings) => {
                            const newLoadings = [...prevLoadings]
                            newLoadings[2] = false
                            return newLoadings
                        })
                    })
            },
            onCancel () {
                console.log('Cancel')
            },
        })
    }
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tag
                    color="blue"
                    style={{
                        marginBottom: '20px',
                        height: '45px',
                        fontSize: '25px',
                    }}><p
                        style={{
                            marginTop: '10px',
                        }}>
                        {getToken() == 'admin' ? "管理员视图——" : ""}DATABASE:{database}
                    </p></Tag>
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    style={{ left: '40%' }}
                    loading={loadings[2]}
                    onClick={() => handleDistinct(database, setLoadings)}
                >
                    数据库去重
                </Button>
                {/* 对数据库中内容进行去重 */}
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    style={{ backgroundColor: 'red', left: '45%' }}
                    loading={loadings[1]}
                    onClick={() => handleDelete(username, database, setLoadings)}
                >
                    删除数据库
                </Button>
                {/* 根据用户名和数据库名删除数据库 */}

            </div>
            <Collapse accordion>
                {tablename.map((name, index) => (
                    <Panel
                        header={`车辆编号：${name}`}
                        key={index + 1}
                        onClick={() => {
                            setCurtable(name)
                            console.log(name)
                        }}
                        style={{
                            // backgroundColor: '#fff', // 设置背景色为白色，这个属性会将CSS的覆盖！
                            transition: 'background-color 0.3s ease-in-out', // 添加过渡效果
                        }}
                        className="hoverable-panel" // 添加自定义 class 名称
                    >
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