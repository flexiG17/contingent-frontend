import React, {Dispatch, lazy, SetStateAction, Suspense, useEffect, useRef, useState} from "react";
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
import {Modal, notification} from "antd";
import {dateTextFieldStyle, textFieldStyle} from "../../../../shared/theme/styles";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import {InternationalInfoEnum} from "../../../../enums/enrollmentEnum";
import {StudentSectionFormInterface} from "../../../../utils/studentFormStruct/interfaces/StudentFormFieldInterface";
import FieldBlockComponent from "../fieldBlock/FieldBlockComponent";
import {CurrentEducationTypeEnum} from "../../../../enums/currentEducationTypeEnum";
import {GetEnumLatinKeyByValue} from "../../../../utils/GetEnumLatinKeyByValue";
import {createStudentFileStruct} from "../../../../actions/file";
import {OutlineFileIcon} from "../../../../assets/Icons";
import SpinComponent from "../../../../shared/spin/SpinComponent";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {append} from "../../../../features/file/fileSlice";

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
    studentData: StudentInterface,
    setStudentData: Dispatch<SetStateAction<StudentInterface>>,
}

const CreateFileModalComponent = lazy(() => import('../../../modals/fileModal/createStudent/CreateFileModalComponent'))
const CreateStudentFormComponent = ({educationType, studentData, setStudentData}: InputProps) => {
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false)
    const [isFileModalOpen, setIsFileModalOpen] = useState(false)

    const openNotificationWithIcon = () => {
        api['success']({
            message: 'Студент создан',
        });
    };

    const navigate = useNavigate()
    const formData = useSelector((state: RootState) => state.file)
    const dispatch = useDispatch()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //setIsLoading(true)
        event.preventDefault();
        studentData = {
            ...studentData,
            current_education: {
                type: GetEnumLatinKeyByValue(CurrentEducationTypeEnum, educationType)
            },
            payment: {
                ...studentData.payment,
                contract_amount: studentData.payment?.contract_amount ? +studentData.payment?.contract_amount : undefined,
            }
        }
        createStudent(studentData)
            .then((res) => {
                const student = res.data.student as StudentInterface
                dispatch(append({
                    key: 'latin_name',
                    value: student.latin_name
                }))
                createStudentFileStruct(formData, student.id as string)
                    .then((res) => {
                    })
            })
            .catch((res) => {
            })
        /*const currentForm = formRef.current
        if (currentForm === null) return

        let dataToSave = new FormData(currentForm);
        const objectData: object = Object.fromEntries(dataToSave)
        removeEmptyFields(objectData)
        objectData.date_creation = new Date()
        objectData.education_type = educationType*/
        /*createStudent(objectData)
            .then((data) => {
                openNotificationWithIcon()
                setTimeout(() => {
                    if (data.status === 201)
                        navigate(PathsEnum.MAIN)
                }, 1500)
            })
            .finally(() => {
                setIsLoading(false)
            })*/
    }
    return (
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
            {contextHolder}
            <section className={styles.grid}>
                <div className={styles.column}>
                    {studentStructure.leftSideFields().map((section) => {
                        if (section.permission === 'Общий' || section.permission === educationType)
                            return <FieldBlockComponent
                                key={section.key}
                                setStudentData={setStudentData}
                                studentData={studentData}
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
                                setStudentData={setStudentData}
                                studentData={studentData}
                                educationType={educationType}
                                section={section}
                            />
                    })}
                </div>
            </section>
            {isFileModalOpen &&
                <Suspense fallback={<SpinComponent isLoading={true}/>}>
                    <CreateFileModalComponent open={isFileModalOpen} setOpen={setIsFileModalOpen}
                                              student_id={studentData.id}/>
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