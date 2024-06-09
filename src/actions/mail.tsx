import {MailInterface} from "../components/modals/mailModal/inetrface/mailInterface";
import axios from "axios";
import {TOKEN} from "./student";

export const sendMessage = async (data: MailInterface) => {
    return await axios.post(`http://localhost:5000/system/sendStudent`, data, {
        headers: {
            'Authorization': TOKEN,
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
}