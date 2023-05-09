import { PoweroffOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useState } from 'react'
import { useSearchParams } from "react-router-dom"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import useItems from 'antd/es/menu/hooks/useItems'
import styles from './Adddb.module.css'
import { DatabaseContext } from './App'
import { InboxOutlined } from '@ant-design/icons'
import axios from 'axios'
import { message, Upload } from 'antd'
const Adddb = () => {
    const [loadings, setLoadings] = useState([])
    const { useritem, setUseritem } = useContext(DatabaseContext)
    // console.log(useritem, setUseritem)
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings]
            newLoadings[index] = true
            return newLoadings
        })
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings]
                newLoadings[index] = false
                setTimeout(() => {
                    setUseritem([...useritem, UserOutlined])
                }, 100)
                // 更改数据库列表
                return newLoadings
            })
        }, 500)
    }
    const { Dragger } = Upload
    const props = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:8088/upload/**',
        method: 'post',
        customRequest: (info) => {
            const formData = new FormData()
            formData.append('userFile', info.file)

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
                message.success(`${info.file.name} file uploaded successfully.`)
                info.onSuccess(response.data, info.file) // 将状态设置为 "success"
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
    return (
        <>
            <Space direction="vertical">
                <Space wrap>
                    <div style={{ textAlign: 'center' }}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
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
                                axios.post('http://localhost:8088/input/**', {
                                    headers: {
                                        'accept': '*/*'
                                    },
                                }).then((response) => {
                                    console.log(response)
                                    message.success(`file input successfully.`)
                                    setLoadings((prevLoadings) => {
                                        const newLoadings = [...prevLoadings]
                                        newLoadings[1] = false
                                        setTimeout(() => {
                                            setUseritem([...useritem, UserOutlined])
                                        }, 100)
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
                                marginTop: '50px'
                            }}
                        >
                            提交数据
                        </Button>
                    </div>
                </Space>
            </Space>
        </>
    )
}
export default Adddb