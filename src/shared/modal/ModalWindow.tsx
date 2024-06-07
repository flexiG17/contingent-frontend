import React, {ReactNode} from "react";
import styles from './modalWindow.module.scss'
import {Modal} from "antd";

interface InputProps {
    children: ReactNode,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    width?: string | number
}

const ModalWindow = ({children, open, setOpen, width= 900}: InputProps) => {
    return (
        <Modal
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={width}
            footer={<></>}
        >
            {children}
        </Modal>
    )
}

export default ModalWindow