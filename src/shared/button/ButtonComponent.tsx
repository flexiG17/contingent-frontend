import React from "react";
import styles from './buttonComponent.module.scss'
import {Link, useNavigate} from "react-router-dom";

const ButtonComponent = ({text, path}: { text: string, path: string }) => {

    return (
        /*<Link to={path} className={styles.button}>
            <p className={styles.button_text}>
                {text}
            </p>
        </Link>*/
        <button className={styles.button} type='submit'>
            <p className={styles.button_text}>
                {text}
            </p>
        </button>
    )
}

export default ButtonComponent