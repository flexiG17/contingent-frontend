import React from "react";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import {EnrollmentStatusEnum} from "../../../../enums/enrollmentEnum";
import {PaymentStatusEnum} from "../../../../enums/paymentEnum";
import {GenderEnum} from "../../../../enums/passportEnum";
import {FormStudyEnum} from "../../../../enums/currentEducationTypeEnum";

export interface TableColumnsInterface extends StudentInterface{
    id: React.Key;

    created_at: Date,
    country: string,
    status: EnrollmentStatusEnum,

    current_education: {
        form_study: FormStudyEnum
    },
    educational_program: string;
    latin_name: string;
    russian_name: string;
    passport : {
        country: string;
        gender: GenderEnum;
    },
    contract_number: string;
    payment: {
        payment_status: PaymentStatusEnum,
    };
    enrollment: {
        status: EnrollmentStatusEnum,
        order_number: string
    }
}