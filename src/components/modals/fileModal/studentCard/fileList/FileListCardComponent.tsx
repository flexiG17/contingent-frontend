import React, {useEffect, useState} from "react";
import styles from './fileList.module.scss'
import FileFieldCardComponent from "../fileField/FileFieldCardComponent";
import {useParams} from "react-router-dom";
import {IconPlus} from "../../../../../assets/Icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {append, clean} from "../../../../../features/file/fileSlice";
import {FileInterface} from "../interfaces/FileInterface";
import {FilesSectionsEnum} from "../../enums/FilesSectionsEnum";

const FileSections = Object.values(FilesSectionsEnum).filter((v) => isNaN(Number(v))) as FilesSectionsEnum[]
const GetFilesArrayFromFormData = (formData: FormData) => {
    const array: any[] = [];
    formData.forEach((value, key) =>
        array.push({
            key: key,
            value: value as File
        })
    )

    return array
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

const FileListComponent = ({files}: {files: FileInterface[]}) => {
    const [section, setSection] = useState<FilesSectionsEnum>()

    return (
        <div className={styles.file_list}>
            {
                FileSections.map((fileSection) => {
                        return <div key={fileSection} className={styles.section_block}>
                            <div className={styles.title_position}>
                                <label htmlFor="disk_upload_id" style={{paddingTop: '5px'}}>
                                    <IconPlus
                                        onClick={() => setSection(fileSection)}
                                        className={styles.title_position_icon}
                                    />
                                </label>
                                <h3>{fileSection}</h3>
                                <input type="file" id="disk_upload_id" style={{display: "none"}}
                                       onChange={(event) => {
                                       }}
                                       multiple={true}/>
                            </div>
                            {files.map((file) => {
                                if (file.section === fileSection) {
                                    return <FileFieldCardComponent
                                        file={file}
                                    />
                                }
                            })}
                        </div>
                    }
                )
            }
        </div>
    )
}

export default FileListComponent