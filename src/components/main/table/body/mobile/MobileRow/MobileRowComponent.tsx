import React, {ReactNode} from "react";
import styles from './mobileRow.module.scss'
import {GetTableColumns} from "../../table/getTableColumns";
import {Checkbox, ConfigProvider} from "antd";
import variables from "../../../../../../shared/theme/_variables.module.scss";
import {StudentInterface} from "../../../../../../interfaces/student/StudentInterface";

const GetStudentFieldByIndexArray = (student: StudentInterface, indexArray: string[]) => {
    let field = {...student}
    indexArray.map((index) => {
        if (index === 'created_at') {
            // @ts-ignore
            field = new Date(field[index]).toLocaleDateString()
        }
        else
            // @ts-ignore
            field = field[index]
    })

    return field
}

const MobileRowComponent = ({student}: { student: StudentInterface }) => {
    const columns = GetTableColumns();
    let counter = 0;

    return <section className={styles.block}>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: variables.primaryColor,
                }
            }}
        >
            <Checkbox
                className={styles.checkbox}/>
        </ConfigProvider>
        <div className={styles.fields}>
            {[...columns].splice(0, 6).map((column) => {
                if (counter >= 6)
                    return ''
                counter += 1;
                return <div id={student.id.toString()} className={styles.data}>
                    <h3>{column.title as ReactNode}</h3>
                    <p className={styles.data_text}>
                        {/*@ts-ignore*/}
                        {GetStudentFieldByIndexArray(student, column.dataIndex)}
                    </p>
                </div>
            })}
        </div>
        <div className={styles.fields}>
            {[...columns].splice(5, 6).map((column) => {
                return <div id={student.id.toString()} className={styles.data}>
                    <h3>{column.title as ReactNode}</h3>
                    <p className={styles.data_text}>
                        {/*@ts-ignore*/}
                        {GetStudentFieldByIndexArray(student, column.dataIndex)}
                    </p>
                </div>
            })}
        </div>
    </section>
}

export default MobileRowComponent