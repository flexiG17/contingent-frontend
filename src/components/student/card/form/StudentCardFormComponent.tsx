import React, {useEffect, useRef, useState} from "react";
import styles from './studentForm.module.scss'
import {useNavigate} from "react-router-dom";
import {notification} from "antd";
import {InputTypeEnum} from "../../../../shared/input/InputTypeEnum";
import ButtonComponent from "../../../../shared/button/ButtonComponent";
import {GetStudentFormStructure} from "../../../../utils/studentFormStruct/GetStudentFormStructure";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import FieldCardBlockComponent from "../fieldCardBlock/FieldCardBlockComponent";
import {CurrentEducationTypeEnum} from "../../../../enums/currentEducationTypeEnum";
import {GetEnumValueByKey} from "../../../../utils/GetEnumValueByKey";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {updateStudentData} from "../../../../actions/student";

const studentStructure = GetStudentFormStructure()

const removeEmptyFields = (data: any) => {
    Object.keys(data).forEach(key => {
        if (data[key] === '' || data[key] == null) {
            delete data[key];
        }
    });
}

const StudentCardFormComponent = ({studentData, isDisabledField}: {
    studentData: StudentInterface,
    isDisabledField: boolean
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [educationType, setEducationType] = useState<CurrentEducationTypeEnum>(CurrentEducationTypeEnum.Contract)

    useEffect(() => {
        setEducationType(GetEnumValueByKey(CurrentEducationTypeEnum, studentData.current_education!.type!))
    }, []);

    const studentState = useSelector((state: RootState) => state.student)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // setIsLoading(true)
        event.preventDefault();

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
                setIsLoading(false)
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
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <section className={styles.grid}>
                <div className={styles.column}>
                    {studentStructure.leftSideFields().map((section) => {
                        if (section.permission === 'Общий' || section.permission === educationType)
                            return <FieldCardBlockComponent
                                key={section.key}
                                fieldData={section.key === 'main' ? {
                                    latin_name: studentData.latin_name,
                                    russian_name: studentData.russian_name
                                }: studentData[section.key]}
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
                                    latin_name: studentData.latin_name,
                                    russian_name: studentData.russian_name
                                }: studentData[section.key]}
                                // studentData={studentData}
                                educationType={educationType!}
                                section={section}
                                isDisabledField={isDisabledField}
                            />
                    })}
                </div>
            </section>
            {/*{isFileModalOpen &&
                <Suspense fallback={<SpinComponent isLoading={true}/>}>
                    <CreateFileModalComponent open={isFileModalOpen} setOpen={setIsFileModalOpen}
                                              student_id={studentData.id}/>
                </Suspense>
            }*/}
            <div className={styles.button}>
                {/*<OutlineFileIcon
                    className={styles.file}
                    onClick={() => setIsFileModalOpen(prevState => !prevState)}
                />*/}
                <ButtonComponent
                    isLoading={isLoading}
                    textStyles={{fontSize: '16px'}}
                    buttonStyles={{width: '20%'}}
                    text={'Сохранить'}/>
            </div>
        </form>
    )
}

export default StudentCardFormComponent