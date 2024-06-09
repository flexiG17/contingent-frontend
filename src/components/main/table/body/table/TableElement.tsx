import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ConfigProvider, notification, Table, TableProps} from "antd";
import {GetTableColumns} from "./getTableColumns";
import {StudentsDataToDisplay} from "../../../../../utils/const";
import {TableColumnsInterface} from "../../interfaces/TableColumnsInterface";
import {TableRowSelection} from "antd/es/table/interface";
import {TableParams} from "../../TableComponent";
import variables from "../../../../../shared/theme/_variables.module.scss";
import {getStudents} from "../../../../../actions/student";
import {Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PathsEnum} from "../../../../../router/pathsEnum";
import {PageInterface} from "../../../../../interfaces/table/PageInterface";
import {StudentInterface} from "../../../../../interfaces/student/StudentInterface";
import SetStudentDataProps from "../../../../../pages/main/SetStudentDataInterface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {setStudentList} from "../../../../../features/studentList/studentSlice";

interface InputProps {
    rowSelection: TableRowSelection<StudentInterface>,

    tableParams: TableParams,
    setTableParams: Dispatch<SetStateAction<TableParams>>,
    isLoading: boolean,
}
export const TableElement = ({rowSelection, tableParams, setTableParams, isLoading }: InputProps) => {
    const navigate = useNavigate()
    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            //setData([]);
        }
    }

    const studentListState = useSelector((state: RootState) => state.studentList)

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: variables.primaryColor,
                    colorLink: variables.primaryColor,
                    colorLinkActive: variables.primaryColorHover,
                },
                components: {
                    Table: {
                        borderColor: '#E0E0E0',
                        headerBg: 'rgb(0,0,0,0)',
                        rowSelectedHoverBg: variables.backgroundColorHover,
                        cellPaddingBlock: 10,
                        cellPaddingInline: 14
                    }
                }}
            }
        >
            <Table
                dataSource={studentListState}
                rowSelection={rowSelection}
                columns={GetTableColumns()}
                rowKey={(record) => record.id}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
                style={{width: 'auto'}}
                loading={isLoading}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            navigate(`${PathsEnum.STUDENT_CARD}/${record.id}`)
                        },
                    };
                }}
            />
        </ConfigProvider>
    )
}