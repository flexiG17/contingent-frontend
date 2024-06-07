import {InputTypeEnum} from "../../shared/input/InputTypeEnum";
import {StudentSectionFormInterface} from "./interfaces/StudentFormFieldInterface";
import {CurrentEducationTypeEnum, FormStudyEnum, StartedLearningEnum} from "../../enums/currentEducationTypeEnum";
import {PaymentStatusEnum, PaymentTypeEnum} from "../../enums/paymentEnum";

const GetLeftSideFields = (): StudentSectionFormInterface[] => [
    {
        title: 'Личные данные',
        key: 'main',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Ф.И.О. (лат.)',
                key: 'latin_name',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: true,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Ф.И.О. (кир.)',
                key: 'russian_name',
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
        title: 'Контактные данные студента',
        key: 'contact',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Контактный телефон студента',
                key: 'phone_number',
                type: InputTypeEnum.PHONE_NUMBER,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Первая эл. почта студента',
                key: 'first_email',
                type: InputTypeEnum.EMAIL,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Вторая эл. почта студента',
                key: 'second_email',
                type: InputTypeEnum.EMAIL,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
        ]
    },
/*    {
        title: 'Контактные данные агента',
        key: 'agent',
        permission: CurrentEducationTypeEnum.Contract,
        sectionFields: [
            {
                name: 'Контактный телефон агента',
                key: 'agent_name',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Контактный телефон агента',
                key: 'agent_phone_number',
                type: InputTypeEnum.PHONE_NUMBER,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Первая эл. почта агента',
                key: 'first_agent_email',
                type: InputTypeEnum.EMAIL,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Вторая эл. почта агента',
                key: 'second_agent_email',
                type: InputTypeEnum.EMAIL,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
        ]
    },
    {
        title: 'Контактные данные представителя',
        key: 'representative',
        permission: CurrentEducationTypeEnum.Contract,
        sectionFields: [
            {
                name: 'Контактный телефон представителя',
                key: 'representative_name',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Контактный телефон представителя',
                key: 'representative_phone_number',
                type: InputTypeEnum.PHONE_NUMBER,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Первая эл. почта представителя',
                key: 'first_representative_email',
                type: InputTypeEnum.EMAIL,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Вторая эл. почта представителя',
                key: 'second_representative_email',
                type: InputTypeEnum.EMAIL,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
        ]
    },
    {
        title: 'Куратор',
        key: 'tutor',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Куратор (ФИО, номер телефона)',
                key: 'tutor_name',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
        ]
    },*/
    {
        title: 'Старое образование',
        key: 'old_education',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Уровень полученного образования',
                key: 'level_education',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Наименование учебного заведения',
                key: 'name_educational_institution',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Contract,
                isStudentCard: false,
            },
            {
                name: 'Местонахождение учебного заведения',
                key: 'location_educational_institution',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
            {
                name: 'Год окончания',
                key: 'graduation_year',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
            {
                name: 'Рег. номер направления',
                key: 'direction_number',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
        ]
    },
    {
        title: 'Дополнительные данные',
        key: 'metadata',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Примечания',
                key: 'comments',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата создания студента',
                key: 'created_at',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                disabled: true,
                required: false,
                permission: 'Общий',
                isStudentCard: true,
            },
            {
                name: 'Дата изменения студента',
                key: 'updated_at',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                disabled: true,
                required: false,
                permission: 'Общий',
                isStudentCard: true,
            },
            {
                name: 'Кто создал студента',
                key: 'user',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                disabled: true,
                isStudentCard: false,
            },
        ]
    },
    {
        title: 'Нынешнее образование',
        key: 'current_education',
        permission: 'Общий',
        sectionFields: [
            {
                name: 'Тип обучения',
                key: 'type',
                enum: CurrentEducationTypeEnum,
                type: InputTypeEnum.SELECT,
                values: [{
                    value: CurrentEducationTypeEnum.Contract,
                    label: CurrentEducationTypeEnum.Contract
                }, {
                    value: CurrentEducationTypeEnum.Quota,
                    label: CurrentEducationTypeEnum.Quota
                }],
                defaultValue: CurrentEducationTypeEnum.Contract,
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Форма обучения',
                key: 'form_study',
                enum: FormStudyEnum,
                type: InputTypeEnum.SELECT,
                values: [{
                    value: FormStudyEnum.Offline,
                    label: FormStudyEnum.Offline
                }, {
                    value: FormStudyEnum.Online,
                    label: FormStudyEnum.Online
                }, {
                    value: FormStudyEnum.Hybrid,
                    label: FormStudyEnum.Hybrid
                }],
                defaultValue: FormStudyEnum.Offline,
                required: false,
                permission: 'Общий',
                disabled: false,
                isStudentCard: false,
            },
            {
                name: 'Приступил к обучению',
                key: 'started_learning',
                enum: StartedLearningEnum,
                type: InputTypeEnum.SELECT,
                values: [{
                    value: StartedLearningEnum.True,
                    label: StartedLearningEnum.True
                }, {
                    value: StartedLearningEnum.False,
                    label: StartedLearningEnum.False
                }],
                defaultValue: StartedLearningEnum.False,
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Дата приступления к обучению',
                key: 'date_started_learning',
                type: InputTypeEnum.DATE,
                values: [],
                defaultValue: '',
                required: false,
                permission: 'Общий',
                isStudentCard: false,
            },
            {
                name: 'Уровень желаемого образования',
                key: 'desired_education_level',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
            {
                name: 'Код направления подготовки (специальности)',
                key: 'specialty_code',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
            {
                name: 'Направление подготовки (специальность)',
                key: 'specialty_direction',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
            {
                name: 'Область образования',
                key: 'education_field',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
            {
                name: 'Образовательная организация',
                key: 'educational_organization',
                type: InputTypeEnum.TEXT,
                values: [],
                defaultValue: '',
                required: false,
                permission: CurrentEducationTypeEnum.Quota,
                isStudentCard: false,
            },
        ]
    },
    {
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
    }
]

export default GetLeftSideFields