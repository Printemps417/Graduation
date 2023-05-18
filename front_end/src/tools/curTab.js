// 封装token存取操作

const key = 'Tab'

const setTab = (token) => {
    return window.localStorage.setItem(key, token)
}

const getTab = () => {
    return window.localStorage.getItem(key)
}

const removeTab = () => {
    return window.localStorage.remove(key)
}

export {
    setTab,
    getTab,
    removeTab
}