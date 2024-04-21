import React, {ReactNode} from "react";

export interface ButtonInterface {
    text: string,
    path: string,
    icon?: ReactNode,
    buttonStyles?: React.CSSProperties;
    textStyles?: React.CSSProperties;
}