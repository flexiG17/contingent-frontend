import React, {useState} from 'react'
import styles from './loginPage.module.scss'
import LoginForm from "../../components/login/LoginForm";
import MainLogo from '../../assets/main_logo.svg'
import {useForm} from "react-hook-form";
import {LoginType} from "./LoginType";

const LoginPage = () => {
    const {register, handleSubmit} = useForm();
    const [data, setData] = useState<LoginType>({
        email: '',
        password: ''
    });

    return (
        <section className={styles.grid}>
            <div className={styles.header}>
                <img src={MainLogo} alt='Главное лого' width={250} height={180}/>
                <LoginForm setData={setData} register={register} handleSubmit={handleSubmit}/>
            </div>
        </section>
    )
}

export default LoginPage