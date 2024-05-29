import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {StudentInterface} from "./studentInterface";

export const initialStudentState: StudentInterface[] = [{
    id: '',
    russian_name: '',
    latin_name: '',
    agent_name: '',
    agent_phone_number: '',
    agent_first_email: '',
    agent_second_email: '',

    representative_name: '',
    representative_phone_number: '',
    representative_first_email: '',
    representative_second_email: '',

    tutor_name: '',

    contact_phone_number: '',
    contact_first_email: '',
    contact_second_email: '',

    current_education_type: 'current_education_type',
    current_education_form_study: 'current_education_form_study',
    current_education_started_learning: 'current_education_started_learning',
    current_education_date_started_learning: new Date(),
    current_education_desired_level: '',
    current_education_specialty_code: '',
    current_education_specialty_direction: '',
    current_education_education_field: '',
    current_education_organization: '',
    current_education_educational_program: '',

    enrollment_status: 'enrollment_status',
    enrollment_order_number: '',
    enrollment_enrollment_date: new Date(),
    enrollment_expulsion_order: '',
    enrollment_expulsion_date: new Date(),
    enrollment_contract_number: '',
    enrollment_status_1c: 'enrollment_status_1c',
    enrollment_scholarship: 'enrollment_scholarship',

    international_info_RF_location: 'international_info_RF_location',
    international_info_residence_place: '',
    international_info_entry_date: new Date(),
    international_info_departure_date: new Date(),
    international_info_estimated_receipt_date: new Date(),
    international_info_application_source: '',
    international_info_visa_validity: new Date(),
    international_info_transfer_to_international_service: new Date(),
    international_info_transfer_to_MVD: new Date(),

    metadata_is_archived: false,
    metadata_comments: 'string',
    metadata_created_at: new Date(),
    metadata_updated_at: new Date(),
    metadata_created_by_id: 'string',

    old_education_level_education: 'string',
    old_education_name_educational_institution: 'string',
    old_education_location_educational_institution: 'string',
    old_education_graduation_year: 0,
    old_education_direction_number: 'string',

    passport_country: 'string',
    passport_gender: 'passport_gender',
    passport_birth_place: 'string',
    passport_citizenship: 'string',
    passport_passport_number: 'string',
    passport_passport_expiration: new Date(),
    passport_passport_issued: 'string',
    passport_passport_issue_date: new Date(),

    payment_contract_amount: 0,
    payment_payment_status: 'payment_payment_status',
    payment_student_payment: [],
}]

export const studentSlice = createSlice({
    name: 'student',
    initialState: initialStudentState,
    reducers: {
        findAll: (state, action: PayloadAction<StudentInterface[]>) => {
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
            state[0]  = action.payload
        },
    },
})

export const { findAll, findOne, create, remove, update } = studentSlice.actions

export default studentSlice.reducer