import React, {ReactNode} from "react";
import styles from './modalWindow.module.scss'
import {Modal} from "antd";

interface InputProps {
    children: ReactNode,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalWindow = ({children, open, setOpen}: InputProps) => {
    return (
        <Modal
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={900}
            footer={<></>}
        >
            {children}
        </Modal>
    )
}

export default ModalWindow