import React from "react";
import styles from './actionComponent.module.scss'
import ButtonComponent from "../../../shared/button/ButtonComponent";
import {IconPlus} from "../../../assets/Icons";

const ActionComponent = () => {
    return <div className={styles.block}>
        <ButtonComponent
            text={'Добавить студента'}
            path={''}
            icon={<IconPlus
                width={35}
                height={35}
                color={'#fff'}
            />}
            buttonStyles={{width: 'fit-content', height: 40, padding: '12px 12px'}}
            textStyles={{fontSize: 14}}
        />
        <nav className={styles.actions}>
            <button>
                <p>
                    Фильтрация
                </p>
            </button>
            <button>
                <p>
                    Поиск
                </p>
            </button>
        </nav>
    </div>
}

export default ActionComponent