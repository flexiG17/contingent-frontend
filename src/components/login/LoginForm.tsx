import React, {useState} from "react";
import ButtonComponent from "../../shared/button/ButtonComponent";
import styles from './loginForm.module.scss'
import InputComponent from "../../shared/input/InputComponent";
import {InputTypeEnum} from "../../shared/input/InputTypeEnum";
import {IconWarningOutline} from "../../assets/Icons";
import {UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import {LoginType} from "../../pages/login/LoginType";

const LoginForm = ({setData, register, handleSubmit}: {
    setData: React.Dispatch<React.SetStateAction<LoginType>>,
    register: UseFormRegister<any>,
    handleSubmit: UseFormHandleSubmit<any>
}) => {
    return (
        <form onSubmit={handleSubmit((data) => setData(data))} className={styles.grid}>
            <h3> Email </h3>
            <InputComponent register={register} type={InputTypeEnum.EMAIL} fieldName={'email'}/>
            <h3> Пароль </h3>
            {/*добавить возможность просмотреть введенный пароль*/}
            <InputComponent register={register} type={InputTypeEnum.PASSWORD} fieldName={'password'}/>
            <div className={styles.infoBlock}>
                <div className={styles.infoBlock_inside}>
                    <IconWarningOutline width={50} height={50} color={'#FA7A45'}/>
                    <p> Нет аккаунта? Запросите регистрацию у администратора.</p>
                </div>
            </div>
            <div className={styles.grid_button}>
                <ButtonComponent text={'Войти'} path={'main'}/>
            </div>
        </form>
    )
}

export default LoginForm