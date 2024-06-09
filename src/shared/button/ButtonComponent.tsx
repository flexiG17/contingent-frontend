import React from "react";
import styles from './buttonComponent.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {ButtonInterface} from "./interfaces/buttonInterface";
import {Spin} from "antd";
import SpinComponent from "../spin/SpinComponent";

const ButtonComponent = ({text, icon, buttonStyles, textStyles, navigatePath, isLoading, isSubmit= true, disabled}: ButtonInterface) => {
    const navigate = useNavigate();

    return (
        <button
            className={styles.button}
            disabled={isLoading || disabled}
            style={{...buttonStyles}}
            onClick={() => {
                navigate(navigatePath!)
            }}
        >
            {isLoading
                ?
                <SpinComponent isLoading={isLoading}/>
                :
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <p
                        className={styles.button_text}
                        style={{...textStyles}}
                    >
                        {text}
                    </p>
                    {icon}
                </div>
            }
        </button>
    )
}

export default ButtonComponent