import { useSearchParams } from "react-router-dom"

const Database = () => {
    let [params] = useSearchParams()
    let database = params.get('database')
    console.log(database)
    // console.log('进入database')
    return (
        <h1>This is database{database}</h1>
    )
}
export default Database