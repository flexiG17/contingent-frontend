import React, {Dispatch, SetStateAction, useState, lazy, Suspense} from "react";
import styles from './studentActions.module.scss'
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import variables from "../../../../shared/theme/_variables.module.scss";
import {EditIcon, IconDelete, IconMail, OutlineFileIcon} from "../../../../assets/Icons";
import {PathsEnum} from "../../../../router/pathsEnum";
import {notification, App} from "antd";
import {useNavigate} from "react-router-dom";
import SpinComponent from "../../../../shared/spin/SpinComponent";
import SubmitModalComponent from "../../../../shared/submitModal/SubmitModalComponent";
import {GetNotificationArgs} from "../../../../utils/notificationArgs";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";

interface InputProps {
    setIsDisabledFields: Dispatch<SetStateAction<boolean>>,
    isEditMode: boolean
}

const CardFileModalComponent = lazy(() => import('../../../modals/fileModal/studentCard/CardFileModalComponent'))

const StudentActionsComponent = (props: InputProps) => {
    const [fileOpen, setFileOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const { notification } = App.useApp()
    const navigate = useNavigate()
    const handleDeleteStudent = () => {
        setIsDeleteModalOpen(false)
    }

    const studentState = useSelector((state: RootState) => state.student)
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
                        type: "success",
                        placement: 'top'
                    }))
                }
            }
        ]

    return (
        <>
            {fileOpen &&
                <Suspense fallback={<SpinComponent isLoading={true}/>}>
                    <CardFileModalComponent open={fileOpen} setOpen={setFileOpen} student_id={studentState.id}/>
                </Suspense>
            }
            {isDeleteModalOpen &&
                <SubmitModalComponent
                    isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen}
                    title={'Удаление студента'}
                    action={handleDeleteStudent}
                    text={
                        <span>Вы уверены, что хотите удалить <strong>{studentState.russian_name}</strong>?</span>
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