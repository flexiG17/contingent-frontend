import axios from "axios";

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoic3NAbWFpbC5ydSIsIm5hbWUiOiLQmtC-0LbQtdCy0L3QuNC60L7QsiDQkNGA0YHQtdC90LjQuSIsInJvbGUiOiLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgCIsImlhdCI6MTcxNTQ5NjM5MH0.eKd26xOl1EIKauMl5G_T6f_v0r3EMZ0H_KTHwQUlZIg'
export const uploadFiles = async (files: any) => {
    return axios.post(`http://localhost:5000/api/files/upload`, files, {
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const getFiles = async (id: string) => {
    let resp = await axios.get(`http://localhost:5000/api/files/?student_id=${id}`, {
        headers: {Authorization: token}
    });
    return await resp.data;
}

export const deleteFile = async (id: string) => {
    return await axios.delete(`http://localhost:5000/api/files`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: [id]
    })
}

export const downloadFile = async (fileId: string) => {
    return await axios.get(`http://localhost:5000/api/files/download?id=${fileId}`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        responseType: 'blob'
    });
}