import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {TableParams} from "../TableComponent";
import {TableElement} from "./table/TableElement";
import styles from './tableBodyComponent.module.scss'
import {StudentsDataToDisplay} from "../../../../utils/const";
import MobileTable from "./mobile/MobileTable";
import TableHeaderComponent from "../header/TableHeaderComponent";

interface InputProps {
    tableParams: TableParams,
    setTableParams: Dispatch<SetStateAction<TableParams>>,

    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>,
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
        <div className={styles.mobile_table}>
            {/*<TableHeaderComponent selectedRowKeys={rowSelection.selectedRowKeys!}/>*/}
            {StudentsDataToDisplay.map((student) => {
                return <MobileTable student={student}/>
            })}
        </div>
        <div className={styles.desktop_table}>
            <TableHeaderComponent usersList={data} isLoading={isLoading} selectedRowKeys={selectedRowKeys} setIsLoading={setIsLoading}/>
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