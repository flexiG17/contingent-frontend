import React, {useEffect, useState} from 'react'
import styles from './tableComponent.module.scss'
import TableHeaderComponent from "./header/TableHeaderComponent";
import TablePaginationComponent from "./pagination/TablePaginationComponent";
import TableBodyComponent from "./body/TableBodyComponent";
import {GetProp, TableProps} from "antd";

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const TableComponent = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 2,
        },
    });

    const fetchData = () => {
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: 2,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
            },
        });
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    return (
        <section className={styles.grid}>
            <TableHeaderComponent/>
            <TableBodyComponent tableParams={tableParams} setTableParams={setTableParams}/>
            <TablePaginationComponent/>
        </section>
    )
}

export default TableComponent