// 先把所有工具函数导出的模块在这里导入，然后统一导出

import {
    setToken,
    getToken,
    removeToken
} from './token'

import {
    addClusterLayer,
    addHeatmapLayer,
    addHeatmapLayer2,
    addScatterLayer,
    addTextLayer,
    addBubbleLayer,
    addDynaTripLayer,
    addEqualLineLayer,
    addTripLayer,
} from './Layerfunc'

export {
    setToken,
    getToken,
    removeToken,
    addClusterLayer,
    addHeatmapLayer,
    addHeatmapLayer2,
    addScatterLayer,
    addTextLayer,
    addBubbleLayer,
    addDynaTripLayer,
    addEqualLineLayer,
    addTripLayer,
}