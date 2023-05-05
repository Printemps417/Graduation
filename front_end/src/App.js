import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Data from './Data'
import Introduction from './Introduction'
import Sample from './Sample_data'
import Visualization from './Visualization'
import React from 'react'
const { Header, Content, Footer, Sider } = Layout
const items1 = ['Data', 'Visualization', 'Introduction', 'Sample Data'].map((key) => ({
  key,
  label:

    <Link
      style={{
        margin: 0
      }}
      onClick={() => {
        console.log(`${key}被点击了`)
      }}
      to={`/${key}`}
    >
      {key}
    </Link>
}))

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout>
      <BrowserRouter>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
            onClick={() => {
              console.log()
            }}
          />
        </Header>
        <Routes>
          {/* 一级路由组件渲染位置 */}
          <Route path="/" element={<Data />}></Route>
          <Route path="/Data" element={<Data />}></Route>
          <Route path="/Introduction" element={<Introduction />}></Route>
          <Route path="/Visualization" element={<Visualization />}></Route>
          <Route path="/Sample data" element={<Sample />}></Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}
export default App