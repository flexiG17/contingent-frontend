import {ArgsProps} from "antd/es/notification/interface";
import * as React from "react";
import variables from "../shared/theme/_variables.module.scss";

interface InputProps extends ArgsProps {
    type: 'success' | 'error'
}

export const GetNotificationArgs = (props: InputProps): ArgsProps => {
    // const icon = props.type === 'success' ? <>галочка</> : <>крестик</>
    const style: React.CSSProperties = {
        background: props.type === 'success' ? variables.backgroundColor : variables.backgroundColorHover
    }

    return {
        ...props,
        placement: 'top',
        message: props.message,
        duration: 2,
        // icon,
        style,
    }
}