import { Image } from 'antd'
import IImage from './Image.js'
import { useState } from 'react'
import Sample_data from './Sample_data.js'
import '../styles/Introduction.module.css'
const contentStyle = {
    height: '560px',
    width: '960px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    margin: '0px auto',
}
const Introduction = () => {
    let count = 1
    return (
        <div style={{ margin: "5%" }}>
            <h1>1 用户账户信息认证</h1>

            <h3>1.1 用户注册</h3>
            <p>
                在清理浏览器缓存和cookie后，点击页面左上角的图标，进入登录界面。点击"Sign up"按钮，网页跳转至注册界面。正确填写信息并提交后，信息会送至管理员审核。
            </p>
            <div><IImage index={count++}></IImage>
                <IImage index={count++}></IImage>
                <IImage index={count++}></IImage></div>

            <h3>1.2 用户登录</h3>
            <p>
                用户登录时，会根据其输入的用户名与密码向后端数据库查询，若不匹配则登录失败。在未登录的状态下点击"数据集导入与处理"等组件，页面会查询不到用户信息，可操作数据库列表为空。
            </p>
            <IImage index={count++}></IImage>
            <p>

                此时若点击GPS数据可视化界面，后端会返回错误，因为可视化部件的加载需要根据用户的token进行用户数据查询，而未登录状态下该token值为none，查询失败。

                在未登录状态下，用户可以访问的界面只有平台使用文档。
            </p>
            <IImage index={count++}></IImage><IImage index={count++}></IImage>
            <div><IImage index={count++} height={100} style={{ height: '100px' }}></IImage></div>
            <h1>2.1 用户数据库导入、展示、去重与删除</h1>
            {count++}
            <p>在初始状态下，用户数据库内没有可操作项，用户需要点击右侧区域或拖拽文件的方式，将存有GPS数据csv文件上传至服务器，并点击“提交数据”将数据保存至数据库。</p>
            <IImage index={count++}></IImage><IImage index={count++}></IImage>
            <p>在数据导入的过程中，用户可以根据下方的“后端信息”板块查看自己上传数据的处理情况。下图中左图为数据上传中的状态，右图为上传成功正在导入的状态。</p>
            <IImage index={count++}></IImage>
            <p>在数据导入过程中，由于网页异步上传功能的实现和后端使用线程池，用户可以任意操作页面，包括切换板块、刷新网页等，均不会终端数据的上传。与此同时，用户也可以查看正在上传的数据，而不用等待数据完全上传完成。</p>
            <p>用户数据全部导入数据库成功后，网页将弹窗显示“数据导入成功”。此时可对上传的数据库进行去重、删除等操作。用户可点击界面右侧的“数据去重”，对当前数据库内的数据基于实现序列进行去重操作。去重前后数据对比如所示。</p>
            <IImage index={count++}></IImage><IImage index={count++}></IImage>
            <p>用户可以点击右上角红色“删除数据库”按钮，将当前数据库删除。数据库被删除后，无法查看其内部数据，再次刷新数据库后当前库名从列表中被删除。</p>
            <IImage index={count++}></IImage>
            <h1>2.2 用户数据规格化、批量选择与导出</h1>
            <p>在执行完上述的数据处理后，用户可根据编号选择导出的数据。用户点击编号列表右侧的按钮，可实现待导出区与数据库区的切换，其中右侧为待导出数据区。</p>
            <p>平台也支持用户批量选择待导出数据，可通过点击上方的“批量选择”按钮实现。</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IImage index={count++}></IImage></div>
            <p>在点击后，页面将弹出批量选择框，用户在框内可进行选择全部数据、奇数行数据、偶数行数据等操作。如图所示，用户选择了当前页全部数据。</p>
            <p>在选择数据完成后，点击右上角的“下载数据”按钮，即可按顺序下载当前选中的所有数据。下载的数据按照车辆编号选择顺序排列，内部数据均为处理后的规范化数据。</p>
            <h3>导出数据一览：</h3>
            <table>
                <tr>
                    <th>id</th>
                    <th>time</th>
                    <th>Lon</th>
                    <th>Lat</th>
                    <th>speed</th>
                </tr>
                <tr>
                    <td>10005</td>
                    <td>2015/4/3 3:06:50</td>
                    <td>121.42094</td>
                    <td>31.27767</td>
                    <td>16</td>
                </tr>
                <tr>
                    <td>10005</td>
                    <td>2015/4/3 3:07:02</td>
                    <td>121.42105</td>
                    <td>31.278627</td>
                    <td>17</td>
                </tr>
                <tr>
                    <td>10005</td>
                    <td>2015/4/3 3:08:30</td>
                    <td>121.421083</td>
                    <td>31.279023</td>
                    <td>12.8</td>
                </tr>
                <tr>
                    <td>10005</td>
                    <td>2015/4/3 3:09:01</td>
                    <td>121.421085</td>
                    <td>31.279107</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>10005</td>
                    <td>2015/4/3 3:09:10</td>
                    <td>121.442795</td>
                    <td>31.269307</td>
                    <td>43</td>
                </tr>
                <tr>
                    <td>10005</td>
                    <td>2015/4/3 3:09:30</td>
                    <td>121.444745</td>
                    <td>31.270545</td>
                    <td>29.9</td>
                </tr>
            </table>
            {count++}
            <h1>3 GPS数据可视化</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IImage index={count++} height={500}></IImage>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>图示：底图加载默认情况</p></div>

            <h3>3.1 地图底层功能展示</h3>
            <p>在用户首次进入“GPS数据可视化”界面时，地图初始化中心点为[110.417463, 33.215175]，缩放等级4。用户可以通过拖拽、鼠标滚轮等方式改变视图，也可以通过地图侧边提供的控件修改地图。除了比例尺、中心位置外，平台还支持通过右上角的“Theme”组件修改地图主题，以满足用户多样化需求。</p>
            <IImage index={count++}></IImage><IImage index={count++}></IImage>
            <h3>3.2 图层类型展示</h3>
            <p>新建用户账号内有八种示例图层，以便用户了解平台可视化功能与对应规范数据格式。</p>
            <Sample_data />
            <h3>3.3 添加、删除图层功能演示</h3>
            <p>以中下载的规格化数据为例，演示添加与删除图层的操作。</p>
            <IImage index={count++}></IImage>
            <p>如图所示，用户从浏览器下载数据中选择在2.2 用户数据规格化、批量选择与导出一节中下载得到的数据绘制散点图，并输入图层的名称、类型、颜色、大小与描述后，即可对应图层的信息添加至图层管理列表。</p>
            <h3>3.4 图层操作更改图层位置与可见度</h3>
            <p>在成功加载用户图层后，系统还支持对已上传图层进行可见度、绘制优先级的设置。其中在控制列表中，图层位置越向下，说明图层绘制的时间越晚。</p>
            <p>在图层控制列表中，用户可以通过点击左侧的眼睛图标控制图层的可见度。点击眼睛图标即可切换图层的显示与隐藏状态。用户可以通过拖拽图层的位置来更改图层的绘制优先级。</p>
            <IImage index={count++}></IImage><IImage index={count++}></IImage>
            <div><IImage index={count++}></IImage><IImage index={count++}></IImage></div>

        </div >
    )
}

export default Introduction