import {Button, Input, Space, TableColumnsType, TableColumnType} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, {useState} from "react";
import {FilterDropdownProps} from "antd/es/table/interface";
import {TableColumnsInterface} from "../../interfaces/tableColumnsInterface";

export type DataIndex = keyof TableColumnsInterface;

export const GetTableColumns = (): TableColumnsType<TableColumnsInterface> => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

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

    //const searchInput = useRef<InputRef>(null);
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<TableColumnsInterface> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    /*ref={searchInput}*/
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
        /*onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },*/
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

    return [
        {
            title: 'Дата создания',
            dataIndex: 'date_creation',
            key: 'date_creation',
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
            // dataIndex: 'educational_program',
            dataIndex: 'hours_number',
            key: 'educational_program',
            ...getColumnSearchProps('educational_program'),
            sorter: (a, b) => a.educational_program.length - b.educational_program.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'ФИО (лат.)',
            dataIndex: 'latin_name',
            key: 'latin_name',
            width: '13%',
            ...getColumnSearchProps('latin_name'),
        },
        {
            title: 'ФИО (кир.)',
            dataIndex: 'russian_name',
            key: 'russian_name',
            width: '13%',
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
            filters: [
                {
                    text: 'Мужской',
                    value: 'Мужской',
                },
                {
                    text: 'Женский',
                    value: 'Женский',
                },
            ],
            onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
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
            filters: [
                {
                    text: 'Оплачено',
                    value: 'Оплачено',
                },
                {
                    text: 'Не оплачено',
                    value: 'Не оплачено',
                },
                {
                    text: 'Оплачено частично',
                    value: 'Оплачено частично',
                },
            ],
            onFilter: (value, record) => record.payment_status.indexOf(value as string) === 0,
        },
        {
            title: '№ о зачислении',
            dataIndex: 'enrollment_order',
            key: 'enrollment_order',
            ...getColumnSearchProps('enrollment_order'),
        },
        {
            title: 'Зачисление',
            dataIndex: 'enrollment',
            key: 'enrollment',
            filters: [
                {
                    text: 'Зачислен',
                    value: 'Зачислен',
                },
                {
                    text: 'Не зачислен',
                    value: 'Не зачислен',
                },
                {
                    text: 'Отчислен',
                    value: 'Отчислен',
                },
            ],
            onFilter: (value, record) => record.enrollment.indexOf(value as string) === 0,
        },
    ];
}