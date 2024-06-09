import React, {useEffect, useRef, useState} from "react";
import styles from './studentForm.module.scss'
import {useNavigate} from "react-router-dom";
import {App, notification} from "antd";
import {InputTypeEnum} from "../../../../shared/input/InputTypeEnum";
import ButtonComponent from "../../../../shared/button/ButtonComponent";
import {GetStudentFormStructure} from "../../../../utils/studentFormStruct/GetStudentFormStructure";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import FieldCardBlockComponent from "../fieldCardBlock/FieldCardBlockComponent";
import {CurrentEducationTypeEnum} from "../../../../enums/currentEducation/currentEducationTypeEnum";
import {GetEnumValueByKey} from "../../../../utils/GetEnumValueByKey";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {updateStudentData} from "../../../../actions/student";
import {GetNotificationArgs} from "../../../../utils/notificationArgs";
import SubmitModalComponent from "../../../../shared/submitModal/SubmitModalComponent";

const studentStructure = GetStudentFormStructure()

const removeEmptyFields = (data: any) => {
    Object.keys(data).forEach(key => {
        if (data[key] === '' || data[key] == null) {
            delete data[key];
        }
    });
}

const StudentCardFormComponent = ({isDisabledField}: {
    isDisabledField: boolean
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [educationType, setEducationType] = useState<CurrentEducationTypeEnum>(CurrentEducationTypeEnum.Contract)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)

    useEffect(() => {
        setEducationType(GetEnumValueByKey(CurrentEducationTypeEnum, studentState.current_education!.type!))
    }, []);

    const studentState = useSelector((state: RootState) => state.student)
    const {notification} = App.useApp()
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const handleSubmit = () => {
        setIsLoading(true)
        // event.preventDefault();

        const obj: StudentInterface = {
            ...studentState,
            contact: {
                ...studentState.contact,
                student_id: undefined
            },
            current_education: {
                ...studentState.current_education,
                student_id: undefined,
                educational_programs: undefined,
                educational_program_id: undefined
            },
            international_info: {
                ...studentState.international_info,
                student_id: undefined
            },
            enrollment: {
                ...studentState.enrollment,
                student_id: undefined
            },
            old_education: {
                ...studentState.old_education,
                student_id: undefined
            },
            passport: {
                ...studentState.passport,
                student_id: undefined
            }
        }
        updateStudentData(obj)
            .then((res) => {
                notification.open(GetNotificationArgs({
                    message: 'Студент успешно изменён',
                    type: "success",
                }))
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                setIsLoading(false)
            })
            .catch((e) => {
                const text = e.response.status === 400 ? 'Проверьте корректность вводимых полей' : `Ошибка сервера ${e.message}`
                notification.open(GetNotificationArgs({
                    message: text,
                    type: "error",
                }))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    /*const getDefaultValue = (field: any) => {
        if (field.type === InputTypeEnum.DATE && studentData[field.key]) {
            return new Date(studentData[field.key]).toISOString().split('T')[0]
        }
        console.log(studentData[field.key]);
        return studentData[field.key]
    }*/

    return (
        <div style={{width: '100%'}}>
            <section className={styles.grid}>
                <div className={styles.column}>
                    {studentStructure.leftSideFields().map((section) => {
                        if (section.permission === 'Общий' || section.permission === educationType)
                            return <FieldCardBlockComponent
                                key={section.key}
                                fieldData={section.key === 'main' ? {
                                    latin_name: studentState.latin_name,
                                    russian_name: studentState.russian_name
                                } : studentState[section.key]}
                                // studentData={studentData}
                                educationType={educationType!}
                                section={section}
                                isDisabledField={isDisabledField}
                            />
                    })}
                </div>
                <div className={styles.column}>
                    {studentStructure.rightSideFields().map((section) => {

                        if (section.permission === 'Общий' || section.permission === educationType)
                            return <FieldCardBlockComponent
                                key={section.key}
                                fieldData={section.key === 'main' ? {
                                    latin_name: studentState.latin_name,
                                    russian_name: studentState.russian_name
                                } : studentState[section.key]}
                                educationType={educationType!}
                                section={section}
                                isDisabledField={isDisabledField}
                            />
                    })}
                </div>
            </section>
            <div className={styles.button}>
                {isSubmit &&
                    <SubmitModalComponent
                        isDeleteModalOpen={isSubmit} setIsDeleteModalOpen={setIsSubmit}
                        title={'Изменение данных'}
                        action={handleSubmit}
                        text={
                            <span>Вы уверены, что хотите изменить данные <strong>{studentState.russian_name}</strong>?</span>
                        }/>
                }
                <div style={{width: '100%', display: "flex", justifyContent: 'center'}} onClick={() => setIsSubmit(true)}>
                    <ButtonComponent
                        disabled={isDisabledField}
                        isLoading={isLoading}
                        textStyles={{fontSize: '16px'}}
                        buttonStyles={{width: '20%'}}
                        text={'Изменить'}
                        isSubmit={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default StudentCardFormComponent