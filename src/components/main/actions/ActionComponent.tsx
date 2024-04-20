import React from "react";
import styles from './actionComponent.module.scss'
import ButtonComponent from "../../../shared/button/ButtonComponent";

const ActionComponent = () => {
    return <div className={styles.block}>
        <ButtonComponent text={'Добавить студента'} path={''}/>
        Фильтрация
        Поиск
        Программа
    </div>
}

export default ActionComponent