import { Breadcrumb } from "antd"
import { useSearchParams } from "react-router-dom"
import { useContext } from 'react'
import { DatabaseContext } from './App'


const Database = () => {
    const { useritem, setUseritem, dbname, setDbname } = useContext(DatabaseContext)
    let [params] = useSearchParams()
    let database = params.get('database')

    // console.log(database)
    // console.log('进入database')
    return (
        <>
            <h1>This is database:{database}</h1>
        </>
    )
}
export default Database