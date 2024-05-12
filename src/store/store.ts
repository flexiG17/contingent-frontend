import { configureStore } from '@reduxjs/toolkit'
import studentReducer from '../features/student/studentSlice'
import userReducer from '../features/user/userSlice'
import tableReducer from '../features/table/tableSlice'
import fileReducer from '../features/file/fileSlice'
import mailReducer from '../features/mail/mailSlice'

export const store = configureStore({
    reducer: {
        student: studentReducer,
        user: userReducer,
        table: tableReducer,
        mail: mailReducer,
        file: fileReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch