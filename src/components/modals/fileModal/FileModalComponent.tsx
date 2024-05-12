import React, {ReactNode, useEffect, useState} from "react";
import styles from './fileModal.module.scss'
import ModalWindow from "../../../shared/modal/ModalWindow";
import FileFieldComponent from "./fileField/FileFieldComponent";
import FileListComponent from "./fileList/FileListComponent";
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFiles} from "../../../actions/file";
import {useParams} from "react-router-dom";
import SpinComponent from "../../../shared/spin/SpinComponent";
import {notification} from "antd";

interface InputProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
}

const FileModalComponent = (props: InputProps) => {
    const params = useParams().id!
    const [files, setFiles] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
        api['success']({
            message: 'Файлы успешно загружены',
        });
    };

    const fetchData = () => {
        getFiles(params)
            .then((data) => {
                setFiles(data)
            })
            .catch(() => {

            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        setIsLoading(true)
        fetchData()
    }, [])

    const uploadFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        // @ts-ignore
        const files = [...event.target.files];
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        formData.append('student_id', props.id);
        uploadFiles(formData)
            .then((data) => {
                openNotificationWithIcon()
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
                files.push(data.data[0])
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <ModalWindow open={props.open} setOpen={props.setOpen}>
            {contextHolder}
            <div className={styles.disk}>
                <div className={styles.disk_btns}>
                    <div className={styles.disk_style_btns}>
                        <label htmlFor="disk_upload_id">Загрузить файлы</label>
                        <input type="file" id="disk_upload_id" style={{display: "none"}}
                               onChange={uploadFileHandler}
                               multiple={true}/>
                    </div>
                </div>
                {isLoading
                    ?
                    <SpinComponent isLoading={isLoading}/>
                    :
                    <FileListComponent files={files}/>}
                {
                    // active && <ModalDirectory active={active} setActive={setActive} studentId={studentId}/>
                }
            </div>
        </ModalWindow>
    )
}

export default FileModalComponent