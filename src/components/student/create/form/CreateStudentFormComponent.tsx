import React, {lazy, SetStateAction, Suspense, useEffect, useRef, useState} from "react";
import styles from './studentForm.module.scss'
import {InputTypeEnum} from "../../../../shared/input/InputTypeEnum";
import {MenuItem, TextField} from "@mui/material";
import {GetStudentFormStructure} from "../../../../utils/studentFormStruct/GetStudentFormStructure";
import {useForm} from "react-hook-form";
import ButtonComponent from "../../../../shared/button/ButtonComponent";
import {createStudent} from "../../../../actions/student";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../../../router/routes";
import {PathsEnum} from "../../../../router/pathsEnum";
import {App, Modal, notification} from "antd";
import {dateTextFieldStyle, textFieldStyle} from "../../../../shared/theme/styles";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import {InternationalInfoEnum} from "../../../../enums/enrollmentEnum";
import {StudentSectionFormInterface} from "../../../../utils/studentFormStruct/interfaces/StudentFormFieldInterface";
import FieldBlockComponent from "../fieldBlock/FieldBlockComponent";
import {CurrentEducationTypeEnum} from "../../../../enums/currentEducation/currentEducationTypeEnum";
import {GetEnumLatinKeyByValue} from "../../../../utils/GetEnumLatinKeyByValue";
import {createStudentFileStruct} from "../../../../actions/file";
import {OutlineFileIcon} from "../../../../assets/Icons";
import SpinComponent from "../../../../shared/spin/SpinComponent";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {append} from "../../../../features/file/fileSlice";
import {addNewValue, initialStudentState, setCurrentStudent} from "../../../../features/student/studentSlice";
import {NotificationInstance} from "antd/es/notification/interface";
import {GetNotificationArgs} from "../../../../utils/notificationArgs";

const studentStructure = GetStudentFormStructure()

const removeEmptyFields = (data: any) => {
    Object.keys(data).forEach(key => {
        if (data[key] === '' || data[key] == null) {
            delete data[key];
        }
    });
}

interface InputProps {
    educationType: CurrentEducationTypeEnum,
}

const CreateFileModalComponent = lazy(() => import('../../../modals/fileModal/createStudent/CreateFileModalComponent'))
const CreateStudentFormComponent = ({educationType}: InputProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isFileModalOpen, setIsFileModalOpen] = useState(false)

    const navigate = useNavigate()
    const formData = useSelector((state: RootState) => state.file)
    const { notification } = App.useApp()

    const studentState = useSelector((state: RootState) => state.student)
    const dispatch = useDispatch()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault();
        dispatch(setCurrentStudent({
            ...studentState,
            current_education: {
                ...studentState.current_education,
                type: GetEnumLatinKeyByValue(CurrentEducationTypeEnum, educationType),
                educational_program_id: '819a707c-2636-11ef-bf10-50ebf6992398',
                educational_programs: undefined
            },
            old_education: {
                ...studentState.old_education,
                graduation_year: studentState.old_education?.graduation_year ? +studentState.old_education?.graduation_year : undefined,
            },
            contact: {
                student_id: undefined
            }
            /*payment: {
                ...studentState.payment,
                contract_amount: studentState.payment?.contract_amount ? +studentState.payment?.contract_amount : undefined,
                student_payments: {
                    ...studentState.payment!.student_payments,
                    amount: studentState.payment?.student_payments!.amount ? +studentState.payment?.student_payments!.amount : undefined,
                }
            }*/
        }))
        createStudent(studentState)
            .then((res) => {
                const student = res.data.student as StudentInterface
                dispatch(append({
                    key: 'latin_name',
                    value: student.latin_name
                }))
                createStudentFileStruct(formData, student.id as string)
                    .then((res) => {
                        notification.open(GetNotificationArgs({
                            message: 'Студент успешно создан',
                            type: "success",
                        }))
                        setIsLoading(false)
                        setTimeout(() => {
                            navigate(PathsEnum.MAIN)
                        }, 1000)
                    })
            })
            .catch((e) => {
                notification.open(GetNotificationArgs({
                    message: `Ошибка сервера ${e.message}`,
                    type: "error",
                }))
                setIsLoading(false)
            })
    }
    return (
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <section className={styles.grid}>
                <div className={styles.column}>
                    {studentStructure.leftSideFields().map((section) => {
                        if (section.permission === 'Общий' || section.permission === educationType)
                            return <FieldBlockComponent
                                key={section.key}
                                educationType={educationType}
                                section={section}
                            />
                    })}
                </div>
                <div className={styles.column}>
                    {studentStructure.rightSideFields().map((section) => {
                        if (section.permission === 'Общий' || section.permission === educationType)
                            return <FieldBlockComponent
                                key={section.key}
                                educationType={educationType}
                                section={section}
                            />
                    })}
                </div>
            </section>
            {isFileModalOpen &&
                <Suspense fallback={<SpinComponent isLoading={false}/>}>
                    <CreateFileModalComponent open={isFileModalOpen} setOpen={setIsFileModalOpen}
                                              student_id={studentState.id}/>
                </Suspense>
            }
            <div className={styles.button}>
                <OutlineFileIcon
                    className={styles.file}
                    onClick={() => setIsFileModalOpen(prevState => !prevState)}
                />
                <ButtonComponent
                    isLoading={isLoading}
                    textStyles={{fontSize: '16px'}}
                    buttonStyles={{width: '20%'}}
                    text={'Сохранить'}/>
            </div>
        </form>
    )
}

export default CreateStudentFormComponent