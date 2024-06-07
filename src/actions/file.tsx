import axios from "axios";
import {TOKEN} from "./student";


export const createStudentFileStruct = async (files: FormData, student_id: string) => {
    return axios.post(`http://localhost:5000/file/create/${student_id}`, files, {
        headers: {
            Authorization: TOKEN,
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const getAllFilesByStudentId = async (student_id: string) => {
     const response = await axios.get(`http://localhost:5000/file/student/${student_id}`, {
        headers: {
            Authorization: TOKEN,
        },
    })

    return response.data
}

export const getOneFileById = async (file_id: string) => {
    return await axios.get(`http://localhost:5000/file/single/${file_id}`, {
        headers: {
            Authorization: TOKEN,
            responseType: 'blob'
        },
    })
}
/*
export const uploadFiles = async (files: any) => {
    return axios.post(`http://localhost:5000/api/files/upload`, files, {
        headers: {
            'Authorization': TOKEN,
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const getFiles = async (id: string) => {
    let resp = await axios.get(`http://localhost:5000/api/files/?student_id=${id}`, {
        headers: {Authorization: TOKEN}
    });
    return await resp.data;
}

export const deleteFile = async (id: string) => {
    return await axios.delete(`http://localhost:5000/api/files`, {
        headers: {
            'Authorization': TOKEN,
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: [id]
    })
}

export const downloadFile = async (fileId: string) => {
    return await axios.get(`http://localhost:5000/api/files/download?id=${fileId}`, {
        headers: {
            'Authorization': TOKEN,
            'Content-Type': 'application/json;charset=utf-8'
        },
        responseType: 'blob'
    });
}*/
