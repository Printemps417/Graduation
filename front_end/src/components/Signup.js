import { useState } from "react"
import { Form, Input, Button, Select, Modal } from "antd"
import axios from "axios"

const { Option } = Select

const Signup = () => {
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onFinish = (username, password) => {
        // 成功提交后执行
        console.log('注册用户信息' + username, password)
        setIsModalVisible(true)
        axios.post(`http://localhost:8088/signup_userinfo?account=${username}&password=${password}`)
        // 当用户提交时modal框可见
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleUsernameChange = (event) => {
        // 处理用户名设置事件
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        // 处理密码设置事件
        setPassword(event.target.value)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <img src="/logo192.png" style={{ width: "150px", margin: "50px auto" }} />
            <Form
                form={form}
                name="register-form"
                onFinish={() => onFinish(username, password)}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: "400px", width: "100%" }}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: "请输入用户名" }]}
                >
                    <Input onChange={e => setUsername(e.target.value)} />
                    {/* 绑定事件，存储账号 */}
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: "请输入密码" }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    rules={[
                        { required: true, message: "请再次输入密码" },
                        ({ getFieldValue }) => ({
                            validator (_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error("两次输入的密码不一致"))
                            },
                        }),
                    ]}
                >
                    <Input.Password onChange={e => setPassword(e.target.value)} />
                    {/* 存储密码 */}
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[{ required: true, message: "请输入手机号" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[{ required: true, message: "请输入邮箱" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="occupation"
                    label="职业"
                    rules={[{ required: true, message: "请选择职业" }]}
                >
                    <Select>
                        <Option value="engineer">工程师</Option>
                        <Option value="teacher">教师</Option>
                        <Option value="student">学生</Option>
                        <Option value="student">其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="purpose"
                    label="注册用途"
                    rules={[{ required: true, message: "请输入注册用途" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确认注册
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="提示"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>注册信息提交成功，请等待管理员确认</p>
            </Modal>
        </div>

    )
}

export default Signup
