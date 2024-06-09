import React from "react";
import styles from './actionComponent.module.scss'
import ButtonComponent from "../../../shared/button/ButtonComponent";
import {IconPlus} from "../../../assets/Icons";
import {PathsEnum} from "../../../router/pathsEnum";
import FilterComponent from "../../filter/FilterComponent";
import InputComponent from "../../../shared/input/InputComponent";
import {InputTypeEnum} from "../../../shared/input/InputTypeEnum";
import {PageInterface} from "../../../interfaces/table/PageInterface";
import {StudentInterface} from "../../../interfaces/student/StudentInterface";
import SetStudentDataProps from "../../../pages/main/SetStudentDataInterface";
import TableSearchComponent from "./tableSearch/TableSearchComponent";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";

const ActionComponent = () => {

    const studentListState = useSelector((state: RootState) => state.studentList)
    const dispatch = useDispatch()

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
            <FilterComponent/>
            {/*<button>
                <p>
                    Поиск
                </p>
            </button>
            <TableSearchComponent/>*/}
        </nav>
    </div>
}

export default ActionComponent