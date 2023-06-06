// 先把所有工具函数导出的模块在这里导入，然后统一导出

import {
    setToken,
    getToken,
    removeToken,
} from './token'

import {
    setTab,
    getTab,
    removeTab
} from './curTab'

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
    add3DLineLayer
} from './Layerfunc'

export {
    setToken,
    getToken,
    removeToken,
    setTab,
    getTab,
    removeTab,
    addClusterLayer,
    addHeatmapLayer,
    addHeatmapLayer2,
    addScatterLayer,
    addTextLayer,
    addBubbleLayer,
    addDynaTripLayer,
    addEqualLineLayer,
    addTripLayer,
    add3DLineLayer
}