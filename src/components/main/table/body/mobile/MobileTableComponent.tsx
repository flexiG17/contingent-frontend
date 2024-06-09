import React, {ReactNode, useState} from "react";
import styles from './mobileTableComponent.module.scss'
import {TableColumnsInterface} from "../../interfaces/TableColumnsInterface";
import {GetTableColumns} from "../table/getTableColumns";
import {Checkbox, ConfigProvider} from "antd";
import variables from "../../../../../shared/theme/_variables.module.scss";
import {StudentInterface} from "../../../../../interfaces/student/StudentInterface";
import {PageInterface} from "../../../../../interfaces/table/PageInterface";
import MobileRowComponent from "./MobileRow/MobileRowComponent";

const MobileTableComponent = ({data}: { data: StudentInterface[] }) => {
    return <div className={styles.mobile_table}>
        {data.map((student) => {
            return <MobileRowComponent key={student.id} student={student}/>
        })}
    </div>
}

export default MobileTableComponent