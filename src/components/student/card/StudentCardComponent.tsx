import React, {Dispatch, SetStateAction, useState} from 'react'
import styles from './studentCard.module.scss'
import StudentCardFormComponent from "./form/StudentCardFormComponent";
import SpinComponent from "../../../shared/spin/SpinComponent";
import StudentActionsComponent from "../card/actions/StudentActionsComponent";
import {StudentInterface} from "../../../interfaces/student/StudentInterface";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {CurrentEducationTypeEnum} from "../../../enums/currentEducationTypeEnum";

interface InputProps {
    studentData: StudentInterface,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
}

const StudentCardComponent = ({studentData, isLoading, setIsLoading}: InputProps) => {
    const [isDisabledField, setIsDisabledFields] = useState(true)

    return (
        <>
            {isLoading
                ?
                <SpinComponent isLoading={isLoading}/>
                :
                <div className={styles.grid}>
                    <div className={styles.inline}>
                        <h1 className={styles.title}>
                            {studentData.latin_name}
                        </h1>
                    </div>

                    <StudentActionsComponent
                        studentData={studentData}
                        setIsDisabledFields={setIsDisabledFields}
                        isEditMode={isDisabledField}
                    />

                    <StudentCardFormComponent isDisabledField={isDisabledField}
                                              studentData={studentData}/>
                </div>}
        </>
    )
}

export default StudentCardComponent