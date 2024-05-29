import React, {ReactNode, useEffect, useState} from 'react'
import styles from './studentComponent.module.scss'
import {ConfigProvider, Modal, notification, Segmented} from "antd";
import variables from "../../shared/theme/_variables.module.scss";
import StudentFormComponent from "./form/StudentFormComponent";
import {useNavigate, useParams} from "react-router-dom";
import {getStudentsByIdArray, removeArray} from "../../actions/student";
import SpinComponent from "../../shared/spin/SpinComponent";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {EditIcon, IconDelete, IconFile, IconMail, OutlineFileIcon} from "../../assets/Icons";
import ModalWindow from "../../shared/modal/ModalWindow";
import FileModalComponent from "../modals/fileModal/FileModalComponent";
import {PathsEnum} from "../../router/pathsEnum";
import StudentActionsComponent from "./studentActions/StudentActionsComponent";

const StudentComponent = () => {
    const [educationType, setEducationType] = useState<'Контракт' | 'Квота'>('Контракт')
    const [isLoading, setIsLoading] = useState(false)
    const [studentData, setStudentData] = useState<any[]>([{
        russian_name: '',
        birth_date: new Date()
    }])
    const params = useParams().id!

    let isStudentCard = Boolean(params)
    const [isDisabledField, setIsDisabledFields] = useState(isStudentCard)

    useEffect(() => {
        if (params) {
            setIsLoading(true)
            getStudentsByIdArray(Array(params))
                .then((data) => {
                    setStudentData(data)
                })
                .finally(() => setIsLoading(false))
        }
    }, [])

    return (
        <>
            {isLoading
                ?
                <SpinComponent isLoading={isLoading}/>
                :
                <div className={styles.grid}>
                    <div className={styles.inline}>
                        <h1 className={styles.title}>
                            {
                                isStudentCard
                                    ?
                                    studentData[0].latin_name
                                    :
                                    'Добавить студента'
                            }
                        </h1>
                        {isStudentCard
                            ?
                            <>
                            </>
                            :
                            <ConfigProvider
                                theme={{
                                    token: {
                                        controlHeight: 18,
                                        fontSize: 16,
                                    },
                                    components: {
                                        Segmented: {
                                            itemActiveBg: variables.backgroundColor,
                                            itemHoverBg: variables.backgroundColorHover,
                                            itemSelectedBg: variables.primaryColor,
                                            itemSelectedColor: '#fff',
                                            trackBg: '#fff',
                                            trackPadding: 10,
                                        }
                                    }
                                }}
                            >
                                <Segmented
                                    className={styles.select}
                                    options={['Контракт', 'Квота']}
                                    onChange={(value: 'Контракт' | 'Квота') => {
                                        setEducationType(value)
                                    }}
                                />
                            </ConfigProvider>}
                    </div>

                    <StudentFormComponent isDisabledField={isDisabledField} educationType={educationType}
                                          studentData={studentData}/>

                    {isStudentCard && <StudentActionsComponent
                        studentData={studentData[0]}
                        setIsDisabledFields={setIsDisabledFields}
                        isEditMode={isDisabledField}/>}
                </div>}
        </>
    )
}

export default StudentComponent