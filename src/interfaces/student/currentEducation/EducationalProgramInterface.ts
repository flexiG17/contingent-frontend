import {AcademicYearEnum, EducationalProgramDurationEnum, EducationalProgramHoursNumberEnum} from "../../../enums/currentEducation/educationalProgramEnum";

export interface EducationalProgramInterface {
    id?: string,
    hours_number?: EducationalProgramHoursNumberEnum,
    duration?: EducationalProgramDurationEnum,
    academic_year?: AcademicYearEnum
}