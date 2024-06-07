import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {TableParams} from "../TableComponent";
import {TableElement} from "./table/TableElement";
import styles from './tableBodyComponent.module.scss'
import {StudentsDataToDisplay} from "../../../../utils/const";
import MobileTableComponent from "./mobile/MobileTableComponent";
import TableHeaderComponent from "../header/TableHeaderComponent";
import {PageInterface} from "../../../../interfaces/table/PageInterface";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import SetStudentDataProps from "../../../../pages/main/SetStudentDataInterface";

interface InputProps extends SetStudentDataProps{
    tableParams: TableParams,
    setTableParams: Dispatch<SetStateAction<TableParams>>,
}

const TableBodyComponent = ({tableParams, setTableParams, data, setData}: InputProps) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return <>
        <MobileTableComponent data={data}/>
        <div className={styles.desktop_table}>
            <TableHeaderComponent usersList={data.data} isLoading={isLoading} selectedRowKeys={selectedRowKeys} setIsLoading={setIsLoading}/>
            <TableElement
                data={data}
                setData={setData}
                rowSelection={rowSelection}
                tableParams={tableParams}
                setTableParams={setTableParams}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </div>
    </>;
}

export default TableBodyComponent