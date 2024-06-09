import React, {Dispatch, SetStateAction} from 'react'
import {
    FieldInterface,
    StudentSectionFormInterface
} from "../../../../utils/studentFormStruct/interfaces/StudentFormFieldInterface";
import styles from "./fieldBlock.module.scss";
import {MenuItem, TextField} from "@mui/material";
import {dateTextFieldStyle, textFieldStyle} from "../../../../shared/theme/styles";
import {InputTypeEnum} from "../../../../shared/input/InputTypeEnum";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import {CurrentEducationTypeEnum} from "../../../../enums/currentEducation/currentEducationTypeEnum";
import {GetEnumLatinKeyByValue} from "../../../../utils/GetEnumLatinKeyByValue";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {addNewValue} from "../../../../features/student/studentSlice";

export const GetValueByFieldType = (field: FieldInterface, value: string) => {
    switch (field.type) {
        case InputTypeEnum.DATE: {
            return new Date(value)
        }

        case InputTypeEnum.SELECT: {
            return GetEnumLatinKeyByValue(field.enum, value)
        }
        default:
            return value
    }
}

const FieldBlockComponent = ({section, educationType}: {
    section: StudentSectionFormInterface,
    educationType: CurrentEducationTypeEnum,
}) => {
    const studentState = useSelector((state: RootState) => state.student)
    const dispatch = useDispatch()

    return (
        <div className={styles.column_block}>
            <h3>{section.title}</h3>
            {section.sectionFields.map((field) => {
                if (!field.isStudentCard && (field.permission === educationType || field.permission === 'Общий')) {
                    if (field.defaultValue) {
                        /*setStudentData(prev => {
                            return {
                                ...prev,
                                [section.key]: {
                                    ...prev[section.key],
                                    [field.key]: field.defaultValue
                                }
                            }
                        })*/
                    }
                    return <TextField
                        onChange={(event) => {
                            if (section.key === 'main')
                                dispatch(addNewValue({
                                    fieldKey: field.key,
                                    data: GetValueByFieldType(field, event.target.value)
                                }))
                            else dispatch(addNewValue({
                                sectionKey: section.key,
                                fieldKey: field.key,
                                data:
                                    field.type === InputTypeEnum.SELECT
                                        ? GetEnumLatinKeyByValue(field.enum, event.target.value)
                                        : GetValueByFieldType(field, event.target.value)
                            }))
                        }}
                        key={field.key}
                        disabled={field.disabled}
                        variant="outlined" color="warning"
                        inputProps={textFieldStyle}
                        InputLabelProps={field.type === InputTypeEnum.DATE ? dateTextFieldStyle : textFieldStyle}
                        label={field.name}
                        name={field.key}
                        type={field.type}
                        select={field.type === InputTypeEnum.SELECT}
                        required={field.required}
                        defaultValue={field.defaultValue}
                        size="small"
                    >
                        {field.values.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                }

            })}
        </div>)
}

export default FieldBlockComponent