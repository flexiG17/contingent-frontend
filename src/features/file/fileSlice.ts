import {createSlice} from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: 'file',
    initialState: new FormData(),
    reducers: {
        append: (state, action) => {
            state.append(action.payload.key, action.payload.value)
            return state
        },
        clean: (state) => {
            state = new FormData()
            return state
        },
    },
})

export const { append, clean } = fileSlice.actions
export default fileSlice.reducer