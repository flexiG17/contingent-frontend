export interface StudentInterface {
    id: string;

    agent_name?: string;
    agent_phone_number?: string;
    agent_first_email?: string;
    agent_second_email?: string;

    representative_name?: string;
    representative_phone_number?: string;
    representative_first_email?: string;
    representative_second_email?: string;

    tutor_name?: string;

    contact_phone_number?: string;
    contact_first_email?: string;
    contact_second_email?: string;

    current_education_type?: 'current_education_type';
    current_education_form_study?: 'current_education_form_study';
    current_education_started_learning?: 'current_education_started_learning';
    current_education_date_started_learning?: Date;
    current_education_desired_level?: string;
    current_education_specialty_code?: string;
    current_education_specialty_direction?: string;
    current_education_education_field?: string;
    current_education_organization?: string;
    current_education_educational_program?: string;

    enrollment_status?: 'enrollment_status';
    enrollment_order_number?: string;
    enrollment_enrollment_date?: Date;
    enrollment_expulsion_order?: string;
    enrollment_expulsion_date?: Date;
    enrollment_contract_number?: string;
    enrollment_status_1c?: 'enrollment_status_1c';
    enrollment_scholarship?: 'enrollment_scholarship';

    international_info_RF_location?: 'international_info_RF_location';
    international_info_residence_place?: string;
    international_info_entry_date?: Date;
    international_info_departure_date?: Date;
    international_info_estimated_receipt_date?: Date;
    international_info_application_source?: string;
    international_info_visa_validity?: Date;
    international_info_transfer_to_international_service?: Date;
    international_info_transfer_to_MVD?: Date;

    metadata_is_archived?: boolean;
    metadata_comments?: string;
    metadata_created_at?: Date;
    metadata_updated_at?: Date;
    metadata_created_by_id?: string;

    old_education_level_education?: string;
    old_education_name_educational_institution?: string;
    old_education_location_educational_institution?: string;
    old_education_graduation_year?: number;
    old_education_direction_number?: string;

    passport_country?: string;
    passport_gender?: 'passport_gender';
    passport_birth_place?: string;
    passport_citizenship?: string;
    passport_passport_number?: string;
    passport_passport_expiration?: Date;
    passport_passport_issued?: string;
    passport_passport_issue_date?: Date;

    payment_contract_amount?: number;
    payment_payment_status?: 'payment_payment_status';
    payment_student_payment?: object[];
}