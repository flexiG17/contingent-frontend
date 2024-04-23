import {createSlice} from "@reduxjs/toolkit";
import {GetProp, TableProps} from "antd";

const tableSlice = createSlice({
    name: 'table',
    initialState: {
        tableParams: {
            pagination: '',
            sortField: '',
            sortOrder: '',
            filters: ''
        },
        searchText: '',
        searchedColumn: '',
        hasSelected: false,
        selectedRowKeys: [],
        rowSelection: {
            selectedRowKeys: '',
            onChange: () => null,
        }
    },
    reducers: {
        setTableChange: (state, action) => {
            state.tableParams = action.payload
        },
        setSelectedRows: (state, action) => {
            state.rowSelection = action.payload
        }
    },
})

export const { setTableChange } = tableSlice.actions
export default tableSlice.reducer