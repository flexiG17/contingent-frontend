import {PageInterface} from "../../interfaces/table/PageInterface";
import {StudentInterface} from "../../interfaces/student/StudentInterface";
import React from "react";

export default interface SetStudentDataProps {
    data: PageInterface<StudentInterface>,
    setData: React.Dispatch<React.SetStateAction<PageInterface<StudentInterface>>>,
}