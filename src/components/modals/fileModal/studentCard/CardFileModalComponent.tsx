import React, {Key, ReactNode, useEffect, useState} from "react";
import styles from './cardFileModal.module.scss'
import ModalWindow from "../../../../shared/modal/ModalWindow";
import FileFieldCardComponent from "./fileField/FileFieldCardComponent";
import FileListComponent from "./fileList/FileListCardComponent";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import SpinComponent from "../../../../shared/spin/SpinComponent";
import {notification} from "antd";
import {getAllFilesByStudentId} from "../../../../actions/file";
import FileListCardComponent from "./fileList/FileListCardComponent";
import {FileInterface} from "./interfaces/FileInterface";

interface InputProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    student_id: string | Key
}
const CardFileModalComponent = (props: InputProps) => {
    const student_id = useParams().id!
    const [isLoading, setIsLoading] = useState(true)
    const [studentFiles, setStudentFiles] = useState<FileInterface[]>([])

    const fetchData = () => {
        getAllFilesByStudentId(student_id)
            .then((files: FileInterface[]) => {
                setStudentFiles(files)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        fetchData()
    }, [])

    /*const uploadFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        // @ts-ignore
        const files = [...event.target.files];
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        formData.append('student_id', props.student_id as string);
        uploadFiles(formData)
            .then((data) => {
                openNotificationWithIcon()
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
                files.push(data.data[0])
            })
            .finally(() => setIsLoading(false))
    }*/

    return (
        <ModalWindow width={700} open={props.open} setOpen={props.setOpen}>
            <div className={styles.disk}>
                <h1>Просмотр файлов студента</h1>
                <FileListCardComponent files={studentFiles}/>
            </div>
        </ModalWindow>
    )
}

export default CardFileModalComponent