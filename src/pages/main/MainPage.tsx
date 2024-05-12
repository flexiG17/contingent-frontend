import React, {SetStateAction, useState} from "react";
import styles from './mainPage.module.scss'
import Layout from "../../components/layout/Layout";
import MainComponent from "../../components/main/MainComponent";

const MainPage = () => {
    return (
        <Layout>
            <MainComponent/>
        </Layout>
    )
}

export default MainPage