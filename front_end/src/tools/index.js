// 先把所有工具函数导出的模块在这里导入，然后统一导出

import {
    setToken,
    getToken,
    removeToken
} from './token'

import {
    addClusterLayer,
    addScatterLayer,
    addHeatmapLayer
} from './Layerfunc'

export {
    setToken,
    getToken,
    removeToken,
    addClusterLayer,
    addScatterLayer,
    addHeatmapLayer
}