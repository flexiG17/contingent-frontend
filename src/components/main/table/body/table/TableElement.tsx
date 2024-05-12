import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ConfigProvider, notification, Table, TableProps} from "antd";
import {GetTableColumns} from "./getTableColumns";
import {StudentsDataToDisplay} from "../../../../../utils/const";
import {TableColumnsInterface} from "../../interfaces/tableColumnsInterface";
import {TableRowSelection} from "antd/es/table/interface";
import {TableParams} from "../../TableComponent";
import variables from "../../../../../shared/theme/_variables.module.scss";
import {getStudents} from "../../../../../actions/student";
import {Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PathsEnum} from "../../../../../router/pathsEnum";

interface InputProps {
    rowSelection: TableRowSelection<TableColumnsInterface>,

    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>,

    tableParams: TableParams,
    setTableParams: Dispatch<SetStateAction<TableParams>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}
export const TableElement = ({rowSelection, tableParams, setTableParams, isLoading, setIsLoading, data, setData}: InputProps) => {
    const navigate = useNavigate()
    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    }

    useEffect(() => {
        getStudents()
            .then((data) => {
                setIsLoading(false)
                // @ts-ignore
                data.reverse().map((field) => {
                    field.date_creation = new Date(field.date_creation).toLocaleDateString()
                })
                setData(data)
            })
            .catch(() => setIsLoading(false))
    }, [])

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
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                columns={GetTableColumns()}
                // @ts-ignore
                dataSource={data}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
                style={{width: 'auto'}}
                loading={isLoading}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            navigate(`${PathsEnum.STUDENT}/${record.id}`)
                        },
                    };
                }}
            />
        </ConfigProvider>
    )
}