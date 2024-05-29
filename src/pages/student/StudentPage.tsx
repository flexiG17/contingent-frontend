import React, {SetStateAction, useState} from "react";
import styles from './student.module.scss'
import Layout from "../../components/layout/Layout";
import MainComponent from "../../components/main/MainComponent";
import StudentComponent from "../../components/student/StudentComponent";

const StudentPage = () => {
    return (
        <Layout>
            <StudentComponent/>
        </Layout>
    )
}

export default StudentPage