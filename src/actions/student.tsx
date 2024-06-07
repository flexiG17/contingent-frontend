import axios from "axios";
import React from "react";
import {getToken} from "../utils/const";
import {PageInterface} from "../interfaces/table/PageInterface";
import {StudentInterface} from "../interfaces/student/StudentInterface";

export const TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmYTYzNTZlLTdkZDAtNDdmMS05NjMzLTUxZjk4N2ZiZTY1NSIsIm5hbWUiOiLQmtC-0LbQtdCy0L3QuNC60L7QsiDQkNGA0YHQtdC90LjQuSIsImVtYWlsIjoic3NAbWFpbC5ydSIsInJvbGUiOiJBZG1pbiIsImNyZWF0ZWRfYXQiOiIyMDI0LTA2LTA3VDA4OjUzOjExLjk4NloiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNi0wN1QwODo1MzoxMS45ODZaIiwiaWF0IjoxNzE3NzUwNDIxfQ.Jce-4228zGOwyQ6NTT65JBiI0OFUg1ZHUKXm9UcgWwU`

export const getStudents = async (page: number, take: number, params?: Record<string, string | Date>): Promise<PageInterface<StudentInterface>> => {
    let resp = await axios.get(`http://localhost:5000/student?page=${page}&take=${take}`, {
        headers: {Authorization: TOKEN},
        params
    });
    return resp.data
}

export const createStudent = async (data: StudentInterface) => {
    return await axios.post(`http://localhost:5000/student`, data, {
        headers: {
            'Authorization': TOKEN,
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
}

export const getStudentById = async (student_id: string | React.Key)=> {
    let response = await axios.get(`http://localhost:5000/student/${student_id}`, {
        headers: {
            Authorization: TOKEN,
        },
    })
    return response.data
}

export const updateStudentData = async (data: StudentInterface) => {
    let response = await axios.patch(`http://localhost:5000/student/${data.id}`, data, {
        headers: {
            'Authorization': TOKEN,
            'Content-Type': 'application/json;charset=utf-8'
        },
    })

    return response.data
}

export const getFilterStruct = () => {
    return axios.get(`http://localhost:5000/system/filter/struct`, {
        headers: {
            'Authorization': TOKEN,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}
/*
export const removeArray = (data: React.Key[]) => {
    return axios.delete(`http://localhost:5000/api/student/removeStudents`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: data
    })
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

export const sendMessage = async (data: any) => {
    return await axios.post(`http://localhost:5000/api/mail/sendStudent`, data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data'
        },
    })
*/
