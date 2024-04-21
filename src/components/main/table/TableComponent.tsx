import React from 'react'
import styles from './tableComponent.module.scss'
import TableHeaderComponent from "./header/TableHeaderComponent";
import TablePaginationComponent from "./pagination/TablePaginationComponent";
import TableBodyComponent from "./body/TableBodyComponent";

const TableComponent = () => {
    return (
        <section className={styles.grid}>
            <TableHeaderComponent/>
            <TableBodyComponent/>
            <TablePaginationComponent/>
        </section>
    )
}

export default TableComponent