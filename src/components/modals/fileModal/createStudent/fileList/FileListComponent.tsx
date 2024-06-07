import React, {useEffect, useState} from "react";
import styles from './fileList.module.scss'
import FileFieldComponent from "../fileField/FileFieldComponent";
import {useParams} from "react-router-dom";
import {IconPlus} from "../../../../../assets/Icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {append, clean} from "../../../../../features/file/fileSlice";

const FileSections = ['Passport', 'Visa', 'Payment', 'Housing', 'Default']
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

const FileListComponent = ({student_id}: { student_id: string }) => {
    const [section, setSection] = useState<string>('')
    const forceUpdate = useForceUpdate();

    const formData = useSelector((state: RootState) => state.file)
    const dispatch = useDispatch()
    const removeFileHandler = (fileNameToDelete: string, fileSectionToDelete: string) => {
        const filesArray = GetFilesArrayFromFormData(formData)
        const filteredArray = filesArray.filter((filed) => {
            return fileSectionToDelete === filed.key && fileNameToDelete !== filed.value.name
        })
        dispatch(clean())
        Object.values(filteredArray).map(field => {
            formData.append(field.key, field.value)
        })
    }
    const uploadFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        Object.values(event.target.files!).map(file => {
            dispatch(append({
                key: section,
                value: file
            }))
        })
    }

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
                                           uploadFileHandler(event)
                                           forceUpdate()
                                       }}
                                       multiple={true}/>
                            </div>
                            {GetFilesArrayFromFormData(formData).map((field) => {
                                if (field.key === fileSection) {
                                    return <FileFieldComponent
                                        sectionKey={field.key}
                                        file={field.value}
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