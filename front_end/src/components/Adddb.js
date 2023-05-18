import { PoweroffOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import useItems from 'antd/es/menu/hooks/useItems'
import '../styles/Adddb.css'
import { DatabaseContext } from '../App'
import { InboxOutlined } from '@ant-design/icons'
import axios from 'axios'
import { message, Upload, Alert, Modal, Tag } from 'antd'
import { setToken, getToken, removeToken } from '../tools'

const Adddb = () => {
    const [loadings, setLoadings] = useState([])
    const [infoname, setInfoname] = useState("")
    const [endproc, setEndproc] = useState("This is the terminal stdout in the back_end")
    const { useritem, setUseritem, dbname, setDbname } = useContext(DatabaseContext)

    axios.get('http://localhost:8088/getTerminal').then((response) => {
        setEndproc(response.data)
    })
    const { Dragger } = Upload
    const props = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:8088/upload/**',
        method: 'post',
        customRequest: (info) => {
            const formData = new FormData()
            formData.append('userFile', info.file)
            // 将上传的info.file与userFile绑定，实现文件上传。在上传文件的情况下，formData中将包含文件数据，以及文件的文件名和MIME类型等相关信息。

            axios.post('http://localhost:8088/upload/**', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': '*/*'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    info.onProgress({ percent: percentCompleted }, info.file)
                },
            }).then((response, progressIcon) => {
                console.log(response)
                // 获得当前用户名
                message.success(`${info.file.name} file uploaded successfully.`)
                info.onSuccess(response.data, info.file) // 将状态设置为 "success"
                setTimeout(() => {
                    setDbname([...dbname, `${info.file.name.slice(0, -4)}`])
                    setInfoname(info.file.name.slice(0, -4))
                }, 100)
            }).catch((error) => {
                console.log(error)
                message.error(`${info.file.name} file upload failed.`)
            })
        },
        // onChange (info) {
        //     const { status } = info.file
        //     if (status !== 'uploading') {
        //         console.log(info.file, info.fileList)
        //     }
        //     if (status === 'done') {
        //         message.success(`${info.file.name} file uploaded successfully.`)
        //     } else if (status === 'error') {
        //         message.error(`${info.file.name} file upload failed.`)
        //     }
        // },
        onDrop (e) {
            console.log('Dropped files', e.dataTransfer.files)
        },
    }
    setInterval(() => {
        axios.get('http://localhost:8088/getTerminal').then((response) => {
            setEndproc(response.data)
        })
    }, 10000)
    // 每10秒钟刷新终端信息显示界面
    return (
        <>
            <Space>
                <div style={{
                    textAlign: 'center',
                    innerWidth: '100%',
                    width: '100%',
                    marginLeft: "50%",
                    marginTop: "10%"
                }}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽本地文件上传（.csv .json .txt）</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        loading={loadings[1]}
                        onClick={() => {
                            setLoadings((prevLoadings) => {
                                const newLoadings = [...prevLoadings]
                                newLoadings[1] = true
                                return newLoadings
                            })
                            axios.post(`http://localhost:8088/add_database?account=${getToken()}&db=${infoname}`)
                            setUseritem([...useritem, UserOutlined])
                            axios.post('http://localhost:8088/input/**', {
                                headers: {
                                    // 执行导入操作
                                    'accept': '*/*'
                                },
                            }).then((response) => {
                                // 异步操作，可在期间进行其他操作
                                console.log(response)
                                message.success(`file input successfully.`)
                                // axios.post(`http://localhost:8088/add_database?account=${username}&db=${infoname}`)
                                // 将数据库信息导入用户json列表
                                setLoadings((prevLoadings) => {
                                    const newLoadings = [...prevLoadings]
                                    newLoadings[1] = false
                                    // 更改数据库列表
                                    return newLoadings
                                })
                            }).catch((error) => {
                                console.log(error)
                                message.error(`file input failed.`)
                                setLoadings((prevLoadings) => {
                                    const newLoadings = [...prevLoadings]
                                    newLoadings[1] = false
                                    return newLoadings
                                })
                            })
                        }}
                        style={{
                            margin: '10px',
                            marginTop: '50px',
                            marginLeft: '38%',
                            width: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px'
                        }}
                    >
                        提交数据
                    </Button>
                </div>

            </Space>
            <Alert
                style={{
                    margin: "100px",
                }}
                message={(<p>{endproc}</p>)}
                type="info" />
        </>
    )
}
export default Adddb