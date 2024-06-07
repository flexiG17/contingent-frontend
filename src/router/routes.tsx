import {createBrowserRouter} from "react-router-dom";
import StartPage from "../pages/start/StartPage";
import {PathsEnum} from "./pathsEnum";
import LoginPage from "../pages/login/LoginPage";
import MainPage from "../pages/main/MainPage";
import StudentCardPage from "../pages/student/card/StudentCardPage";
import CreateStudentPage from "../pages/student/create/CreateStudentPage";

export const Routes = createBrowserRouter([
    {
        path: PathsEnum.START,
        element: <StartPage/>
    },
    {
        path: PathsEnum.LOGIN,
        element: <LoginPage/>
    },
    {
        path: PathsEnum.MAIN,
        element: <MainPage/>
    },
    {
        path: PathsEnum.CREATE_STUDENT,
        element: <CreateStudentPage/>
    },
    {
        path: `${PathsEnum.STUDENT_CARD}/:id`,
        element: <StudentCardPage/>
    },
])