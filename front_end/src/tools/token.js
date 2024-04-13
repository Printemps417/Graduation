// 封装token存取操作
import axios from 'axios'
import config from '../Config/config'
const accesskey = 'ACCESS_TOKEN'
const refreshkey = 'REFRESH_TOKEN'
const setAccessToken = (token) => {
    return window.localStorage.setItem(accesskey, token)
}

const getAccessToken = () => {
    return window.localStorage.getItem(accesskey)
}
const setRefreshToken = (token) => {
    return window.localStorage.setItem(refreshkey, token)
}

const getRefreshToken = () => {
    return window.localStorage.getItem(refreshkey)
}

const ReloadToken = () => {
    const headers = {
        REFRESHTOKEN: 'Bearer ' + getRefreshToken()
    }
    return axios.get(config.baseUrl + "/users/reloadtoken", { headers })
        .then(res => {
            console.log(res.data.data)
            setAccessToken(res.data.data.accessToken)
            setRefreshToken(res.data.data.refreshToken)
            console.log("刷新token成功！")
        })
}


const removeToken = () => {
    window.localStorage.removeItem(accesskey)
    window.localStorage.removeItem(refreshkey)
}

export {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeToken,
    ReloadToken
}