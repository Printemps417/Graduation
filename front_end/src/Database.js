import { Breadcrumb } from "antd"
import { useSearchParams } from "react-router-dom"

const Database = () => {
    let [params] = useSearchParams()
    let database = params.get('database')

    // console.log(database)
    // console.log('进入database')
    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                    marginLeft: '4%'
                }}
            >
                <Breadcrumb.Item>Data</Breadcrumb.Item>
                <Breadcrumb.Item>User</Breadcrumb.Item>
            </Breadcrumb>
            <h1>This is database{database}</h1>
        </>
    )
}
export default Database