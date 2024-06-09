import {Button, Input, InputRef, Space, TableColumnsType, TableColumnType} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, {useRef, useState} from "react";
import {FilterDropdownProps} from "antd/es/table/interface";
import {TableColumnsInterface} from "../../interfaces/TableColumnsInterface";
import {StudentInterface} from "../../../../../interfaces/student/StudentInterface";
import {PassportGenderEnum} from "../../../../../enums/passportEnum";
import {GetEnumValueByKey} from "../../../../../utils/GetEnumValueByKey";
import {PaymentStatusEnum} from "../../../../../enums/paymentEnum";
import {EnrollmentStatusEnum} from "../../../../../enums/enrollmentEnum";
import {CurrentEducationTypeEnum} from "../../../../../enums/currentEducation/currentEducationTypeEnum";
import {EducationalProgramHoursNumberEnum} from "../../../../../enums/currentEducation/educationalProgramEnum";
import {GetEnumLatinKeyByValue} from "../../../../../utils/GetEnumLatinKeyByValue";
import {PassportInterface} from "../../../../../interfaces/student/PassportInterface";
import {MetadataInterface} from "../../../../../interfaces/student/MetadataInterface";
import {EnrollmentInterface} from "../../../../../interfaces/student/EnrollmentInterface";
/*import get from "lodash.get";
import isequal from "lodash.isequal";*/

//export type DataIndex = keyof StudentInterface;
type DataIndex =
    [
        id?: keyof StudentInterface,
        text?:
            keyof PassportInterface
            | keyof MetadataInterface
            | keyof EnrollmentInterface
    ]

type NameFilterIndex = keyof StudentInterface

export const GetTableColumns = (): TableColumnsType<StudentInterface> => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState<DataIndex | NameFilterIndex>();

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex | NameFilterIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const searchInput = useRef<InputRef>(null);
    const getColumnSearchProps = (dataIndex?: DataIndex, nameIndex?: NameFilterIndex): TableColumnType<StudentInterface> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex ? dataIndex[0] : nameIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(
                        selectedKeys as string[],
                        confirm,
                        dataIndex ? dataIndex : nameIndex!)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex ? dataIndex : nameIndex!)}
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
        onFilter: (value, record) => {
            const studentFieldValue = dataIndex?.length! > 0 ? record[dataIndex![0]!][dataIndex![1]!]: record[nameIndex!]
            return studentFieldValue
                    ?
                    studentFieldValue
                        .toString()
                        .toLowerCase()
                        .includes((value as string).toLowerCase())
                    :
                    false
        },
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
            /*sorter: (a, b) => {
                return a.current_education?.type?.length! - b.current_education?.type?.length!
            },*/
            key: 'type',
            render: (item: CurrentEducationTypeEnum) => {
                return GetEnumValueByKey(CurrentEducationTypeEnum, item)
            },
            /*...getColumnSearchProps('education_type'),*/
            filters: [
                {
                    text: CurrentEducationTypeEnum.Quota,
                    value: GetEnumLatinKeyByValue(CurrentEducationTypeEnum, CurrentEducationTypeEnum.Quota),
                },
                {
                    text: CurrentEducationTypeEnum.Contract,
                    value: GetEnumLatinKeyByValue(CurrentEducationTypeEnum, CurrentEducationTypeEnum.Contract),
                },
            ],
            onFilter: (value, record) => record.current_education?.type!.indexOf(value as string) === 0,
        },
        {
            title: 'Кол-во часов',
            dataIndex: ['current_education', 'educational_programs', 'hours_number'],
            key: 'hours_number',
            render: item => {
                return GetEnumValueByKey(EducationalProgramHoursNumberEnum, item)
            },
            // ...getColumnSearchProps('educational_program'),
            // sorter: (a, b) => a.educational_program.length - b.educational_program.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'ФИО (лат.)',
            dataIndex: ['latin_name'],
            key: 'latin_name',
            width: '13%',
            ...getColumnSearchProps([], 'latin_name'),
        },
        {
            title: 'ФИО (кир.)',
            dataIndex: ['russian_name'],
            key: 'russian_name',
            width: '13%',
            ...getColumnSearchProps([], 'russian_name'),
        },
        // ДОБАВИТЬ
        // можно получать с бэка все возможные страны и сюда добавить фильтр из возвращаемого списка них
        {
            title: 'Страна',
            dataIndex: ['passport', 'country'],
            key: 'country',
            ...getColumnSearchProps(['passport', 'country']),
        },
        {
            title: 'Пол',
            dataIndex: ['passport', 'gender'],
            key: 'gender',
            render: (item) => {
                return GetEnumValueByKey(PassportGenderEnum, item)
            },
            filters: [
                {
                    text: PassportGenderEnum.Female,
                    value: GetEnumLatinKeyByValue(PassportGenderEnum, PassportGenderEnum.Female),
                },
                {
                    text: PassportGenderEnum.Male,
                    value: GetEnumLatinKeyByValue(PassportGenderEnum, PassportGenderEnum.Male),
                },
            ],
            onFilter: (value, record) => record.passport!.gender!.indexOf(value as string) === 0,
        },
        {
            title: '№ договора',
            dataIndex: ['enrollment', 'contract_number'],
            key: 'contract_number',
            ...getColumnSearchProps(['enrollment', 'contract_number']),
        },
        {
            title: 'Статус оплаты',
            dataIndex: ['payment', 'payment_status'],
            key: 'payment_status',
            render: (item) => {
                return GetEnumValueByKey(PaymentStatusEnum, item)
            },
            filters: [
                {
                    text: PaymentStatusEnum.Paid,
                    value: GetEnumLatinKeyByValue(PaymentStatusEnum, PaymentStatusEnum.Paid),
                },
                {
                    text: PaymentStatusEnum.PartiallyPaid,
                    value: GetEnumLatinKeyByValue(PaymentStatusEnum, PaymentStatusEnum.PartiallyPaid),
                },
                {
                    text: PaymentStatusEnum.NotPaid,
                    value: GetEnumLatinKeyByValue(PaymentStatusEnum, PaymentStatusEnum.NotPaid),
                },
            ],
            onFilter: (value, record) => {
                if (record.payment?.payment_status === null)
                    return false
                return record.payment?.payment_status!.indexOf(value as string) === 0
            },
        },
        {
            title: '№ о зачислении',
            dataIndex: ['enrollment', 'order_number'],
            key: 'order_number',
            ...getColumnSearchProps(['enrollment', 'order_number']),
        },
        {
            title: 'Зачисление',
            dataIndex: ['enrollment', 'status'],
            key: 'enrollment',
            render: (item) => {
                return GetEnumValueByKey(EnrollmentStatusEnum, item)
            },
            filters: [
                {
                    text: EnrollmentStatusEnum.Enrolled,
                    value: GetEnumLatinKeyByValue(EnrollmentStatusEnum, EnrollmentStatusEnum.Enrolled),
                },
                {
                    text: EnrollmentStatusEnum.NotEnrolled,
                    value: GetEnumLatinKeyByValue(EnrollmentStatusEnum, EnrollmentStatusEnum.NotEnrolled),
                },
                {
                    text: EnrollmentStatusEnum.Expelled,
                    value: GetEnumLatinKeyByValue(EnrollmentStatusEnum, EnrollmentStatusEnum.Expelled),
                },
            ],
            onFilter: (value, record) => {
                if (record.enrollment?.status! === null)
                    return false
                return record.enrollment?.status!.indexOf(value as string) === 0
            },
        },
    ];
}