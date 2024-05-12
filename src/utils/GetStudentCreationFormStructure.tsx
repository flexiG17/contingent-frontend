import {InputTypeEnum} from "../shared/input/InputTypeEnum";
import {GenderEnum} from "../enums/passportEnum";
import {InternationalInfoEnum} from "../enums/internationalInfoEnum";

export const GetStudentCreationFormStructure = () => {
    return [
        {
            title: 'Личные данные',
            key: 'student',
            sectionFields: [
                {
                    name: 'Ф.И.О. (лат.)',
                    key: 'latin_name',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: true
                },
                {
                    name: 'Ф.И.О. (кир.)',
                    key: 'russian_name',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: false
                },
            ]
        },
        {
            title: 'Контактные данные студента',
            key: 'contacts',
            sectionFields: [
                {
                    name: 'Контактный телефон студента',
                    key: 'contact_phone_number',
                    type: InputTypeEnum.PHONE_NUMBER,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Первая эл. почта студента',
                    key: 'first_student_email',
                    type: InputTypeEnum.EMAIL,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Вторая эл. почта студента',
                    key: 'second_student_email',
                    type: InputTypeEnum.EMAIL,
                    values: [],
                    defaultValue: '',
                    required: false
                },
            ]
        },
        {
            title: 'Контактные данные агента',
            key: 'agent',
            sectionFields: [
                {
                    name: 'Контактный телефон агента',
                    key: 'agent_name',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Контактный телефон агента',
                    key: 'agent_phone_number',
                    type: InputTypeEnum.PHONE_NUMBER,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Первая эл. почта агента',
                    key: 'first_agent_email',
                    type: InputTypeEnum.EMAIL,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Вторая эл. почта агента',
                    key: 'second_agent_email',
                    type: InputTypeEnum.EMAIL,
                    values: [],
                    defaultValue: '',
                    required: false
                },
            ]
        },
        {
            title: 'Контактные данные представителя',
            key: 'representative',
            sectionFields: [
                {
                    name: 'Контактный телефон представителя',
                    key: 'representative_name',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Контактный телефон представителя',
                    key: 'representative_phone_number',
                    type: InputTypeEnum.PHONE_NUMBER,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Первая эл. почта представителя',
                    key: 'first_representative_email',
                    type: InputTypeEnum.EMAIL,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Вторая эл. почта представителя',
                    key: 'second_representative_email',
                    type: InputTypeEnum.EMAIL,
                    values: [],
                    defaultValue: '',
                    required: false
                },
            ]
        },
        {
            title: 'Куратор',
            key: 'tutor',
            sectionFields: [
                {
                    name: 'Куратор (ФИО, номер телефона)',
                    key: 'tutor_name',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: false
                },
            ]
        },
        {
            title: 'Паспортные данные',
            key: 'passport',
            sectionFields: [
                {
                    name: 'Страна',
                    key: 'country',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Пол',
                    key: 'gender',
                    type: InputTypeEnum.SELECT,
                    values: [
                        {
                            value: GenderEnum.Male,
                            label: GenderEnum.Male
                        },
                        {
                            value: GenderEnum.Female,
                            label: GenderEnum.Female
                        },
                    ],
                    defaultValue: '',
                    required: true
                },
                {
                    name: 'Дата рождения',
                    key: 'birth_date',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: true
                },
                {
                    name: 'Номер паспорта',
                    key: 'passport_number',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: true
                },
                {
                    name: 'Дата выдачи паспорта',
                    key: 'passport_issue_date',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Срок действия паспорта',
                    key: 'passport_expiration',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Кем выдан',
                    key: 'passport_issued',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: false
                },
            ]
        },
        {
            title: 'Данные о местоположении',
            key: 'international_info',
            sectionFields: [
                {
                    name: 'Место проживания в РФ',
                    key: 'residence_place',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Нахождение в РФ',
                    key: 'RF_location',
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
                    required: false
                },
                {
                    name: 'Дата въезда',
                    key: 'entry_date',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Дата отъезда',
                    key: 'departure_date',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Ориентировочная дата получения приглашения',
                    key: 'estimated_receipt_date',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Фактическая дата получения приглашения',
                    key: 'actual_receipt_date_invitation',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Откуда пришла заявка',
                    key: 'application_source',
                    type: InputTypeEnum.TEXT,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Срок действия визы',
                    key: 'visa_validity',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: false
                },
                {
                    name: 'Дата передачи в МВД',
                    key: 'transfer_to_MVD',
                    type: InputTypeEnum.DATE,
                    values: [],
                    defaultValue: '',
                    required: false
                },
            ]
        },
    ]
}