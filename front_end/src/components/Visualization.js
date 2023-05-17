import React, { Component, useState, useRef } from 'react'
import { CodepenOutlined, PlusOutlined, RedoOutlined, FolderOpenOutlined, UploadOutlined } from '@ant-design/icons'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme, Button, Drawer, Form, Col, Row, Input, DatePicker, Select, Space, Upload, message } from 'antd'
import '../styles/Visualization.css'
import { useContext } from 'react'
import { DatabaseContext } from '../App'
import AntMap from './AntMap'
import axios from 'axios'

const { Header, Content, Footer, Sider } = Layout
const { Option } = Select
const Visualization = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const [AddLayer, setAddLayer] = useState(false)
    const [ShowLayer, setShowLayer] = useState(false)

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


    return (
        <>
            <AntMap></AntMap>
            {/* Mapbox地图 */}

            {/* 按钮组件 */}
            <div style={{ position: 'fixed', left: '3%', bottom: '23%' }}>
                <Button
                    type="primary"
                    icon={<CodepenOutlined />}
                    onClick={() => setShowLayer(true)}>管理图层</Button>
                <Drawer title="Layers" width={300} closable={false} onClose={() => setShowLayer(false)} open={ShowLayer} placement='left'>
                    <h1>图层管理界面</h1>
                </Drawer>
            </div >
            <div style={{ position: 'fixed', left: '3%', bottom: '16%' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setAddLayer(true)}>添加图层</Button>
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
                            <Button onClick={() => setAddLayer(false)} type="primary">
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
                                    <Input placeholder="输入图层名称" />
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
                                    <Select placeholder="选择待添加图层类型">
                                        <Option value="private">聚合点图</Option>
                                        <Option value="public">散点图</Option>
                                        <Option value="public">热力图</Option>
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
                                        <Option value="private">.csv</Option>
                                        <Option value="public">.txt</Option>
                                        <Option value="public">.json</Option>
                                        <Option value="public">.geojson</Option>
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
                                    <Input.TextArea rows={4} placeholder="描述你的图层信息" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div >
            <div style={{ position: 'fixed', left: '3%', bottom: '9%' }}>
                <Button
                    type="primary"
                    icon={<RedoOutlined />}
                    onClick={() => { window.location.reload() }}>刷新地图</Button>
            </div>
        </>
    )
}

export default Visualization
