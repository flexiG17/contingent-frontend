import {EducationalProgramInterface} from "./EducationalProgramInterface";
import {CurrentEducationTypeEnum} from "../../../enums/currentEducation/currentEducationTypeEnum";

export interface CurrentEducationInterface {
    id?: string,
    type?: CurrentEducationTypeEnum | '',
    form_study?: string,
    started_learning?: string,
    date_started_learning?: Date,
    desired_level?: string,
    specialty_code?: string,
    specialty_direction?: string,
    education_field?: string,
    organization?: string,
    educational_program_id?: string,
    student_id?: string,
    educational_programs?: EducationalProgramInterface[]
}