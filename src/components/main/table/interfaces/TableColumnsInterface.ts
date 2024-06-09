import React from "react";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import {EnrollmentStatusEnum} from "../../../../enums/enrollmentEnum";
import {PaymentStatusEnum} from "../../../../enums/paymentEnum";
import {PassportGenderEnum} from "../../../../enums/passportEnum";
import {CurrentEducationTypeEnum, FormStudyEnum} from "../../../../enums/currentEducation/currentEducationTypeEnum";

export interface TableColumnsInterface extends StudentInterface{
    id: React.Key;

    created_at: Date,
    country: string,
    status: EnrollmentStatusEnum,

    current_education: {
        type: CurrentEducationTypeEnum,
        form_study: FormStudyEnum
    },
    educational_program: string;
    latin_name: string;
    russian_name: string;
    passport : {
        country: string;
        gender: PassportGenderEnum;
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