import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {StudentInterface} from "../../interfaces/student/StudentInterface";
import GetRightSideFields from "../../utils/studentFormStruct/GetRightSideFields";
import {CurrentEducationTypeEnum} from "../../enums/currentEducationTypeEnum";
import GetLeftSideFields from "../../utils/studentFormStruct/GetLeftSideFields";
import {EnrollmentStatusEnum} from "../../enums/enrollmentEnum";
import {GetEnumLatinKeyByValue} from "../../utils/GetEnumLatinKeyByValue";

const GetDefaultValue = (inputSection: string, inputField: string): any => {
    let result = '';
    GetRightSideFields().map((section) => {
        if (section.key === inputSection) {
            section.sectionFields.map((field) => {
                if (field.key === inputField) {
                    result = field.defaultValue
                    return field.defaultValue
                }
            })
            return ''
        }
    })

    if (result) {
        GetLeftSideFields().map((section) => {
            if (section.key === inputSection) {
                section.sectionFields.map((field) => {
                    if (field.key === inputField) {
                        result = field.defaultValue
                        return field.defaultValue
                    }
                })
                return ''
            }
        })
    }

    return result
}
export const initialStudentState: StudentInterface = {
    id: '',
    russian_name: '',
    latin_name: 'student name',
    enrollment: {
        status: GetEnumLatinKeyByValue(EnrollmentStatusEnum, EnrollmentStatusEnum.NotEnrolled)
    },
    metadata: {created_at: new Date()},
    current_education: {
        type: GetEnumLatinKeyByValue(CurrentEducationTypeEnum, CurrentEducationTypeEnum.Contract),
        educational_programs: {
            hours_number: undefined
        },
        form_study: undefined,
        started_learning: undefined
    },
    passport: {
        country: undefined,
    },
    payment: {
        payment_status: undefined
    },
    contact: {},
    agent: {},
    representative: {},
    tutor: {},
    old_education: {},
    international_info: {},
}

export const studentSlice = createSlice({
    name: 'student',
    initialState: initialStudentState,
    reducers: {
        setCurrentStudent: (state, action: { payload: StudentInterface }) => {
            return action.payload
        },
        addNewValue: (state, action: {
            payload: {
                sectionKey?: string,
                fieldKey: string,
                data: any
            }
        }) => {
            if (action.payload.sectionKey) {
                return {
                    ...state,
                    [action.payload.sectionKey]: {
                        ...state[action.payload.sectionKey],
                        [action.payload.fieldKey]: action.payload.data
                    }
                }
            }

            return {
                ...state,
                [action.payload.fieldKey]: action.payload.data
            }
        }
        /*findAll: (state, action: PayloadAction<StudentInterface[]>) => {
            state = action.payload
        },
        findOne: (state, action: PayloadAction<string>) => {
            state[0].id = action.payload
        },
        create: (state, action: PayloadAction<StudentInterface>) => {
            state[0] = action.payload
        },
        remove: (state, action: PayloadAction<string>) => {
            state[0].id = action.payload
        },
        update: (state, action: PayloadAction<StudentInterface>) => {
            state[0] = action.payload
        },*/
    },
})

export const {setCurrentStudent, addNewValue} = studentSlice.actions

export default studentSlice.reducer