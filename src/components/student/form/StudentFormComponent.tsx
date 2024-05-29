import React, {useRef, useState} from "react";
import styles from './studentForm.module.scss'
import {InputTypeEnum} from "../../../shared/input/InputTypeEnum";
import {MenuItem, TextField} from "@mui/material";
import {GetStudentCreationFormStructure} from "../../../utils/GetStudentCreationFormStructure";
import {useForm} from "react-hook-form";
import ButtonComponent from "../../../shared/button/ButtonComponent";
import {createStudent} from "../../../actions/student";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../../router/routes";
import {PathsEnum} from "../../../router/pathsEnum";
import {Modal, notification} from "antd";
import {dateTextFieldStyle, textFieldStyle} from "../../../shared/theme/styles";
import {InternationalInfoEnum} from "../../../enums/internationalInfoEnum";
const studentStructure = GetStudentCreationFormStructure()

const removeEmptyFields = (data: any) => {
    Object.keys(data).forEach(key => {
        if (data[key] === '' || data[key] == null) {
            delete data[key];
        }
    });
}

const StudentFormComponent = ({educationType, studentData, isDisabledField}: {educationType: string, studentData: any[], isDisabledField: boolean}) => {
    // const {register, handleSubmit} = useForm();
    // const [data, setData] = useState<object>({});
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false)

    const openNotificationWithIcon = () => {
        api['success']({
            message: 'Студент создан',
        });
    };

    const formRef = useRef(null);
    const navigate = useNavigate()

    const isEditMode = studentData[0].russian_name != ''

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault();

        const currentForm = formRef.current
        if (currentForm === null) return

        let dataToSave = new FormData(currentForm);
        const objectData: object = Object.fromEntries(dataToSave)
        removeEmptyFields(objectData)
        // @ts-ignore
        objectData.date_creation = new Date()
        // @ts-ignore
        objectData.education_type = educationType

        createStudent(objectData)
            .then((data) => {
                openNotificationWithIcon()
                setTimeout(() => {
                    if (data.status === 201)
                        navigate(PathsEnum.MAIN)
                }, 1500)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const getDefaultValue = (field : any) => {
        if (isEditMode) {
            if (field.type === InputTypeEnum.DATE && studentData[0][field.key]) {
                return new Date(studentData[0][field.key]).toISOString().split('T')[0]
            }
            return studentData[0][field.key]
        }
        return field.defaultValue
    }

    return (
        <form
            ref={formRef} onSubmit={handleSubmit}
            style={{width: '100%'}}
            // onSubmit={handleSubmit((data) => setData(data))}
        >
            {contextHolder}
            <section className={styles.grid}>
                <div className={styles.column}>
                    {studentStructure.leftSideFields.map((section) => {
                        return <div className={styles.column_block}>
                            <h3 key={section.key}>{section.title}</h3>
                            {section.sectionFields.map((field) => {
                                return <TextField
                                    disabled={isDisabledField}
                                    variant="outlined" color="warning"
                                    inputProps={textFieldStyle}
                                    InputLabelProps={field.type === InputTypeEnum.DATE ? dateTextFieldStyle : textFieldStyle}
                                    label={field.name}
                                    name={field.key}
                                    type={field.type}
                                    select={field.type === InputTypeEnum.SELECT}
                                    required={field.required}
                                    defaultValue={getDefaultValue(field)}
                                    size="small"
                                >
                                    {field.values.map((option: {value: InternationalInfoEnum, label: InternationalInfoEnum}) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            })}
                        </div>
                    })}
                </div>
                <div className={styles.column}>
                    {studentStructure.rightSideFields.map((section) => {
                        return <div
                            key={section.key}
                            className={styles.column_block}>
                            <h3 key={section.key}>{section.title}</h3>
                            {section.sectionFields.map((field) => {
                                return <TextField
                                    disabled={isDisabledField}
                                    key={field.key}
                                    variant="outlined" color="warning"
                                    inputProps={textFieldStyle}
                                    InputLabelProps={field.type === InputTypeEnum.DATE ? dateTextFieldStyle : textFieldStyle}
                                    label={field.name}
                                    name={field.key}
                                    type={field.type}
                                    select={field.type === InputTypeEnum.SELECT}
                                    required={field.required}
                                    defaultValue={getDefaultValue(field)}
                                    size="small">
                                    {field.values.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            })}
                        </div>
                    })}
                </div>
            </section>

            <div className={styles.button}>
                <ButtonComponent
                    isLoading={isLoading}
                    textStyles={{fontSize: '16px'}}
                    buttonStyles={{width: '20%'}}
                    text={isEditMode ? 'Изменить' : 'Сохранить'}/>
            </div>
        </form>
    )
}

export default StudentFormComponent