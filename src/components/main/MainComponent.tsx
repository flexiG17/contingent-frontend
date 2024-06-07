import React, {useState} from "react";
import ActionComponent from "./actions/ActionComponent";
import TableComponent from "./table/TableComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {PageInterface} from "../../interfaces/table/PageInterface";
import {StudentInterface} from "../../interfaces/student/StudentInterface";
import {Page} from "../../interfaces/table/Page";
import {initialStudentState} from "../../features/student/studentSlice";

const MainComponent = () => {
    const [data, setData] =
        useState<PageInterface<StudentInterface>>(
            new Page(
                Array(initialStudentState), {
                    page: 0,
                    take: 0,
                    itemCount: 0,
                    pageCount: 0,
                    hasPreviousPage: false,
                    hasNextPage: false,
                }))

    return <>
        <ActionComponent data={data} setData={setData}/>
        <TableComponent data={data} setData={setData}/>
    </>
}

export default MainComponent