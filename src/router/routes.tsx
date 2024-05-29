import {createBrowserRouter} from "react-router-dom";
import StartPage from "../pages/start/StartPage";
import {PathsEnum} from "./pathsEnum";
import LoginPage from "../pages/login/LoginPage";
import MainPage from "../pages/main/MainPage";
import StudentPage from "../pages/student/StudentPage";

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
        element: <StudentPage/>
    },
    {
        path: `${PathsEnum.STUDENT}/:id`,
        element: <StudentPage/>
    },
])