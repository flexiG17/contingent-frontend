import React, {ReactNode} from "react";
import {PathsEnum} from "../../../router/pathsEnum";

export interface ButtonInterface {
    text: string,
    navigatePath?: string,
    icon?: ReactNode,
    buttonStyles?: React.CSSProperties;
    textStyles?: React.CSSProperties;
    action?: () => void;
    isLoading?: boolean
}