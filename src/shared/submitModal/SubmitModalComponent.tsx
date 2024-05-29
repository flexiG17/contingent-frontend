import React, {Dispatch, ReactNode, SetStateAction} from 'react'
import {ConfigProvider, Modal} from "antd";
import variables from "../../shared/theme/_variables.module.scss";
import ButtonComponent from "../button/ButtonComponent";
import styles from './submitModal.module.scss'

interface InputProps {
    isDeleteModalOpen: boolean,
    title: string,
    setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
    action: () => void,
    text: ReactNode
}

const SubmitModalComponent = (props: InputProps) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimaryBorder: 'red'
                }
            }}
        >
            <Modal
                style={{top: '40%', display: 'flex'}}
                title={props.title} open={props.isDeleteModalOpen} onOk={props.action}
                onCancel={() => props.setIsDeleteModalOpen(false)}
                cancelText={'Отмена'}
            >
                {props.text}
            </Modal>
        </ConfigProvider>
    )
}

export default SubmitModalComponent