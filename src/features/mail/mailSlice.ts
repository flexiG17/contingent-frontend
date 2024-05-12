import {createSlice} from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'mail',
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

export const { login } = mailSlice.actions
export default mailSlice.reducer