import axios from "axios";
import React from "react";
import { getToken } from "../utils/const";
export const getStudents = () => {
    return axios.get(`http://localhost:5000/api/student/`, {
        headers: {Authorization: getToken()}
    }).then(resp => resp.data)
}

export const createStudent = async (data: any) => {
    return await axios.post(`http://localhost:5000/api/student/create`, data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data;'
        },
    })
}

export const removeArray = (data: React.Key[]) => {
    console.log(data);
    return axios.delete(`http://localhost:5000/api/student/removeStudents`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: data
    })
}

export const getStudentsByIdArray = (idArray: any[]) => {
    return axios.post(`http://localhost:5000/api/student/getStudents`, idArray, {
        headers: {
            'Authorization': getToken()
        },
    }).then(resp => resp.data)
}

export const createXlsx = async (item: any[]) => {
    return await axios.post(`http://localhost:5000/api/student/download/xlsx`, item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        responseType: 'blob'
    })
}

export const getColumns = () => {
    return axios.get(`http://localhost:5000/api/student/columns`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}

export const sendMessage = async (data: any) => {
    return await axios.post(`http://localhost:5000/api/mail/sendStudent`, data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data'
        },
    })
}