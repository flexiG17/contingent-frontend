import {createBrowserRouter} from "react-router-dom";
import StartPage from "../pages/start/StartPage";
import {Paths} from "./paths";
import LoginPage from "../pages/login/LoginPage";
import MainPage from "../pages/main/MainPage";

export const Routes = createBrowserRouter([
    {
        path: Paths.START,
        element: <StartPage/>
    },
    {
        path: Paths.LOGIN,
        element: <LoginPage/>
    },
    {
        path: Paths.MAIN,
        element: <MainPage/>
    },
])