import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { BrowserRouter, Routes, Route, Link, Switch, Navigate } from 'react-router-dom'
import Data from './components/Data'
import Introduction from './components/Introduction'
import Sample from './components/Sample_data'
import Visualization from './components/Visualization'
import React from 'react'
import Database from './components/Database'
import Adddb from './components/Adddb'
import Signup from './components/Signup'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoginForm from './components/LoginForm'
import { setToken, getToken, removeToken, setTab, getTab, removeTab } from './tools'
const { Header, Content, Footer, Sider } = Layout

export const DatabaseContext = React.createContext()
const menu = ['image', '数据集导入与处理', 'GPS数据可视化', '平台使用文档', '样例数据下载', '讨论区', '关于作者']
let array = ['image', 'Data', 'Visualization', 'Introduction', 'Sample Data', 'Disscussion', 'Aboutme']
const items1 = array.map((key, index) => (
  index == 0 ?
    {
      key,
      label:
        <Link
          style={{
            margin: 0
          }}
          title="返回登录界面"
          to="/login">
          <img
            src="/logo192.png"
            style={{
              margin: 0,
              marginTop: "15px",
              justifySelf: "center",
              alignSelf: 'center',
              marginRight: "20px",
              marginLeft: "20px",
              width: "20px",
              // objectFit: "contain"
            }}
            onClick={() => {
              setTab(array[index])
            }}
          />
        </Link>
    } :
    {
      key,
      label:
        <Link
          style={{
            margin: 0
          }}
          onClick={() => {
            console.log(`${key}被点击了`)
            setTab(array[index])
          }}
          to={`/${key}`}
        >
          <p style={{
            margin: 0,
            marginRight: "20px",
            marginLeft: "20px",
            color: "ffe",
            fontSize: '18px'
            // width: "100px",
            // fontWeight: "bold"
          }}>
            {menu[index]}
          </p>
        </Link>
    }))
// 用于模块间传输数据

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [useritem, setUseritem] = useState([])
  const [dbname, setDbname] = useState([])
  const username = getToken()
  // useState必须在顶层使用
  useEffect(() => {
    async function fetchData () {
      try {
        console.log('该用户的用户名为：' + username)
        let user = (username == 'admin') ? 'getdbname' : `userdata_db?username=${username}`
        const response = await axios.get(`http://localhost:8088/${user}`)
        // 根据用户不同返回不同数据库列表，管理员账号可控制查看所有数据库,普通用户调用接口不同
        const dbNames = response.data
        const icons = Array.from({ length: dbNames.length }).fill(UserOutlined)
        // 图标长度和数据库列表长度相同
        setUseritem(icons)
        setDbname(dbNames)
      } catch (error) {
        console.error(error)
        setUseritem([UserOutlined])
        setDbname(["error request"])
      }
    }
    fetchData()
  }, [])
  // []代表useeffect在首次渲染时才会执行
  // 用来检验用户token是否合法，若不合法强制登录

  return (
    <DatabaseContext.Provider value={{ useritem, setUseritem, dbname, setDbname }}>
      {/* Provider要包裹上层组件 */}
      <BrowserRouter>
        <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }}>
          <Header className="header">
            <Menu theme="dark"
              mode="horizontal"
              style={{
                margin: 0,
                // height: "30px"
                backgroundColor: "deepgray"
              }}
              defaultSelectedKeys={[getTab()]}
              items={items1}
              onClick={() => {
                console.log()
              }}
            />
          </Header>
        </div>
        <Routes>
          {/* 一级路由组件渲染位置 */}
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Data" element={<Data />}>
            <Route path="/Data/" element={<Adddb />}></Route>
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
    </DatabaseContext.Provider>
  )
}
export default App