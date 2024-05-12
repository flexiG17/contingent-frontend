import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
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

export const { login } = userSlice.actions
export default userSlice.reducer