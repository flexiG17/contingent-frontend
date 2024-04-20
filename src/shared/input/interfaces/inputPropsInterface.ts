import {InputTypeEnum} from "../InputTypeEnum";
import {UseFormRegister} from "react-hook-form";

export interface InputPropsInterface {
    type: InputTypeEnum;
    fieldName: string;
    register: UseFormRegister<any>
}