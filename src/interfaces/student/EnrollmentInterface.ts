import {EnrollmentStatusEnum} from "../../enums/enrollmentEnum";

export interface EnrollmentInterface {
    id?: string,
    status?: EnrollmentStatusEnum,
    order_number?: string,
    enrollment_date?: Date,
    expulsion_order?: string,
    expulsion_date?: Date,
    contract_number?: string,
    status_1c?: string,
    scholarship?: boolean,
    student_id?: string
}