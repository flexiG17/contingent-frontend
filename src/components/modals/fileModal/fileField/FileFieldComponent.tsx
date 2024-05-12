import React, {useState} from 'react'
import {fileSizes} from '../../../../utils/const';
import styles from './file.module.scss'
import {IconDelete, IconExport, OutlineFileIcon} from "../../../../assets/Icons";
import {deleteFile, downloadFile} from "../../../../actions/file";
import variables from '../../../../shared/theme/_variables.module.scss'
import {ConfigProvider, Modal, notification} from "antd";

const FileFieldComponent = ({key, file}: any) => {const [active, setActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
        api['success']({
            message: 'Файл удален',
        });
    };

    const calculateFileSize = (fSize: any) => {
        if (fSize === null || fSize === undefined) {
            return null;
        }
        let tmp = fSize;
        let size = 0;

        while (tmp >= 1024) {
            tmp /= 1024;
            size++;
        }

        // @ts-ignore
        return `${tmp.toFixed(1)} ${fileSizes[size]}`
    }

    const handleMouseOver = () => {
        if (file.type !== 'dir') {
            setActive(true);
        }
    };

    const handleDeleteFile = () => {
        setIsOpen(false)
        deleteFile(file.id)
            .then((data) => {
                openNotificationWithIcon()
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            })
    }

    const handleDownloadFile = () => {
        downloadFile(file.id)
            .then((response) => {
                let url = window.URL.createObjectURL(response.data);
                let a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', file.name);

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
    }

    return (
        <>
            {contextHolder}
            <div className={styles.file} onMouseOver={handleMouseOver}
                 onMouseOut={() => setActive(false)}>
                {
                    !active ?
                        <>
                            <div className={styles.icon_file}>
                                <OutlineFileIcon className={styles.file_icon}/>
                            </div>
                            <div>
                                <p className={styles.text}>
                                    {file.name}
                                </p>
                            </div>
                            <div className={styles.file_date}>
                                <p className={styles.text}>
                                    {new Date(file.date.slice(0, 10)).toLocaleDateString()}
                                </p>
                            </div>
                            <div className={styles.file_size}>
                                <p className={styles.text}>
                                    {calculateFileSize(file.size)}
                                </p>
                            </div>
                        </>
                        :
                        <>
                            <div className={styles.icon_file}>
                                <OutlineFileIcon className={styles.file_icon}/>
                            </div>
                            <div>
                                <p className={styles.text}>
                                    {file.name}
                                </p>
                            </div>
                            <div className={styles.file_date}
                                 onClick={(e) => {
                                     e.stopPropagation()
                                     handleDownloadFile()}}
                            >
                                <IconExport fill={'rgb(0, 0, 0, 0)'} className={styles.file_icon}/>
                            </div>
                            <div className={styles.file_size} onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(true);
                            }}>
                                <IconDelete fill={'rgb(0, 0, 0, 0)'} className={styles.file_icon}/>
                            </div>
                        </>
                }
            </div>
            <Modal
                style={{marginTop: '300px'}}
                title="Удаление файла" open={isOpen} onOk={handleDeleteFile} onCancel={() => setIsOpen(false)}>
                Вы уверены, что хотите удалить файл <strong>{file.name}</strong>?
            </Modal>
        </>
    )
}

export default FileFieldComponent