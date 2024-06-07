import React, {SetStateAction, useState} from "react";
import styles from './createStudentPage.module.scss'
import Layout from "../../../components/layout/Layout";
import MainComponent from "../../../components/main/MainComponent";
import CreateStudentComponent from "../../../components/student/create/CreateStudentComponent";

const CreateStudentPage = () => {
    return (
        <Layout>
            <CreateStudentComponent/>
        </Layout>
    )
}

export default CreateStudentPage