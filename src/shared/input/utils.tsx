import {InputTypeEnum} from "./InputTypeEnum";

export const GetPlaceholder = (type: InputTypeEnum, fieldName?: string): string => {
    let placeHolder = 'Введите свой '
    switch (type) {
        case InputTypeEnum.EMAIL:
            placeHolder += InputTypeEnum.EMAIL;
            break;
        case InputTypeEnum.PASSWORD:
            placeHolder += 'пароль';
            break;
        case InputTypeEnum.TEXT:
            placeHolder += fieldName;
            break;
        case InputTypeEnum.DATE:
            placeHolder += 'дд.мм.гггг';
            break;
    }

    return placeHolder
}