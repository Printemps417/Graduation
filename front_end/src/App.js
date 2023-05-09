import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { BrowserRouter, Routes, Route, Link, Switch } from 'react-router-dom'
import Data from './Data'
import Introduction from './Introduction'
import Sample from './Sample_data'
import Visualization from './Visualization'
import React from 'react'
import Database from './Database'
import Adddb from './Adddb'
import { useState } from 'react'
const { Header, Content, Footer, Sider } = Layout

export const DatabaseContext = React.createContext()
// 用于传输数据
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
      <p style={{
        margin: 0,
        color: "#fff",
        // fontWeight: "bold"
      }}>
        {key}
      </p>
    </Link>
}))

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [useritem, setUseritem] = useState([])
  const [dbname, setDbname] = useState([])
  return (
    <DatabaseContext.Provider value={{ useritem, setUseritem, dbname, setDbname }}>
      {/* Provider要包裹上层组件 */}
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
            <Route path="/Data" element={<Data />}>
              <Route path="/Data/" element={<Database />}></Route>
              <Route path="/Data/adddb" element={<Adddb />}></Route>
              <Route path="/Data/database" element={<Database />}></Route>
            </Route>
            <Route path="/Introduction" element={<Introduction />}></Route>
            <Route path="/Visualization" element={<Visualization />}></Route>
            <Route path="/Sample data" element={<Sample />}></Route>
          </Routes>
        </BrowserRouter>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Graduation Design ©2023 Created by Lee
        </Footer>
      </Layout>
    </DatabaseContext.Provider>
  )
}
export default App