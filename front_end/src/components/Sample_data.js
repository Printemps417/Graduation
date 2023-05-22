import { Space, Table, Tag } from 'antd'
const columns = [
    {
        title: '图层名称',
        dataIndex: 'name',
        key: 'name',
        width: '150px',
        align: 'center'
    },
    {
        title: '示例图片',
        dataIndex: 'img',
        key: 'img',
    },
    {
        title: '图层描绘',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '下载样例数据',
        dataIndex: 'action',
        key: 'action',
        width: '200px'
    },]
const name = ["散点图", "聚合点图", "气泡点图", "文本标注", "热力图", "网格热力图", "静态轨迹", "动态轨迹", "等高线"]
const description = [
    "根据Lon、Lat字段确定散点绘制位置，多个图形叠加会有高亮效果",
    "根据k-means算法，将每个数据都划分到临近中心点中，并在聚合点中心标记被划入数据的数量。当地图缩放时，聚合点也会汇聚或扩散",
    "根据Lon、Lat字段确定图层点的位置，根据value字段决定气泡的缩放大小。多个点叠加颜色会变深",
    "根据value字段确定文本内容，并由Lon和Lat字段确定文本位置",
    "根据数据点的汇聚程度绘制热力图，通过在地图上使用颜色渐变来表示密度或权重，以显示特定地区的数据集中程度",
    "先将地图区域进行基于geoHash的栅格化，再统计每一个栅格中的数据点数量，根据栅格内数据数量渲染栅格不同颜色",
    "由固定格式的json文件绘制，第一个字段包含车辆的id，第二个字段为时间序列上有序的经纬度对数组。可由规范化数据处理而来",
    "根据时间序列有序的经纬度对渲染车辆的动态轨迹，可根据不同车辆ID渲染不同颜色。对前端渲染压力较大",
    "根据数据value绘制等值线，需要数据以经纬度对的形式存储于json文件中"]
const url = [
    "/SampleData/ScatterSample.csv",
    "/SampleData/ScatterSample.csv",
    "/SampleData/BubbleSample.json",
    "/SampleData/TextSample.json",
    "/SampleData/HeatmapSample2.json",
    "/SampleData/HeatSample.csv",
    "/SampleData/TripDataSample.json",
    "/SampleData/DynamicTripSample.json",
    "/SampleData/EqualLineSample.json"]
const data = name.map((item, index) => {
    return ({
        key: index + 1,
        name: (<a
            href={url[index]}
            style={{ fontSize: '16px', fontWeight: 'bold', margin: '0px auto' }}>{item}</a>),
        img: (<img src={`\\Samplepic\\${index + 1}.jpg`}
            style={{ width: "400px" }} />),
        description: description[index],
        action: (<Space size="middle">
            <a href={url[index]}>下载{item}数据</a>
        </Space>)
    })
})

const Sample = () => {
    const tableStyle = {
        margin: '0 6%', // 在页面两端各空出10%的区域
    }

    const rowStyle = {
        borderBottom: '30px solid black', // 表行之间的黑色分割线
    }
    return (
        <div style={{
            margin: '8% 0',
            marginTop: '0px'
        }}>
            <Table
                columns={columns}
                dataSource={data}
                style={tableStyle}
                rowStyle={rowStyle}
            />
        </div>
    )
}
export default Sample