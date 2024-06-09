import React, {SetStateAction, useState} from 'react'
import styles from './tableHeaderComponent.module.scss'
import variables from "../../../../../src/shared/theme/_variables.module.scss";
import {IconDelete, IconExport, IconFile, IconMail, IconPlus} from "../../../../assets/Icons";
import ButtonComponent from "../../../../shared/button/ButtonComponent";
import {set} from "react-hook-form";
import {App, notification} from "antd";
import MailModalComponent from "../../../modals/mailModal/MailModalComponent";
import {PageInterface} from "../../../../interfaces/table/PageInterface";
import {StudentInterface} from "../../../../interfaces/student/StudentInterface";
import {archiveStudent, exportStudentList} from "../../../../actions/student";
import {GetNotificationArgs} from "../../../../utils/notificationArgs";

interface InputProps {
    selectedRowKeys: React.Key[],
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    usersList: StudentInterface[]
}
const TableHeaderComponent = ({selectedRowKeys, setIsLoading, isLoading, usersList}: InputProps) => {
    const isSelected = selectedRowKeys.length > 0
    const [isOpenMailModal, setIsOpenMailModal] = useState(false)

    const { notification } = App.useApp()
    const handleDeleteStudents = () => {
        setIsLoading(true)
        archiveStudent(selectedRowKeys[0].toString())
            .then((response) => {
                setIsLoading(false)
                notification.open(GetNotificationArgs({
                    message: 'Студент успешно архивирован',
                    type: "success",
                }))
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch((e) => {
                setIsLoading(false)
                notification.open(GetNotificationArgs({
                    message: `Ошибка сервера ${e.message}`,
                    type: "error",
                }))
            })
    }

    const handleDownload = () => {
        setIsLoading(true)
        exportStudentList(selectedRowKeys)
            .then((file) => {
                let url = window.URL.createObjectURL(file);
                let a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', `Выгрузка от ${new Date().toLocaleDateString()}.xlsx`);

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                setIsLoading(false)
            })
        /*createXlsx(selectedRowKeys)
            .then(response => {
                let url = window.URL.createObjectURL(response.data);
                let a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', `Выгрузка от ${new Date().toLocaleDateString()}.xlsx`);

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .finally(() => {
                setIsLoading(false)
            })*/
    }

    const handleOpenMail = () => {
        setIsOpenMailModal(true)
    }

    return (
        <section
            className={styles.grid}
            style={isSelected ? {background: variables.backgroundColor} : {}}
        >
            <MailModalComponent selectedRowKeys={selectedRowKeys} open={isOpenMailModal} setOpen={setIsOpenMailModal} studentsList={usersList}/>
            {isSelected
                ?
                <div className={styles.block}>
                    <span>
                    {`${selectedRowKeys.length} выбрано`}
                    </span>
                    <div className={styles.block_icons}>
                        <IconMail className={styles.icon} onClick={handleOpenMail}/>
                        <IconExport className={styles.icon} onClick={handleDownload}/>
                        <IconDelete className={styles.icon} onClick={handleDeleteStudents}/>
                    </div>
                </div>
                :
                <div className={styles.import_button}>
                    <ButtonComponent
                        text={'Выбрать файл'}
                        icon={<IconFile
                            width={18}
                            height={22}
                            color={'#fff'}
                        />}
                        buttonStyles={{width: 'fit-content', height: 35, padding: '10px 15px'}}
                        textStyles={{fontSize: 14, fontWeight: 400}}/>
                </div>
            }
        </section>
    )
}

export default TableHeaderComponent