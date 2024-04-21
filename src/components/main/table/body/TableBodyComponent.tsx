import React, {useEffect, useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import type {GetProp, InputRef, TableColumnsType, TableColumnType, TableProps} from 'antd';
import {Button, Input, Space, Table} from 'antd';
import type {FilterDropdownProps} from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import styles from './tableBodyComponent.module.scss'

interface DataType {
    key: React.Key;
    date_creation: string;
    education_type: "Квота" | "Контракт";
    educational_program: string;
    latin_name: string;
    russian_name: string;
    country: string;
    gender: "Мужской" | "Женский";
    contract_number: string;
    payment_status: "Оплачено" | "Оплачено частично" | "Не оплачено";
    enrollment_order: string;
    enrollment_status: "Зачислен" | "Отчислен" | "Не зачислен"
}

type DataIndex = keyof DataType;
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const data: DataType[] = [
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

const TableBodyComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 1,
        },
    });

    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    }

    const fetchData = () => {
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: 2,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
            },
        });
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Дата создания',
            dataIndex: 'date_creation',
            key: 'date_creation',
            /*width: '30%',*/
            ...getColumnSearchProps('date_creation'),
        },
        {
            title: 'Тип обучения',
            dataIndex: 'education_type',
            key: 'education_type',
            /*...getColumnSearchProps('education_type'),*/
            filters: [
                {
                    text: 'Квота',
                    value: 'Квота',
                },
                {
                    text: 'Контракт',
                    value: 'Контракт',
                },
            ],
            onFilter: (value, record) => record.education_type.indexOf(value as string) === 0,
        },
        {
            title: 'Кол-во часов',
            dataIndex: 'educational_program',
            key: 'educational_program',
            ...getColumnSearchProps('educational_program'),
            sorter: (a, b) => a.educational_program.length - b.educational_program.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'ФИО (лат.)',
            dataIndex: 'latin_name',
            key: 'latin_name',
            ...getColumnSearchProps('latin_name'),
        },
        {
            title: 'ФИО (кир.)',
            dataIndex: 'russian_name',
            key: 'russian_name',
            ...getColumnSearchProps('russian_name'),
        },
        {
            title: 'Страна',
            dataIndex: 'country',
            key: 'country',
            ...getColumnSearchProps('country'),
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
            ...getColumnSearchProps('gender'),
        },
        {
            title: '№ договора',
            dataIndex: 'contract_number',
            key: 'contract_number',
            ...getColumnSearchProps('contract_number'),
        },
        {
            title: 'Статус оплаты',
            dataIndex: 'payment_status',
            key: 'payment_status',
            ...getColumnSearchProps('payment_status'),
        },
        {
            title: '№ о зачислении',
            dataIndex: 'enrollment_order',
            key: 'enrollment_order',
            ...getColumnSearchProps('enrollment_order'),
        },
        {
            title: 'Зачисление',
            dataIndex: 'enrollment_status',
            key: 'enrollment_status',
            ...getColumnSearchProps('enrollment_status'),
        },
    ];

    return <>
        <span style={{marginLeft: 8}}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.key}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
        />
    </>;
}

export default TableBodyComponent