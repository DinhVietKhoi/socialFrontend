import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface User{
    token: string;
    userNew: {
        _id: string;
        fullname: string;
        username: string;
        about: string;
        avatar: string;
        listImage: string[]
        following: string[];
        followers: string[];
        friends: [];
        friendRequests: [];
        createdAt: Date;
    }
}
interface UserState {
    isFetching: boolean;
    allUser: User[];
    userCurrent: User | null;
    usersSearch: User[]
}
const initialState: UserState = {
    isFetching: false,
    allUser: [],
    userCurrent: null,
    usersSearch:[]
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isFetchingSuccessUser: (state) => {
            state.isFetching = false;
        },
        isFetchingLoadingUser: (state) => {
            state.isFetching = true;
        },
        getUserById: (state, action: PayloadAction<any>) => {
            state.userCurrent = action.payload
        },
        resetUser: (state) => {
            state.userCurrent = null;
        },
        updatefollow: (state, action: PayloadAction<any>) => {
            if (state.userCurrent !== null) {
                state.userCurrent.userNew.followers = action.payload
            }
        },
        searchUsers: (state, action: PayloadAction<any>) => { 
            state.usersSearch = []
            state.usersSearch = action.payload
        }
    }
})
export const {
    resetUser,
    getUserById,
    isFetchingSuccessUser,
    isFetchingLoadingUser,
    updatefollow,
    searchUsers
} = userSlice.actions;
export default userSlice.reducer