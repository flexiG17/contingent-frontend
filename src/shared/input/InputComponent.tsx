import React from "react";
import styles from './inputComponent.module.scss'
import {InputPropsInterface} from "./interfaces/inputPropsInterface";
import {GetPlaceholder} from "./utils";

const InputComponent = (props: InputPropsInterface) => {
    //{...props.register(props.fieldName, { required: true })}
    return (
        <>
            <input
                className={styles.header}
                type={props.type}
                placeholder={GetPlaceholder(props.type, props.fieldName)}

            />
        </>
    )
}

export default InputComponent