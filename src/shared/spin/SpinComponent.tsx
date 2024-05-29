import React from "react";
import {ConfigProvider, Spin} from "antd";
import variables from '../theme/_variables.module.scss'

const SpinComponent = ({isLoading} : {isLoading?: boolean}) => {
    return <ConfigProvider
        theme={{
            token: {
                colorPrimary: variables.primaryColor
            }
        }}
    >
        <Spin spinning={isLoading}/>
    </ConfigProvider>
}

export default SpinComponent