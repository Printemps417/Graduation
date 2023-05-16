import { Breadcrumb } from "antd"
import { useSearchParams } from "react-router-dom"
import { useContext, createContext } from 'react'
import { DatabaseContext } from '../App'
import { Collapse } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { Space, Table, Tag, Button, message, Modal, Upload } from 'antd'
import axios from 'axios'
import { setToken, getToken, removeToken } from '../tools'
import { PoweroffOutlined } from '@ant-design/icons'
import { LaptopOutlined, ExclamationCircleOutlined, DownloadOutlined, RightOutlined, DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import SelectTable from "./SelectTable"
import '../styles/Database.css'

const { Panel } = Collapse
const { confirm } = Modal
const { Column, ColumnGroup } = Table
export const ExtractListContext = createContext()
const Database = () => {
    const { useritem, setUseritem, dbname, setDbname } = useContext(DatabaseContext)
    let [params] = useSearchParams()
    let database = params.get('database')
    // useSearch从路由跳转的url地址中传参，得到当前数据库名

    let [curtable, setCurtable] = useState("taxi10005")
    const [tablename, setTablename] = useState([])
    const [tabledata, setTabledata] = useState([])
    const [tablelist, setTablelist] = useState([])
    const [loadings, setLoadings] = useState([])
    const [downloadurl, setDownloadurl] = useState("")
    const username = getToken()

    // 发送get请求，抓取数据表项列表
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get(`http://localhost:8088/gettablename?databasename=${database}`)
                // console.log(`http://localhost:8088/gettablename?databasename=${database}`)
                const data = response.data
                setTablename(data)
                // console.log(tablename)
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
                // setTabledata(data.slice(0, 500))
                setTabledata(data)
                curtable = data[0]
                // 为了页面响应速度，只展示前500项内容
            } catch (error) {
                console.error(error)
                const tablename = ["Error! Please check your network connection!"]
            }
        }
        fetchtableData()
    }, [curtable, database])

    // 监听tablelist变化
    useEffect(() => {
        console.log('选择列表更新: ', tablelist)
        const tablelistParam = tablelist.map((item) => `tablelist=${item}`).join('&')
        setDownloadurl(`http://localhost:8088/download-csv?dbname=${database}&${tablelistParam}`)
        console.log(downloadurl)
    }, [tablelist])

    const onChange = (key) => {
        console.log(key)
    }
    // console.log(database)
    // console.log('进入database')
    const handleDelete = (username, database, setLoading) => {
        confirm({
            title: '确认删除该数据库吗？',
            okText: '确认删除',
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

    const handleExtract = (downloadurl) => {
        confirm({
            width: 800,
            height: '300px',
            title: (<p>选中要提取数据的车辆编号</p>),
            destroyOnClose: false,
            okText: '完成选择',
            cancelText: '取消',
            content: (
                <>
                    <ExtractListContext.Provider value={{ tablelist, setTablelist }}>
                        <div style={{ height: '400px', overflow: 'auto' }}>
                            <SelectTable tablename={tablename} />
                        </div>
                    </ExtractListContext.Provider>
                </>
            ),
            icon: <ExclamationCircleOutlined style={{ color: 'green' }} />,
            onOk: () => {
                console.log('选择完成')
            },
            onCancel: () => {
                console.log('取消')
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
                    style={{ left: '57%', position: 'absolute' }}
                    icon={<DownloadOutlined />}
                    onClick={() => {
                        window.open(downloadurl)
                    }}
                >下载数据</Button>
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    style={{ left: '66%', position: 'absolute' }}
                    loading={loadings[3]}
                    onClick={() => handleExtract()}
                >
                    批量选择
                </Button>
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    style={{ left: '75%', position: 'absolute', backgroundColor: "green" }}
                    loading={loadings[2]}
                    onClick={() => handleDistinct(database, setLoadings)}
                >
                    数据库去重
                </Button>
                {/* 对数据库中内容进行去重 */}
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    style={{ backgroundColor: 'red', position: 'absolute', left: '85%' }}
                    loading={loadings[1]}
                    onClick={() => handleDelete(username, database, setLoadings)}
                >
                    删除数据库
                </Button>
                {/* 根据用户名和数据库名删除数据库 */}
            </div>

            <div id="container" style={{ display: 'flex', flexDirection: 'row' }}>
                <Collapse accordion style={{ flex: 1 }}>
                    {tablename.slice(0, 200).map((name, index) => (
                        <Panel
                            header={`TableName：${name}`}
                            key={index + 1}
                            onClick={() => {
                                setCurtable(name)
                                // console.log(name)
                            }}
                            style={{
                                // backgroundColor: '#fff', // 设置背景色为白色，这个属性会将CSS的覆盖！
                                transition: 'background-color 0.3s ease-in-out', // 添加过渡效果
                            }}
                            extra={<Button icon=<DoubleRightOutlined /> onClick={(e) => {
                                e.stopPropagation()
                                // 导出时不进行数据展示
                                setTablelist([...tablelist, name])
                            }}>导出</Button>}
                            className="hoverable-panel" // 添加自定义 class 名称
                        >
                            <Table dataSource={tabledata} >
                                <Column title="编号" dataIndex="id" key="id" />
                                <Column title="时间" dataIndex="time" key="time" />
                                <Column title="精度" dataIndex="lon" key="lon" />
                                <Column title="维度" dataIndex="lat" key="lat" />
                                <Column title="满载" dataIndex="if_empty" key="if_empty"
                                    // 对是否空车进行二级渲染
                                    render={(if_empty) => {
                                        return if_empty ? (<Tag color="blue">Yes</Tag>) : (<Tag color="green">No</Tag>)
                                    }} />
                                <Column title="速度" dataIndex="speed" key="speed" />
                            </Table>
                            {/* 映射成span组件 */}
                        </Panel>
                    ))}
                </Collapse>
                {/* 可拖动的分割线 */}
                <div
                    style={{
                        width: '3px',
                        backgroundColor: 'black',
                        alignSelf: 'stretch',
                        cursor: 'col-resize',
                    }}
                ></div>
                <Collapse accordion style={{ flex: 1 }}>
                    {tablelist.map((name, index) => (
                        <Panel
                            header={`TableName：${name}`}
                            key={index + 1}
                            onClick={() => {
                                setCurtable(name)
                                // console.log(name)
                            }}
                            style={{
                                // backgroundColor: '#fff', // 设置背景色为白色，这个属性会将CSS的覆盖！
                                // width: '400px',
                                transition: 'background-color 0.3s ease-in-out', // 添加过渡效果
                            }}
                            extra={<Button icon=<DoubleLeftOutlined /> onClick={(e) => {
                                e.stopPropagation()
                                setTablelist(tablelist.filter((item) => item !== name))
                            }}>取消</Button>}
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
                                        return if_empty ? (<Tag color="blue">Yes</Tag>) : (<Tag color="green">No</Tag>)
                                    }} />
                                <Column title="车辆速度" dataIndex="speed" key="speed" />
                            </Table>
                            {/* 映射成span组件 */}
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </>
    )
}
export default Database
// const [dragging, setDragging] = useState(false)
// const [width, setWidth] = useState('50%')
// const containerRef = useRef(null)
// useEffect(() => {


//     document.addEventListener('mousemove', handleMouseMove)
//     document.addEventListener('mouseup', handleMouseUp)

//     return () => {
//         document.removeEventListener('mousemove', handleMouseMove)
//         document.removeEventListener('mouseup', handleMouseUp)
//     }
// }, [dragging])

// const handleMouseMove = (e) => {
//     if (!dragging || !containerRef.current) return
//     const containerRect = containerRef.current.getBoundingClientRect()
//     const containerWidth = containerRect.width
//     const mouseX = e.pageX
//     const newWidth = `${((mouseX - containerRect.left) / containerWidth) * 100}%`
//     setWidth(newWidth)
// }

// const handleMouseUp = () => {
//     setDragging(false)
// }
// const handleMouseDown = (e) => {
//     e.preventDefault()
//     setDragging(true)
// }