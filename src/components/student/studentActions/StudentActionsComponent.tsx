import React, {Dispatch, SetStateAction, useState, lazy, Suspense} from "react";
import styles from './studentActions.module.scss'
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import variables from "../../../shared/theme/_variables.module.scss";
import {EditIcon, IconDelete, IconMail, IconPlus, OutlineFileIcon} from "../../../assets/Icons";
import {removeArray} from "../../../actions/student";
import {PathsEnum} from "../../../router/pathsEnum";
import {StudentInterface} from "../../../features/student/studentInterface";
import {notification, App} from "antd";
import {useNavigate} from "react-router-dom";
import SpinComponent from "../../../shared/spin/SpinComponent";
import SubmitModalComponent from "../../../shared/submitModal/SubmitModalComponent";
import {GetNotificationArgs} from "../../../utils/notificationArgs";

interface InputProps {
    studentData: StudentInterface,
    setIsDisabledFields: Dispatch<SetStateAction<boolean>>,
    isEditMode: boolean
}

const FileModalComponent = lazy(() => import('../../modals/fileModal/FileModalComponent'))

const StudentActionsComponent = (props: InputProps) => {
    const [fileOpen, setFileOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const { notification } = App.useApp()
    const navigate = useNavigate()
    const handleDeleteStudent = () => {
        setIsDeleteModalOpen(false)
        removeArray([props.studentData.id] as React.Key[])
            .then((data) => {
                notification.open(GetNotificationArgs({
                    message: 'Студен удалён',
                    type: "success"
                }))
                setTimeout(() => {
                    navigate(PathsEnum.MAIN)
                }, 1500)
            })
            .catch(() => {
                notification.open(GetNotificationArgs({
                    message: 'Студен удалён',
                    type: "error"
                }))
            })
    }

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
                    props.setIsDisabledFields(prevState => !prevState)
                    notification.open(GetNotificationArgs({
                        message: 'Настроен режим редактирования',
                        type: "success"
                    }))
                }
            }
        ]

    return (
        <>
            {fileOpen &&
                <Suspense fallback={<SpinComponent isLoading={true}/>}>
                    <FileModalComponent open={fileOpen} setOpen={setFileOpen} id={props.studentData.id}/>
                </Suspense>
            }
            {isDeleteModalOpen &&
                <SubmitModalComponent
                    isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen}
                    title={'Удаление студента'}
                    action={handleDeleteStudent}
                    text={
                        <span>Вы уверены, что хотите удалить <strong>{props.studentData.russian_name}</strong>?</span>
                }/>
            }
            {/*{contextHolder}*/}
            {!fileOpen &&
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
        </>
    )
}

export default StudentActionsComponent