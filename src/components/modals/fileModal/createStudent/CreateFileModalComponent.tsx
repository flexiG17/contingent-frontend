import React, {Key, ReactNode, useEffect, useState} from "react";
import styles from './createFileModal.module.scss'
import ModalWindow from "../../../../shared/modal/ModalWindow";
import FileFieldComponent from "./fileField/FileFieldComponent";
import FileListComponent from "./fileList/FileListComponent";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import SpinComponent from "../../../../shared/spin/SpinComponent";
import {notification} from "antd";

interface InputProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    student_id: string | Key
}
const CreateFileModalComponent = (props: InputProps) => {
    const params = useParams().id!

    return (
        <ModalWindow width={500} open={props.open} setOpen={props.setOpen}>
            <div className={styles.disk}>
                <h1>Добавить файлы студенту</h1>
                <FileListComponent student_id={props.student_id as string}/>
            </div>
        </ModalWindow>
    )
}

export default CreateFileModalComponent