import React, {Dispatch, SetStateAction, useState} from 'react'
import styles from './file.module.scss'
import {IconDelete, IconExport, OutlineFileIcon} from "../../../../../assets/Icons";
import variables from '../../../../../shared/theme/_variables.module.scss'
import {ConfigProvider, Modal, notification} from "antd";
import {CalculateFileSize} from "../../utils/CalculateFileSize";
function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}
interface InputProps {
    sectionKey: any,
    file: File,
}
const FileFieldComponent = (props: InputProps) => {
    const forceUpdate = useForceUpdate();

    return (
        <>
            <div className={styles.file}>
                <div className={styles.icon_file}>
                    <IconDelete
                        fill={'rgb(0, 0, 0, 0)'}
                        className={styles.file_icon}
                        onClick={() => {
                            // removeFileHandler(props.file.name, props.sectionKey)
                            forceUpdate()
                        }}
                    />
                    <p className={styles.text}>
                        {props.file.name}
                    </p>
                </div>
                <div className={styles.file_size}>
                    <p className={styles.file_size_text}>
                        {CalculateFileSize(props.file.size)}
                    </p>
                </div>
            </div>
        </>
    )
}

export default FileFieldComponent