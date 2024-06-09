import React, {ReactNode, useEffect, useState} from 'react'
import styles from './createStudent.module.scss'
import {ConfigProvider, Modal, notification, Segmented} from "antd";
import variables from "../../../shared/theme/_variables.module.scss";
import CreateStudentFormComponent from "./form/CreateStudentFormComponent";
import {useNavigate, useParams} from "react-router-dom";
import SpinComponent from "../../../shared/spin/SpinComponent";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {EditIcon, IconDelete, IconFile, IconMail, OutlineFileIcon} from "../../../assets/Icons";
import ModalWindow from "../../../shared/modal/ModalWindow";
import CardFileModalComponent from "../../modals/fileModal/studentCard/CardFileModalComponent";
import {PathsEnum} from "../../../router/pathsEnum";
import StudentActionsComponent from "../card/actions/StudentActionsComponent";
import {StudentInterface} from "../../../interfaces/student/StudentInterface";
import {initialStudentState} from "../../../features/student/studentSlice";
import {CurrentEducationTypeEnum} from "../../../enums/currentEducation/currentEducationTypeEnum";

const CreateStudentComponent = () => {
    const [educationType, setEducationType] = useState<CurrentEducationTypeEnum>(CurrentEducationTypeEnum.Contract)

    return (
        <div className={styles.grid}>
            <div className={styles.inline}>
                <h1 className={styles.title}>
                    Добавить студента
                </h1>
                <ConfigProvider
                    theme={{
                        token: {
                            controlHeight: 18,
                            fontSize: 16,
                        },
                        components: {
                            Segmented: {
                                itemActiveBg: variables.backgroundColor,
                                itemHoverBg: variables.backgroundColorHover,
                                itemSelectedBg: variables.primaryColor,
                                itemSelectedColor: '#fff',
                                trackBg: '#fff',
                                trackPadding: 10,
                            }
                        }
                    }}
                >
                    <Segmented
                        className={styles.select}
                        options={[CurrentEducationTypeEnum.Contract, CurrentEducationTypeEnum.Quota]}
                        onChange={(value: CurrentEducationTypeEnum) => {
                            setEducationType(value)
                        }}
                    />
                </ConfigProvider>
            </div>

            <CreateStudentFormComponent
                educationType={educationType}
            />
        </div>
    )
}

export default CreateStudentComponent