import React, {useState} from 'react'
import {
    FieldInterface,
    StudentSectionFormInterface
} from "../../../../utils/studentFormStruct/interfaces/StudentFormFieldInterface";
import styles from "./fieldCardBlock.module.scss";
import {MenuItem, TextField} from "@mui/material";
import {dateTextFieldStyle, textFieldStyle} from "../../../../shared/theme/styles";
import {InputTypeEnum} from "../../../../shared/input/InputTypeEnum";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import {CurrentEducationTypeEnum} from "../../../../enums/currentEducation/currentEducationTypeEnum";
import {addNewValue, initialStudentState} from "../../../../features/student/studentSlice";
import {UserInterface} from "../../../../interfaces/UserInterface";
import {GetEnumValueByKey} from "../../../../utils/GetEnumValueByKey";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {GetEnumLatinKeyByValue} from "../../../../utils/GetEnumLatinKeyByValue";

const GetValueByFieldType = (field: FieldInterface, value: string | UserInterface, defaultValue?: boolean) => {
    switch (field.type) {
        case InputTypeEnum.DATE: {
            return defaultValue
                ? value ? new Date(value as string).toISOString().split('T')[0] : ''
                : new Date(value as string)
        }
        case InputTypeEnum.SELECT: {
            return GetEnumValueByKey(field.enum, value as string)
        }
        case InputTypeEnum.TEXT: {
            if (field.key === 'user') {
                return (value as UserInterface).name
            }
            return value
        }
        default:
            return value
    }
}

const FieldCardBlockComponent = ({fieldData, section, educationType, isDisabledField}: {
    fieldData: any;
    section: StudentSectionFormInterface,
    educationType: CurrentEducationTypeEnum,
    isDisabledField: boolean
}) => {
    /*if (studentData[section.key]){
        console.log(section.key)
        console.log(studentData[section.key])
    }*/
    const studentState = useSelector((state: RootState) => state.student)
    const dispatch = useDispatch()

    return (
        <div className={styles.column_block}>
            <h3>{section.title}</h3>
            {section.sectionFields.map((field) => {

                if (field.isStudentCard || (field.permission === educationType || field.permission === 'Общий')) {
                    /*if (field.defaultValue) {
                        setStudentData(prev => {
                            return {
                                ...prev,
                                [section.key]: {
                                    ...prev[section.key],
                                    [field.key]: field.defaultValue
                                }
                            }
                        })
                    }*/
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
                                        : GetValueByFieldType(field, event.target.value, true)
                            }))
                        }}
                        key={field.key}
                        disabled={field.disabled ? (field.disabled || isDisabledField) : isDisabledField}
                        variant="outlined" color="warning"
                        inputProps={textFieldStyle}
                        InputLabelProps={field.type === InputTypeEnum.DATE ? dateTextFieldStyle : textFieldStyle}
                        label={field.name}
                        name={field.key}
                        type={field.type}
                        select={field.type === InputTypeEnum.SELECT}
                        required={field.required}
                        defaultValue={
                            section.key === 'main'
                                ? fieldData[field.key]
                                : (GetValueByFieldType(field, fieldData[field.key], true))}
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

export default FieldCardBlockComponent