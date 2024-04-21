import React from "react";
import styles from './inputComponent.module.scss'
import {InputPropsInterface} from "./interfaces/inputPropsInterface";
import {GetPlaceholder} from "./utils";

const InputComponent = (props: InputPropsInterface) => {
    return (
        <>
            <input
                className={styles.header}
                type={props.type}
                placeholder={GetPlaceholder(props.type, props.fieldName)}
                {...props.register(props.fieldName, { required: true })}
            />
        </>
    )
}

export default InputComponent