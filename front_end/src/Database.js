import { Breadcrumb } from "antd"
import { useSearchParams } from "react-router-dom"
import { useContext } from 'react'
import { DatabaseContext } from './App'
import { Collapse } from 'antd'
const { Panel } = Collapse
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
const Database = () => {
    const { useritem, setUseritem, dbname, setDbname } = useContext(DatabaseContext)
    let [params] = useSearchParams()
    let database = params.get('database')
    let tablename = ['1', '2', '3']
    const panels = tablename.map((item, index) => {
        <Panel header={`车辆编号：${tablename[index]}`} key={index + 1}>
            <p>{text}</p>
        </Panel>
    })
    const onChange = (key) => {
        console.log(key)
    }
    // console.log(database)
    // console.log('进入database')
    return (
        <>
            <h1>This is database:{database}</h1>
            <Collapse accordion>
                {panels}
            </Collapse>
        </>
    )
}
export default Database