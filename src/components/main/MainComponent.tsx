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

    return <>
        <ActionComponent/>
        <TableComponent/>
    </>
}

export default MainComponent