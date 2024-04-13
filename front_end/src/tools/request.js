import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { message } from 'antd'
import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken, ReloadToken, removeToken } from '../Tools/token'
import config from '../Config/config'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const request = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: config.baseUrl, // 此处的 /api/ 地址，原因是nginx反向代理的基础路径为 /api/
    // 超时
    timeout: 30000,
    // 禁用 Cookie 等信息
    withCredentials: false,
    headers: {
        Authorization: 'Bearer:' + getAccessToken()
    }
})

// request拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        if (!getAccessToken()) {
            // 如果没有accessToken，判断是否有refreshToken
            handleAuthorized()
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        console.log(response)
        const code = response.status || 200
        console.log("返回状态：" + code)
        // message.info(msg)
        if (code === 401) {
            // 未授权，跳转到登录页
            handleAuthorized()
        }

        return response
    },
    error => {
        // 检查错误状态码
        console.log("返回状态错误:")
        console.log(error.response.status)
        if (error.response && error.response.status == 401) {
            handleAuthorized()
        }
        return Promise.reject(error)
    }
)

const handleAuthorized = () => {
    if (getRefreshToken()) {
        // 如果有refreshToken且无accesstoken，则刷新token
        ReloadToken()
            .then(() => {
                // Reload后刷新页面
                console.log("ACCESS_TOKEN已过期，REFRESH_TOKEN为：", getRefreshToken())
                window.location.reload()
            })
            .catch(e => {
                console.log("刷新token失败！RefreshToken有误！")
                console.log(e)
                handleInvalid()
            })
    } else {
        handleInvalid()
    }
}
const handleInvalid = () => {
    console.log('refresh_token错误！')
    message.error('会话已过期，请重新登录')
    removeToken()
    // 跳转到登录页
    if (window.location.pathname != '/login') {
        window.location.href = '/login'
    }
}

export default request