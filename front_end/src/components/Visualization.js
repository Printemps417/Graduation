import React, { Component, useState, useRef, useEffect } from 'react'
import { CodepenOutlined, PlusOutlined, RedoOutlined, FolderOpenOutlined, UploadOutlined, DeleteOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { Layout, theme, Button, Drawer, Form, Col, Row, Input, DatePicker, Select, Space, Upload, message, Collapse, Alert, Radio } from 'antd'
import '../styles/Visualization.css'
import { useContext } from 'react'
import { DatabaseContext } from '../App'
import AntMap from './AntMap'
import axios from 'axios'
import { getToken } from '../tools'

const { Header, Content, Footer, Sider } = Layout
const { Option } = Select
const { Panel } = Collapse
const Visualization = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const [AddLayer, setAddLayer] = useState(false)
    const [ShowLayer, setShowLayer] = useState(false)
    const [layername, setLayername] = useState("")
    const [layerType, setLayerType] = useState("")
    const [layerDescribe, setLayerDescribe] = useState("")
    const [visible, setVisible] = useState([])
    const [actions, setActions] = useState([])
    const [describe, setDescribe] = useState([])
    const [layers, setLayers] = useState([])

    const colorOptions = [
        { color: '红', code: '#FF0000' },
        { color: '橙', code: '#FFA500' },
        { color: '黄', code: '#FFFF00' },
        { color: '绿', code: '#008000' },
        { color: '青', code: '#00FFFF' },
        { color: '蓝', code: '#0000FF' },
        { color: '紫', code: '#800080' },
        { color: '粉', code: '#FFC0CB' },
        { color: '黑', code: '#000000' },
        { color: '白', code: '#FFFFFF' },
        { color: '灰', code: '#808080' },
        { color: '棕', code: '#A52A2A' },
        { color: '金', code: '#FFD700' },
        { color: '银', code: '#C0C0C0' },
        { color: '红', code: '#FF0000' },
        { color: '橙红', code: '#FF4500' },
        { color: '黄绿', code: '#ADFF2F' },
        { color: '蓝绿', code: '#00FFFF' },
        { color: '藏青', code: '#000080' },
        { color: '紫红', code: '#C71585' }
    ]

    // 添加其他常见颜色选项...

    const [selectedColor, setSelectedColor] = useState('')
    const [FileUrl, setFileUrl] = useState('')

    const handleColorChange = (value) => {
        setSelectedColor(value)
    }

    // 文件上传参数
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
            }).then((response, progressIcon) => {
                console.log(response)
                // 获得当前用户名
                message.success(`${info.file.name} file uploaded successfully.`)
                info.onSuccess(response.data, info.file) // 将状态设置为 "success"
                setFileUrl(`http://localhost:8088/DownloadData?FileName=${info.file.name}`)
                console.log(`http://localhost:8088/DownloadData?FileName=${info.file.name}`)
            }).catch((error) => {
                console.log(error)
                message.error(`${info.file.name} file upload failed.`)
            })
        },
        onChange (info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
                setFileUrl('/public' + info.file.name)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }

    useEffect(() => {
        // 读取用户操作信息
        axios.get(`http://localhost:8088/userdata?username=${getToken()}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.data)
            .then((data) => {
                console.log(data)
                setActions(data.action)
                setVisible(data.visible)
                setDescribe(data.description)
                setLayers(data.layers)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const updateLayerinfo = () => {
        axios.get(`http://localhost:8088/userdata?username=${getToken()}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.data)
            .then((data) => {
                console.log(data)
                setActions(data.action)
                setVisible(data.visible)
                setDescribe(data.description)
                setLayers(data.layers)
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <AntMap></AntMap>
            {/* Mapbox地图 */}

            {/* 按钮组件 */}
            <div style={{ position: 'fixed', left: '3%', bottom: '12%', display: 'flex', flexDirection: 'column' }}>
                <Button
                    type="primary"
                    icon={<CodepenOutlined />}
                    style={{
                        margin: '10px',
                        width: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                    }}
                    onClick={() => {
                        setShowLayer(true)
                        console.log(layers)
                    }}>管理图层</Button>
                <Drawer title="Layers" width={300} closable={false} onClose={() => setShowLayer(false)} open={ShowLayer} placement='left'>
                    <Collapse defaultActiveKey={[1]}>
                        {layers.map((item, index) => (
                            <Panel header={`图层：${item}`} key={index + 1}
                                style={{
                                    // backgroundColor: '#fff', // 设置背景色为白色，这个属性会将CSS的覆盖！
                                    transition: 'background-color 0.3s ease-in-out', // 添加过渡效果
                                }}
                                className="hoverable-panel" // 添加自定义 class 名称
                                extra={<Button
                                    type="primary"
                                    icon=<ArrowDownOutlined />
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        // 导出时不进行数据展示
                                        axios.post(`http://localhost:8088/downLayer?account=${getToken()}&layer=${layers[index]}`)
                                            .then((response) => {
                                                message.success(response.data)
                                                updateLayerinfo()
                                                // 下移后更改列表信息
                                            }).catch((error) => {
                                                console.log(error)
                                            })
                                    }}
                                    title='下移图层'
                                    style={{}}
                                ></Button>}

                            >
                                <Radio.Group defaultValue={visible[index] ? "visible" : "unvisible"} buttonStyle="solid">
                                    <Radio.Button value="visible"
                                        onClick={() => {
                                            axios.post(`http://localhost:8088/toggle_visible?account=${getToken()}&layer=${layers[index]}`)
                                                .then((response) => {
                                                    message.success(response.data)
                                                }).catch((error) => {
                                                    console.log(error)
                                                })
                                        }}>可见</Radio.Button>
                                    <Radio.Button value="unvisible"
                                        onClick={() => {
                                            axios.post(`http://localhost:8088/toggle_visible?account=${getToken()}&layer=${layers[index]}`)
                                                .then((response) => {
                                                    message.success(response.data)
                                                }).catch((error) => {
                                                    console.log(error)
                                                })
                                        }}>隐藏</Radio.Button>
                                </Radio.Group>
                                <Alert
                                    style={{ marginTop: '10px' }}
                                    message={`图层类型：${actions[index]}`}
                                    type="info" />
                                <Alert
                                    style={{ marginTop: '10px' }}
                                    message={`图层描述：${describe[index]}`}
                                    type="info" />
                                <Button
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    style={{ backgroundColor: 'red', marginTop: "10px" }}
                                    onClick={() => {
                                        axios.delete(`http://localhost:8088/delete_userdata?account=${getToken()}&layer=${layers[index]}`)
                                            .then((response) => {
                                                updateLayerinfo()
                                                // 更新图层列表数据
                                                message.success('删除成功')
                                            })
                                        // 根据图层名删除图层
                                    }}
                                >
                                    删除图层
                                </Button>
                            </Panel>
                        )
                        )}
                    </Collapse>
                    <p style={{ marginTop: '50px', color: 'gray' }}>注：位置靠下的图层渲染优先级更高</p>
                </Drawer>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setAddLayer(true)}
                    style={{
                        margin: '10px',
                        width: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                    }}>
                    添加图层
                </Button>
                <Drawer
                    title="待添加图层信息"
                    width={420}
                    closable={false}
                    onClose={() => setAddLayer(false)}
                    open={AddLayer}
                    placement='left'
                    bodyStyle={{
                        paddingBottom: 80,
                    }}
                    extra={
                        <Space>
                            <Button onClick={() => setAddLayer(false)}>取消</Button>
                            <Button onClick={() => {
                                console.log('图层名' + layername)
                                console.log('图层类型' + layerType)
                                console.log('图层位置' + FileUrl)
                                console.log('图层描述' + layerDescribe)
                                // 向数据库中更新用户的图层信息
                                axios.post(`http://localhost:8088/update_userdata?account=${getToken()}&action=${layerType}&data=${FileUrl}&description=${layerDescribe}&layer=${layername}`, {
                                    headers: {
                                        accept: '*/*'
                                    }
                                }).then((response) => {
                                    message.success(`${response.data}`)
                                })
                                // setAddLayer(false)
                            }} type="primary">
                                确认添加
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: '输入图层名称',
                                        },
                                    ]}
                                >
                                    <Input placeholder="输入图层名称"
                                        onChange={(event) => setLayername(event.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="Layertype"
                                    label="LayerType"
                                    rules={[
                                        {
                                            required: true,
                                            message: '选择图层类型',
                                        },
                                    ]}
                                >
                                    <Select placeholder="选择待添加图层类型"
                                        onChange={(value) => setLayerType(value)}>
                                        <Option value="Scatter">散点图层</Option>
                                        <Option value="Cluster">聚合点图层</Option>
                                        <Option value="Bubble">气泡点图层</Option>
                                        <Option value="Text">文本图层</Option>
                                        <Option value="Heat">热力图层</Option>
                                        <Option value="HeatGrid">网格热力图层</Option>
                                        <Option value="Strip">静态轨迹图层</Option>
                                        <Option value="Dtrip">动态轨迹图层</Option>
                                        <Option value="Equal">等高线图层</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={17}>
                                <Form.Item
                                    name="filepath"
                                    label="FilePath"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select an owner',
                                        },
                                    ]}
                                >
                                    <Input placeholder="选择文件" value={FileUrl} />
                                    <Upload {...props}>
                                        <Button
                                            style={{ marginTop: '15px' }}
                                            icon={<UploadOutlined />}>上传规格化数据</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item
                                    name="Filetype"
                                    label="FileType"
                                    rules={[
                                        {
                                            required: true,
                                            message: '选择上传文件的格式',
                                        },
                                    ]}
                                >
                                    <Select placeholder="格式">
                                        <Option value="csv">.csv</Option>
                                        <Option value="txt">.txt</Option>
                                        <Option value="json">.json</Option>
                                        <Option value="geojson">.geojson</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="size"
                                    label="Size"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose the approver',
                                        },
                                    ]}
                                >
                                    {/* <Select placeholder="设置元素大小">
                                        <Option value="jack">Jack Ma</Option>
                                        <Option value="tom">Tom Liu</Option>
                                    </Select> */}
                                    <Input placeholder="输入元素Size（px）" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="color"
                                    label="Color"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose the approver',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="设置元素颜色"
                                        onChange={handleColorChange}
                                        value={selectedColor}
                                    >
                                        {colorOptions.map((option) => (
                                            <Option key={option.code} value={option.code}>
                                                <div
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        backgroundColor: option.code,
                                                        marginRight: '10px',
                                                    }}
                                                />
                                                {option.code}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: '描述你的图层信息',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="描述你的图层信息"
                                        onChange={(event) => setLayerDescribe(event.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
                <Button
                    type="primary"
                    icon={<RedoOutlined />}
                    onClick={() => { window.location.reload() }}
                    style={{
                        margin: '10px',
                        width: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                    }}>
                    刷新地图
                </Button>
            </div >
        </>
    )
}

export default Visualization
