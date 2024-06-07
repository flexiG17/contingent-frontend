import {InputTypeEnum} from "../../shared/input/InputTypeEnum";
import {GenderEnum} from "../../enums/passportEnum";
import {
    Enrollment1CStatusEnum,
    EnrollmentScholarshipStatusEnum,
    EnrollmentStatusEnum,
    InternationalInfoEnum
} from "../../enums/enrollmentEnum";
import {StudentSectionFormInterface} from "./interfaces/StudentFormFieldInterface";
import {PaymentStatusEnum, PaymentTypeEnum} from "../../enums/paymentEnum";
import {CurrentEducationTypeEnum} from "../../enums/currentEducationTypeEnum";
import {GetEnumLatinKeyByValue} from "../GetEnumLatinKeyByValue";

const GetRightSideFields = (): StudentSectionFormInterface[] => [
    {
        title: 'Паспортные данные',
        key: 'passport',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Страна',
                key: 'country',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Пол',
                key: 'gender',
                enum: GenderEnum,
                type: InputTypeEnum.SELECT,
                values: [
                    {
                        value: GenderEnum.Male,
                        label: GenderEnum.Male,
                    },
                    {
                        value: GenderEnum.Female,
                        label: GenderEnum.Female
                    },
                ],
                defaultValue: '',
                required: true,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата рождения',
                key: 'birth_date',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: true,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Номер паспорта',
                key: 'passport_number',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: true,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата выдачи паспорта',
                key: 'passport_issue_date',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Срок действия паспорта',
                key: 'passport_expiration',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Кем выдан',
                key: 'passport_issued',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
        ]
    },
    {
        title: 'Данные о местоположении',
        key: 'international_info',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Место проживания в РФ',
                key: 'residence_place',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Нахождение в РФ',
                key: 'RF_location',
                enum: InternationalInfoEnum,
                type: InputTypeEnum.SELECT,
                values: [
                    {
                        value: InternationalInfoEnum.True,
                        label: InternationalInfoEnum.True
                    },
                    {
                        value: InternationalInfoEnum.False,
                        label: InternationalInfoEnum.False
                    },
                ],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата въезда',
                key: 'entry_date',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата отъезда',
                key: 'departure_date',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Ориентировочная дата получения приглашения',
                key: 'estimated_receipt_date',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Фактическая дата получения приглашения',
                key: 'actual_receipt_date_invitation',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Откуда пришла заявка',
                key: 'application_source',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Срок действия визы',
                key: 'visa_validity',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата передачи в международную службу',
                key: 'transfer_to_international_service',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Дата передачи в МВД',
                key: 'transfer_to_MVD',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
        ]
    },
    {
        title: 'Зачисление',
        key: 'enrollment',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Статус зачисления',
                key: 'status',
                enum: EnrollmentStatusEnum,
                type: InputTypeEnum.SELECT,
                values: [
                    {
                        value: EnrollmentStatusEnum.Enrolled,
                        // value: GetEnumLatinKeyByValue(EnrollmentStatusEnum, EnrollmentStatusEnum.Enrolled),
                        label: EnrollmentStatusEnum.Enrolled
                    },
                    {
                        value: EnrollmentStatusEnum.NotEnrolled,
                        label: EnrollmentStatusEnum.NotEnrolled
                    },
                    {
                        value: EnrollmentStatusEnum.Expelled,
                        label: EnrollmentStatusEnum.Expelled
                    },
                ],
                defaultValue: EnrollmentStatusEnum.NotEnrolled,
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Номер приказа о зачислении',
                key: 'order_number',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата зачисления',
                key: 'enrollment_date',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Номер приказа об отчислении',
                key: 'expulsion_order',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата отчисления',
                key: 'expulsion_date',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Номер договора',
                key: 'contract_number',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Статус 1C',
                key: 'status_1c',
                enum: Enrollment1CStatusEnum,
                type: InputTypeEnum.SELECT,
                values: [
                    {
                        value: Enrollment1CStatusEnum.Pinned,
                        label: Enrollment1CStatusEnum.Pinned
                    },
                    {
                        value: Enrollment1CStatusEnum.NotPinned,
                        label: Enrollment1CStatusEnum.NotPinned
                    },
                ],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Стипендия',
                key: 'scholarship',
                enum: EnrollmentScholarshipStatusEnum,
                type: InputTypeEnum.SELECT,
                values: [
                    {
                        value: EnrollmentScholarshipStatusEnum.True,
                        label: EnrollmentScholarshipStatusEnum.True
                    },
                    {
                        value: EnrollmentScholarshipStatusEnum.False,
                        label: EnrollmentScholarshipStatusEnum.False
                    },
                ],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
        ]
    },
    /*{
        title: 'Оплата',
        key: 'payment',
        permission: CurrentEducationTypeEnum.Contract,
        sectionFields: [
            {
                name: 'Cумма для оплаты по договору',
                key: 'contract_amount',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Статус оплаты',
                key: 'payment_status',
                enum: PaymentStatusEnum,
                type: InputTypeEnum.SELECT,
                values: [
                    {
                        value: PaymentStatusEnum.Paid,
                        label: PaymentStatusEnum.Paid
                    },
                    {
                        value: PaymentStatusEnum.PartiallyPaid,
                        label: PaymentStatusEnum.PartiallyPaid
                    },
                    {
                        value: PaymentStatusEnum.NotPaid,
                        label: PaymentStatusEnum.NotPaid
                    },
                ],
                defaultValue: PaymentStatusEnum.NotPaid,
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Номер платежа',
                key: 'ordinal',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Тип платежа',
                key: 'type',
                enum: PaymentTypeEnum,
                type: InputTypeEnum.SELECT,
                values: [
                    {
                        value: PaymentTypeEnum.Contract,
                        label: PaymentTypeEnum.Contract,
                    },
                    {
                        value: PaymentTypeEnum.Actual,
                        label: PaymentTypeEnum.Actual,
                    },],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Дата платежа',
                key: 'date',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Размер платежа',
                key: 'amount',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
        ]
    }*/
]

export default GetRightSideFields