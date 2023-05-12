import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Checkbox, Form, Input, notification, Space } from 'antd'
import { setToken, getToken, removeToken } from '../tools'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const token = getToken() || 'none'
    console.log(token)
    if (redirect || token != 'none') {
        if (redirect == false) {
            alert('您已登录！页面即将跳转')
        }
        return <Navigate to="/Data" replace={true} />
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // e.preventDefault()方法通常用于防止浏览器默认行为（比如提交表单或者打开链接）
        // 处理提交事件
        try {
            const response = await axios.get(`http://localhost:8088/userdata?username=${username}`, {})
            console.log(response)
            const data = await response.data
            console.log(data)
            if (data.password === password) {
                // 登录成功时设置token cookie，有效期为1天
                setToken(username)
                setRedirect(true)
                alert('登录成功！')
                // 登入成功时获得通行证
            } else {
                setError(true)
                setPassword('')
                alert('登录失败！请检查账号密码或网络连接')
            }
        } catch (e) {
            console.log(e)
            setError(true)
            setPassword('')

        }
    }

    return (
        <>
            <img
                src="/logo192.png"
                style={{
                    margin: '0 auto', // 水平居中
                    marginTop: "50px",
                    width: "200px",
                    // objectFit: "contain"
                }}
            />
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    minWidth: 400,
                    maxWidth: 600,
                    // margin: '0 auto', // 水平居中
                    marginLeft: "28%",
                    marginTop: '40px'
                }}
                initialValues={{
                    remember: true,
                }}
                // onFinish={handleSubmit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div onClick={handleSubmit}>
                            <Button type="primary" htmlType="submit"
                                style={{
                                    marginLeft: '0px',
                                    marginRight: '20px'
                                }}>
                                Log in
                            </Button>
                        </div>
                        <div onClick={handleSubmit}>
                            <Button type="primary" htmlType="submit"
                                style={{
                                    marginLeft: '20px',
                                    marginRight: '0px'
                                }}>
                                Sign up
                            </Button>
                        </div>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            style={{
                                marginLeft: '40px'
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}

export default LoginForm
