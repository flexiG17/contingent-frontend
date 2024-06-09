import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import styles from './tableComponent.module.scss'
import TableBodyComponent from "./body/TableBodyComponent";
import {GetProp, TableProps} from "antd";
import {StudentsDataToDisplay} from "../../../utils/const";
import {PageInterface} from "../../../interfaces/table/PageInterface";
import {StudentInterface} from "../../../interfaces/student/StudentInterface";
import SetStudentDataProps from "../../../pages/main/SetStudentDataInterface";
import {getStudents} from "../../../actions/student";
import {setStudentList} from "../../../features/studentList/studentSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const TableComponent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 50,
            // pageSizeOptions: ['5', '10', '25', '50', '100', data.length.toString()]
            pageSizeOptions: ['1', '2', '3', '5', '100']
        },
    });
    const studentListState = useSelector((state: RootState) => state.studentList)
    const dispatch = useDispatch()
    const fetchData = () => {
        getStudents(tableParams.pagination!.current!, tableParams.pagination!.pageSize!)
            .then((data) => {
                setIsLoading(false)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        current: data.meta.page,
                        pageSize: data.meta.take,
                        total: data.meta.itemCount
                    }
                })
                dispatch(setStudentList(data.data))
            })
            .catch(() => setIsLoading(false))
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    return (
        <section className={styles.block}>
            <TableBodyComponent
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                tableParams={tableParams}
                setTableParams={setTableParams}/>
        </section>
    )
}

export default TableComponent