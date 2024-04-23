import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import type {GetProp, InputRef, TableColumnsType, TableColumnType, TableProps} from 'antd';
import {Button, Input, Space, Table} from 'antd';
import type {FilterDropdownProps} from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import styles from './tableBodyComponent.module.scss'
import {TableParams} from "../TableComponent";
import {DataIndex, GetTableColumns} from "./getTableColumns";
import {TableColumnsInterface} from "../interfaces/tableColumnsInterface";

const data: TableColumnsInterface[] = [
    {
        key: '1',
        date_creation: new Date().toLocaleDateString(),
        education_type: "Квота",
        educational_program: '1008 (1 год)',
        latin_name: 'John Brown',
        russian_name: 'Джон Браун',
        country: 'Египет',
        gender: 'Мужской',
        contract_number: 'какой-то там номер',
        payment_status: 'Оплачено',
        enrollment_order: '124123',
        enrollment_status: "Зачислен"
    },
    {
        key: '2',
        date_creation: new Date().toLocaleDateString(),
        education_type: "Контракт",
        educational_program: '256 (24-25 г.)',
        latin_name: 'Andrey Bushuev',
        russian_name: 'Андрей Бушуев',
        country: 'Россия',
        gender: 'Мужской',
        contract_number: 'какой-то там номер',
        payment_status: 'Оплачено частично',
        enrollment_order: '124123',
        enrollment_status: "Не зачислен"
    },
];

const TableBodyComponent = ({tableParams, setTableParams}: {
    tableParams: TableParams,
    setTableParams: Dispatch<SetStateAction<TableParams>>
}) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return <>
        <span style={{marginLeft: 8}}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Table
            rowSelection={rowSelection}
            rowKey={(record) => record.key}
            columns={GetTableColumns()}
            dataSource={data}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
        />
    </>;
}

export default TableBodyComponent