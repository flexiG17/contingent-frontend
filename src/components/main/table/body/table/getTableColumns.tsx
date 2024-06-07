import {Button, Input, Space, TableColumnsType, TableColumnType} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, {useState} from "react";
import {FilterDropdownProps} from "antd/es/table/interface";
import {TableColumnsInterface} from "../../interfaces/TableColumnsInterface";
import {StudentInterface} from "../../../../../interfaces/student/StudentInterface";
import {GenderEnum} from "../../../../../enums/passportEnum";
import {GetEnumValueByKey} from "../../../../../utils/GetEnumValueByKey";
import {PaymentStatusEnum} from "../../../../../enums/paymentEnum";
import {EnrollmentStatusEnum} from "../../../../../enums/enrollmentEnum";

export type DataIndex = keyof StudentInterface;

export const GetTableColumns = (): TableColumnsType<StudentInterface> => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    /*const handleSearch = (
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
    };*/

    /*const searchInput = useRef<InputRef>(null);
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<TableColumnsInterface> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    /!*ref={searchInput}*!/
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
            record[dataIndex]!
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        /!*onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },*!/
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
    });*/

    return [
        {
            title: 'Дата создания',
            dataIndex: ['metadata', 'created_at'],
            key: 'created_at',
            render: item => {
                return new Date(item).toLocaleDateString()
            },
            // ...getColumnSearchProps('created_at'),
        },
        {
            title: 'Тип обучения',
            dataIndex: ['current_education', 'type'],
            key: 'type',
            render: item => {
                return item === 'Contract' ? 'Контракт' : 'Квота'
            },
            /*...getColumnSearchProps('education_type'),*/
            // filters: [
            //     {
            //         text: 'Квота',
            //         value: 'Quota',
            //     },
            //     {
            //         text: 'Контракт',
            //         value: 'Contract',
            //     },
            // ],
            // onFilter: (value, record) => record.current_education.form_study.indexOf(value as string) === 0,
        },
        // ИЗМЕНИТЬ: если количество часов не указано, то крашится
        // {
        //     title: 'Кол-во часов',
        //     dataIndex: ['current_education', 'educational_programs', 'hours_number'],
        //     key: 'hours_number',
        //     render: item => {
        //         return item ? item : ''
        //     },
        //     // ...getColumnSearchProps('educational_program'),
        //     // sorter: (a, b) => a.educational_program.length - b.educational_program.length,
        //     // sortDirections: ['descend', 'ascend'],
        // },
        {
            title: 'ФИО (лат.)',
            dataIndex: ['latin_name'],
            key: 'latin_name',
            width: '13%',
            // ...getColumnSearchProps('latin_name'),
        },
        {
            title: 'ФИО (кир.)',
            dataIndex: ['russian_name'],
            key: 'russian_name',
            width: '13%',
            // ...getColumnSearchProps('russian_name'),
        },
        {
            title: 'Страна',
            dataIndex: ['passport', 'country'],
            key: 'country',
            // ...getColumnSearchProps('country'),
        },
        {
            title: 'Пол',
            dataIndex: ['passport', 'gender'],
            key: 'gender',
            render: (item) => {
                return GetEnumValueByKey(GenderEnum, item)
            }
            /*filters: [
                {
                    text: 'Мужской',
                    value: 'Male',
                },
                {
                    text: 'Женский',
                    value: 'Female',
                },
            ],*/
            // onFilter: (value, record) => record.passport.gender.indexOf(value as string) === 0,
        },
        {
            title: '№ договора',
            dataIndex: ['enrollment', 'contract_number'],
            key: 'contract_number',
            // ...getColumnSearchProps('contract_number'),
        },
        {
            title: 'Статус оплаты',
            dataIndex: ['payment', 'payment_status'],
            key: 'payment_status',
            render: (item) => {
                return GetEnumValueByKey(PaymentStatusEnum, item)
            }
            /*filters: [
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
            ],*/
            // onFilter: (value, record) => record.payment.payment_status.indexOf(value as string) === 0,
        },
        {
            title: '№ о зачислении',
            dataIndex: ['enrollment', 'order_number'],
            key: 'order_number',
            // ...getColumnSearchProps('status'),
        },
        {
            title: 'Зачисление',
            dataIndex: ['enrollment', 'status'],
            key: 'enrollment',
            render: (item) => {
                return GetEnumValueByKey(EnrollmentStatusEnum, item)
            },
            /*filters: [
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
            ],*/
            onFilter: (value, record) => record.enrollment?.status?.indexOf(value as string) === 0,
        },
    ];
}