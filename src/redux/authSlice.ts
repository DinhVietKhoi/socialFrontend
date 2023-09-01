import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User{
    token: string;
    userNew: {
        _id: string;
        fullname: string;
        username: string;
        about: string;
        avatar: string;
        coverPicture: string;
        listImage: string[]
        following: [];
        followers: [];
        friends: [];
        friendRequests: [];
        createdAt: Date;
    }
}
interface UserState {
    login: {
        isFetching: boolean;
        user: User|null,
        isAuthenticated: boolean
    }
}
const initialState: UserState = {
    login: {
        isFetching: false,
        user: null,
        isAuthenticated: false
    }
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loading: (state) => {
            state.login.isFetching = true;
        },
        
        finish: (state) => {
            state.login.isFetching = false;
        },
        logOut: (state) => {
            state.login.user = null;
            state.login.isAuthenticated = false;
        },
        logIn: (state, action: PayloadAction<any>) => {
            state.login.user = action.payload;
            state.login.isAuthenticated = true;
        },
        udAvatar: (state, action: PayloadAction<any>) => {
            if (state.login.user !== null) {
                state.login.user.userNew.avatar = action.payload
                state.login.user.userNew.listImage =[...state.login.user.userNew.listImage,action.payload] 
            }
        },
        udCoverPicture
        : (state, action: PayloadAction<any>) => {
            if (state.login.user !== null) {
                state.login.user.userNew.coverPicture = action.payload
                state.login.user.userNew.listImage =[...state.login.user.userNew.listImage,action.payload] 
            }
        },
        udAbout: (state, action: PayloadAction<any>) => {
            if (state.login.user !== null) {
                state.login.user.userNew.about = action.payload;
            }
        }
    },
});


export const {logOut, logIn, udAvatar, udAbout, udCoverPicture,finish,loading } = authSlice.actions;
export default authSlice.reducer;