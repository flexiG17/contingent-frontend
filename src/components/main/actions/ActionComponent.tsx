import React from "react";
import styles from './actionComponent.module.scss'
import ButtonComponent from "../../../shared/button/ButtonComponent";
import {IconPlus} from "../../../assets/Icons";
import {PathsEnum} from "../../../router/pathsEnum";
import FilterComponent from "../../filter/FilterComponent";
import InputComponent from "../../../shared/input/InputComponent";
import {InputTypeEnum} from "../../../shared/input/InputTypeEnum";

interface InputProps {
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>,
}
const ActionComponent = ({data, setData} : InputProps) => {
    return <div className={styles.block}>
        <ButtonComponent
            text={'Добавить студента'}
            icon={<IconPlus
                width={35}
                height={35}
                color={'#fff'}
            />}
            navigatePath={PathsEnum.CREATE_STUDENT}
            buttonStyles={{width: 'fit-content', height: 40, padding: '12px 12px'}}
            textStyles={{fontSize: 14}}
        />
        <nav className={styles.actions}>
            <FilterComponent data={data} setData={setData}/>
            <button>
                <p>
                    Поиск
                </p>
            </button>
        </nav>
    </div>
}

export default ActionComponent