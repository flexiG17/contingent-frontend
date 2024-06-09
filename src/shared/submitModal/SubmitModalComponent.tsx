import React, {Dispatch, ReactNode, SetStateAction} from 'react'
import {ConfigProvider, Modal} from "antd";
import variables from "../../shared/theme/_variables.module.scss";
import ButtonComponent from "../button/ButtonComponent";
import styles from './submitModal.module.scss'

interface InputProps {
    isDeleteModalOpen: boolean,
    title: string,
    setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
    action: (e?: any) => void,
    text: ReactNode
}

const SubmitModalComponent = (props: InputProps) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        titleColor: variables.primaryColor
                    }
                },
                token: {
                    colorPrimaryBorder: 'red'
                }
            }}
        >
            <Modal
                style={{top: '40%', display: 'flex'}}
                title={props.title} open={props.isDeleteModalOpen}
                onOk={() => {
                    props.action()
                    props.setIsDeleteModalOpen(false)
                }}
                onCancel={() => props.setIsDeleteModalOpen(false)}
                cancelText={'Отмена'}
            >
                {props.text}
            </Modal>
        </ConfigProvider>
    )
}

export default SubmitModalComponent