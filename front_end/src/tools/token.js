// 封装token存取操作

const key = 'account'

const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}

const getToken = () => {
    return window.localStorage.getItem(key)
}

const removeToken = () => {
    return window.localStorage.remove(key)
}

export {
    setToken,
    getToken,
    removeToken
}