import React, {Dispatch, SetStateAction, useState} from 'react'
import styles from './studentCard.module.scss'
import StudentCardFormComponent from "./form/StudentCardFormComponent";
import SpinComponent from "../../../shared/spin/SpinComponent";
import StudentActionsComponent from "../card/actions/StudentActionsComponent";
import {StudentInterface} from "../../../interfaces/student/StudentInterface";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {CurrentEducationTypeEnum} from "../../../enums/currentEducation/currentEducationTypeEnum";

interface InputProps {
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
}

const StudentCardComponent = ({isLoading, setIsLoading}: InputProps) => {
    const [isDisabledField, setIsDisabledFields] = useState(true)
    const studentState = useSelector((state: RootState) => state.student)

    return (
        <>
            {isLoading
                ?
                <SpinComponent isLoading={isLoading}/>
                :
                <div className={styles.grid}>
                    <div className={styles.inline}>
                        <h1 className={styles.title}>
                            {studentState.latin_name}
                        </h1>
                    </div>

                    <StudentActionsComponent
                        setIsDisabledFields={setIsDisabledFields}
                        isEditMode={isDisabledField}
                    />

                    <StudentCardFormComponent isDisabledField={isDisabledField}/>
                </div>}
        </>
    )
}

export default StudentCardComponent