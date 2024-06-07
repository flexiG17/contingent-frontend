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
import {CurrentEducationTypeEnum} from "../../../../enums/currentEducationTypeEnum";
import {GetEnumLatinKeyByValue} from "../../../../utils/GetEnumLatinKeyByValue";

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

const FieldBlockComponent = ({studentData, section, educationType, setStudentData}: {
    studentData: StudentInterface,
    section: StudentSectionFormInterface,
    educationType: 'Контракт' | 'Квота',
    setStudentData: Dispatch<SetStateAction<StudentInterface>>,
}) => {
    /*if (studentData[section.key]){
        console.log(section.key)
        console.log(studentData[section.key])
    }*/
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
                            setStudentData(prev => {
                                if (section.key === 'main')
                                    return {
                                        ...prev,
                                        [field.key]: event.target.value
                                    }
                                return {
                                    ...prev,
                                    [section.key]: {
                                        ...prev[section.key],
                                        [field.key]: GetValueByFieldType(field, event.target.value)
                                    }
                                }
                            })
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