import { Table } from 'antd'
import { useState, useContext, useEffect } from 'react'
import { ExtractListContext } from './Database'
const SelectTable = ({ tablename }) => {
    // console.log(tablename)
    const { tablelist, setTablelist } = useContext(ExtractListContext)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const data = tablename.map((item, index) => {
        return ({
            key: index + 1,
            Name: item,
        })
    })
    const columns = [
        {
            title: '编号',
            dataIndex: 'Name',
        },
    ]

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
        const temp = newSelectedRowKeys.map((item) => tablename[item - 1])
        setTablelist(temp)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false
                        }
                        return true
                    })
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true
                        }
                        return false
                    })
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
        ],
    }
    return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
}
export default SelectTable