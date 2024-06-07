import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import styles from './tableComponent.module.scss'
import TableBodyComponent from "./body/TableBodyComponent";
import {GetProp, TableProps} from "antd";
import {StudentsDataToDisplay} from "../../../utils/const";
import {PageInterface} from "../../../interfaces/table/PageInterface";
import {StudentInterface} from "../../../interfaces/student/StudentInterface";
import SetStudentDataProps from "../../../pages/main/SetStudentDataInterface";

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const TableComponent = ({data, setData} : SetStudentDataProps) => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
            // pageSizeOptions: ['5', '10', '25', '50', '100', data.length.toString()]
            pageSizeOptions: ['5', '10', '25', '50', '100']
        },
    });
    const fetchData = () => {
        setTableParams({
            ...tableParams,
            pagination: {
                pageSize: data.meta.take,
                total: data.meta.pageCount,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
            },
        });
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    return (
        <section className={styles.block}>
            <TableBodyComponent
                data={data}
                setData={setData}
                tableParams={tableParams}
                setTableParams={setTableParams}/>
        </section>
    )
}

export default TableComponent