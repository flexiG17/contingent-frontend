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
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";

interface InputProps{
    tableParams: TableParams,
    setTableParams: Dispatch<SetStateAction<TableParams>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
}

const TableBodyComponent = ({tableParams, setTableParams, isLoading, setIsLoading}: InputProps) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const studentListState = useSelector((state: RootState) => state.studentList)

    return <>
        <MobileTableComponent data={studentListState}/>
        <div className={styles.desktop_table}>
            <TableHeaderComponent usersList={studentListState} isLoading={isLoading} selectedRowKeys={selectedRowKeys} setIsLoading={setIsLoading}/>
            <TableElement
                rowSelection={rowSelection}
                tableParams={tableParams}
                setTableParams={setTableParams}
                isLoading={isLoading}
            />
        </div>
    </>;
}

export default TableBodyComponent