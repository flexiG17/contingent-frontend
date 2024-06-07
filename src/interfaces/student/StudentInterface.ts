import {ContactInterface} from "./ContactInterface";
import {CurrentEducationInterface} from "./currentEducation/CurrentEducationInterface";
import {InternationalInfoInterface} from "./InternationalInfoInterface";
import {EnrollmentInterface} from "./EnrollmentInterface";
import {MetadataInterface} from "./MetadataInterface";
import {OldEducationInterface} from "./OldEducationInterface";
import {PassportInterface} from "./PassportInterface";
import {PaymentInterface} from "./payment/PaymentInterface";
import React from "react";

export interface StudentInterface extends Record<string,any> {
    [key: string]: string | any,
    id: string | React.Key,
    latin_name: string,
    russian_name: string,
    agent_id?: string,
    representative_id?: string,
    tutor_id?: string,
    contact?: ContactInterface,
    current_education?: CurrentEducationInterface,
    international_info?: InternationalInfoInterface,
    enrollment?: EnrollmentInterface,
    metadata?: MetadataInterface,
    old_education?: OldEducationInterface,
    passport?: PassportInterface,
    payment?: PaymentInterface
}