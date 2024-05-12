import React from "react";
import styles from './startPage.module.scss'
import MainLogo from '../../assets/main_logo.svg'
import ButtonComponent from "../../shared/button/ButtonComponent";
import {PathsEnum} from "../../router/pathsEnum";
const StartPage = () => {
    return (
        <section className={styles.grid}>
            <div className={styles.grid_block}>
                <div className={styles.grid_leftBlock}>
                    <h1>
                        Добро пожаловать!
                    </h1>
                    <p>
                        Чтобы продолжить работу, пожалуйста, авторизуйтесь
                    </p>
                </div>
                <div className={styles.grid_rightBlock}>
                    <img src={MainLogo} alt='Основное лого'/>
                    <p className={styles.grid_rightBlock_text}>
                        Вход ПОдИУ УрФУ
                    </p>
                    <ButtonComponent text={'Войти'} navigatePath={PathsEnum.LOGIN}/>
                </div>
            </div>
        </section>
    )
}

export default StartPage