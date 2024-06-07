import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {StudentInterface} from "../../interfaces/student/StudentInterface";
import GetRightSideFields from "../../utils/studentFormStruct/GetRightSideFields";
import {CurrentEducationTypeEnum} from "../../enums/currentEducationTypeEnum";
import GetLeftSideFields from "../../utils/studentFormStruct/GetLeftSideFields";
import {EnrollmentStatusEnum} from "../../enums/enrollmentEnum";
import {GetEnumLatinKeyByValue} from "../../utils/GetEnumLatinKeyByValue";
import {initialStudentState} from "../student/studentSlice";

export const studentListSlice = createSlice({
    name: 'studentList',
    initialState: [initialStudentState],
    reducers: {
        setStudentList: (state, action: { payload: StudentInterface[] }) => {
            return action.payload
        },
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

export const {setStudentList} = studentListSlice.actions

export default studentListSlice.reducer