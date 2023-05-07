import { PoweroffOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useState } from 'react'
import { useSearchParams } from "react-router-dom"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import useItems from 'antd/es/menu/hooks/useItems'
import styles from './Adddb.module.css'
import { DatabaseContext } from './Data'

const Adddb = () => {
    const [loadings, setLoadings] = useState([])
    const { useritem, setUseritem } = useContext(DatabaseContext)
    // console.log(useritem, setUseritem)
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings]
            newLoadings[index] = true
            return newLoadings
        })
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings]
                newLoadings[index] = false
                setUseritem([...useritem, UserOutlined])
                // 更改数据库列表
                return newLoadings
            })
        }, 500)
    }
    return (
        <>
            <h1>This is Adddb</h1>
            <div className={styles.container}>
                <Space direction="vertical">
                    <Space wrap>
                        <Button
                            type="primary"
                            icon={<PoweroffOutlined />}
                            loading={loadings[1]}
                            onClick={() => {
                                enterLoading(1)

                            }}
                        >
                            提交数据
                        </Button>
                    </Space>
                </Space>
            </div>
        </>
    )
}
export default Adddb