import React, {useState} from 'react'
import styles from './file.module.scss'
import {
    DownloadIcon,
    IconDelete,
    IconExport,
    MoreInfoIcon,
    OutlineDeleteIcon,
    OutlineFileIcon
} from "../../../../../assets/Icons";
import variables from '../../../../../shared/theme/_variables.module.scss'
import {App, Button, notification, Popover} from "antd";
import {CalculateFileSize} from "../../utils/CalculateFileSize";
import {FileInterface} from "../interfaces/FileInterface";
import {getOneFileById} from "../../../../../actions/file";
import {GetNotificationArgs} from "../../../../../utils/notificationArgs";

const FileFieldCardComponent = ({file}: { file: FileInterface }) => {
    const moreInfo = (
        <div className={styles.metadata}>
            <div className={styles.metadata_row}>
                <h5 className={styles.metadata_row_title}>Кто создал</h5>
                <p className={styles.metadata_row_text}>
                    {file.user.name}
                </p>
            </div>
            <div className={styles.metadata_row}>
                <h5 className={styles.metadata_row_title}>Дата создания</h5>
                <p className={styles.metadata_row_text}>
                    {new Date(file.created_at).toLocaleDateString()}
                </p>
            </div>
            <div className={styles.metadata_row}>
                <h5 className={styles.metadata_row_title}>Время создания</h5>
                <p className={styles.metadata_row_text}>
                    {new Date(file.created_at).toLocaleTimeString()}
                </p>
            </div>
            <div className={styles.metadata_row}>
                <h5 className={styles.metadata_row_title}>Раздел</h5>
                <p className={styles.metadata_row_text}>
                    {file.section}
                </p>
            </div>
            <div className={`${styles.metadata_row} ${styles.metadata_row_size}`}>
                <h5 className={styles.metadata_row_title}>Размер</h5>
                <p className={styles.metadata_row_text}>
                    {CalculateFileSize(file.size)}
                </p>
            </div>
        </div>
    )

    /*const handleDeleteFile = () => {
        setIsOpen(false)
        deleteFile(file.id)
            .then((data) => {
                openNotificationWithIcon()
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            })
    }*/

    // ИЗМЕНИТЬ -- загружаются битые файлы
    const handleDownloadFile = () => {
        getOneFileById(file.id)
            .then((fileToDownload) => {
                let url = window.URL.createObjectURL(fileToDownload);
                let a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', file.name);

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
    }
    const { notification } = App.useApp()
    const handleDeleteFile = () => {
        notification.open(GetNotificationArgs({
            message: 'Удаление файлов отключено во избежании их потери',
            type: "error",
        }))
    }

    return (
        <>
            <div className={styles.file}>
                <div className={styles.icon_with_name_position}>
                    <OutlineFileIcon className={styles.file_icon}/>
                    <p className={styles.text}>
                        {file.name}
                    </p>
                </div>

                <div className={styles.file_size}>
                    <p className={styles.text}>
                        {CalculateFileSize(file.size)}
                    </p>
                </div>
                <div className={styles.actions_position}>
                    <DownloadIcon
                        className={`${styles.file_action_icon} ${styles.file_action_icon_download}`}
                        onClick={() => {
                            handleDownloadFile()
                        }}
                    />
                    <OutlineDeleteIcon
                        className={`${styles.file_action_icon} ${styles.file_action_icon_download}`}
                        onClick={() => {
                            handleDeleteFile()
                        }}
                    />
                    <Popover placement="topRight" title={<span>Дополнительная информация</span>} content={moreInfo}>
                        <MoreInfoIcon className={styles.file_action_icon}/>
                    </Popover>
                </div>
            </div>
        </>
    )
}

export default FileFieldCardComponent