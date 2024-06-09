import React, {SetStateAction, useEffect, useState} from "react";
import styles from './studentCardPage.module.scss'
import Layout from "../../../components/layout/Layout";
import MainComponent from "../../../components/main/MainComponent";
import CreateStudentComponent from "../../../components/student/create/CreateStudentComponent";
import StudentCardComponent from "../../../components/student/card/StudentCardComponent";
import {useParams} from "react-router-dom";
import {getStudentById} from "../../../actions/student";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {initialStudentState, setCurrentStudent} from "../../../features/student/studentSlice";
import {StudentInterface} from "../../../interfaces/student/StudentInterface";
import {getAllFilesByStudentId} from "../../../actions/file";

const StudentCardPage = () => {
    const student_id = useParams().id as string
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    const fetchData = () => {
        getStudentById(student_id)
            .then((student: StudentInterface) => {
                dispatch(setCurrentStudent(student))
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
            })
    }
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Layout>
            <StudentCardComponent
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </Layout>
    )
}

export default StudentCardPage