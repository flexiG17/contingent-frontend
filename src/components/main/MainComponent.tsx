import React, {useState} from "react";
import ActionComponent from "./actions/ActionComponent";
import TableComponent from "./table/TableComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const MainComponent = () => {
    const [data, setData] = useState<any[]>([])

    return <>
        <ActionComponent data={data} setData={setData}/>
        <TableComponent data={data} setData={setData}/>
    </>
}

export default MainComponent