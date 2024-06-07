import {InputTypeEnum} from "../../../shared/input/InputTypeEnum";
import {CurrentEducationTypeEnum} from "../../../enums/currentEducationTypeEnum";

export interface FieldValueList {
    label: string,
    value: string,
}

export interface FieldInterface {
    [key: string]: string | any,
    name: string,
    key: string,
    enum?: any,
    type: InputTypeEnum,
    values: FieldValueList[],
    defaultValue: string,
    required: boolean,
    permission: CurrentEducationTypeEnum | 'Общий',
    disabled?: boolean,
    isStudentCard: boolean,
}

export interface StudentSectionFormInterface {
    title: string,
    key: string,
    permission: CurrentEducationTypeEnum | 'Общий'
    sectionFields: FieldInterface[]
}