import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import postReducer from './postSlice'
import userSlice from './userSlice';
export const store =  configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;