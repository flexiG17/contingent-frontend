import React, {useEffect, useState} from "react";
import styles from './fileList.module.scss'
import FileFieldComponent from "../fileField/FileFieldComponent";
import {useParams} from "react-router-dom";
import {getFiles} from "../../../../actions/file";

const FileListComponent = ({files}: { files: any[] }) => {

    return (
        <div className={styles.file_list}>
            <div className={styles.file_list_header}>
                <div className={styles.file_list_name}>
                    <p>
                        Название
                    </p>
                </div>
                <div className={styles.file_list_date}>
                    <p>
                        Дата
                    </p>
                </div>
                <div className={styles.file_list_size}>
                    <p>
                        Размер
                    </p>
                </div>
            </div>
            {files.map(file => <FileFieldComponent key={file.id} file={file}/>)}
        </div>
    )
}

export default FileListComponent