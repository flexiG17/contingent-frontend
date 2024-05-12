import React, {ReactNode, useEffect, useState} from 'react'
import styles from './createStudent.module.scss'
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

const CreateStudentComponent = () => {
    const [educationType, setEducationType] = useState<'Контракт' | 'Квота'>('Контракт')
    const [isLoading, setIsLoading] = useState(false)
    const [studentData, setStudentData] = useState<any[]>([{
        russian_name: '',
        birth_date: new Date()
    }])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const params = useParams().id!
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
        api['success']({
            message: 'Студент удалён',
        });
    };

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
    const navigate = useNavigate()
    const handleDeleteStudent = () => {
        setIsDeleteModalOpen(false)
        setIsLoading(true)
        removeArray([studentData[0].id] as React.Key[])
            .then((data) => {
                openNotificationWithIcon()
                setTimeout(() => {
                    navigate(PathsEnum.MAIN)
                }, 1500)
            })
            .finally(() => setIsLoading(false))
    }

    const isEditMode = studentData[0].russian_name != ''
    const [isDisabledField, setIsDisabledFiels] = useState(isEditMode ? true: false)
    const [fileOpen, setFileOpen] = useState(false)

    const actions =
        [
            {
                icon: <OutlineFileIcon className={styles.icon}/>,
                name: 'Файлы студента',
                runFunction: () => {
                    setFileOpen(true)
                }
            },
            {
                icon: <IconMail className={styles.icon} fill={'rgb(0,0,0,0)'}/>,
                name: 'Написать письмо',
                runFunction: () => {
                }
            },
            {
                icon: <IconDelete className={styles.icon} fill={'rgb(0,0,0,0)'}/>,
                name: 'Удалить студента',
                runFunction: () => {
                    setIsDeleteModalOpen(true)
                }
            },
            {
                icon: <EditIcon className={styles.icon}/>,
                name: 'Редактировать карточку',
                runFunction: () => {
                    setIsDisabledFiels(prevState => !prevState)
                }
            }]

    return (
        <>
            {contextHolder}
            <Modal
                style={{marginTop: '300px'}}
                title="Удаление файла" open={isDeleteModalOpen} onOk={handleDeleteStudent}
                onCancel={() => setIsDeleteModalOpen(false)}>
                Вы уверены, что хотите студента <strong>{studentData[0].russian_name}</strong>?
            </Modal>
            <FileModalComponent id={params} open={fileOpen} setOpen={setFileOpen}/>
            {isLoading
                ?
                <SpinComponent isLoading={isLoading}/>
                :
                <div className={styles.grid}>
                    <div className={styles.inline}>
                        <h1 className={styles.title}>
                            {
                                !isEditMode
                                    ?
                                    'Добавить студента'
                                    :
                                    // @ts-ignore
                                    studentData[0].latin_name
                            }
                        </h1>
                        {!isEditMode && <ConfigProvider
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
                    {isEditMode && !fileOpen &&
                        <SpeedDial
                            ariaLabel="SpeedDial openIcon example"
                            sx={{position: 'fixed', bottom: 20, right: 20}}
                            icon={<SpeedDialIcon/>}
                            FabProps={{
                                sx: {
                                    bgcolor: variables.primaryColor,
                                    '&:hover': {
                                        bgcolor: variables.primaryColor,
                                    }
                                }
                            }}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={() => {
                                        action.runFunction()
                                    }}
                                />
                            ))}
                        </SpeedDial>}
                </div>}
        </>
    )
}

export default CreateStudentComponent