import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // e.preventDefault()方法通常用于防止浏览器默认行为（比如提交表单或者打开链接）
        // 处理提交事件
        try {
            const response = await fetch(`./Account/${username}.json`)
            console.log(response)
            const data = await response.json()
            console.log(data)
            console.log('用户输入的用户名为' + username)
            console.log('用户输入的密码为' + data.password)
            if (data.password === password) {
                setRedirect(true)
            } else {
                setError(true)
                setPassword('')
            }
        } catch (e) {
            console.log(e)
            setError(true)
            setPassword('')
        }
    }

    if (redirect) {
        return <Navigate to="/Data" replace={true} />
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>Invalid username or password.</p>}
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Log in</button>
        </form>
    )
}

export default LoginForm
