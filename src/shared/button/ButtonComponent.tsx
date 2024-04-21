import React from "react";
import styles from './buttonComponent.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {ButtonInterface} from "./interfaces/buttonInterface";

const ButtonComponent = ({text, path, icon, buttonStyles, textStyles}: ButtonInterface) => {

    return (
        /*<Link to={path} className={styles.button}>
            <p className={styles.button_text}>
                {text}
            </p>
        </Link>*/
        <button
            className={styles.button}
            type='submit'
            style={{...buttonStyles}}
        >
            <p
                className={styles.button_text}
                style={{...textStyles}}
            >
                {text}
            </p>
            {icon}
        </button>
    )
}

export default ButtonComponent