import {createSlice} from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: 'file',
    initialState: {
        email: '',
        password: ''
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
        },
    },
})

export const { login } = fileSlice.actions
export default fileSlice.reducer