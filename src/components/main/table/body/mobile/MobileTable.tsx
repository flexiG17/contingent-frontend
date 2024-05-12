import React, {ReactNode, useState} from "react";
import styles from './mobileTableComponent.module.scss'
import {TableColumnsInterface} from "../../interfaces/tableColumnsInterface";
import {GetTableColumns} from "../table/getTableColumns";
import {Checkbox, ConfigProvider} from "antd";
import variables from "../../../../../shared/theme/_variables.module.scss";

const MobileTable = ({student}: { student: TableColumnsInterface }) => {
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
                return <div className={styles.data}>
                    <h3>{column.title as ReactNode}</h3>
                    <p className={styles.data_text}>
                        {/*// @ts-ignore*/}
                        {student[column.key]}
                    </p>
                </div>
            })}
        </div>
        <div className={styles.fields}>
            {[...columns].splice(5, 6).map((column) => {
                return <div className={styles.data}>
                    <h3>{column.title as ReactNode}</h3>
                    <p className={styles.data_text}>
                        {/*// @ts-ignore*/}
                        {student[column.key]}
                    </p>
                </div>
            })}
        </div>
    </section>
}

export default MobileTable