import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Comment{
    text: string,
    createAt: Date,
    postedBy: string,
    postedByName: string,
    postedByAvatar: string
}
interface Post {
    _id: string;
    postedBy: string;
    postedByName: string;
    postedBuyAvatar: string;
    content: string;
    like: string[];
    comment: Comment[];
    createAt: Date;
    image: {
        url: string;
        public_id: string
    }
}

interface PostsState {
    status: string;
    isFetching: boolean;
    reload: number;
    posts: Post[];
    postUser: Post[];
    error: string | null;
}

const initialState: PostsState = {
    status: 'idle',
    isFetching: false,
    reload: 0,
    posts: [],
    postUser: [],
    error: null,
};
const postSlice = createSlice({
name: 'posts',
initialState,
    reducers: {
        isFetchingSuccess: (state) => {
            state.isFetching = false;
        },
        isFetchingLoading: (state) => {
            state.isFetching = true;
        },
        postLoading: (state) => {
            state.status = 'loading';
        },
        postReceived: (state, action: PayloadAction<Post[]>) => {
            state.posts = [...state.posts, ...action.payload];
            state.status = 'succeeded';
        },
        postUserReceived: (state, action: PayloadAction<Post[]>) => {
            state.postUser = [...state.postUser, ...action.payload];
            state.status = 'succeeded';
        },
        postsError: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        postsReset: (state) => {
            state.posts = []
            state.postUser = []
        },
        setReload: (state) => {
            state.reload = state.reload + 1;
        },
        postAdded: (state, action: PayloadAction<Post>) => {
            state.posts = [action.payload,...state.posts]
        },
        postUserAdded: (state, action: PayloadAction<Post>) => {
            state.postUser = [action.payload,...state.postUser]
        },
        postDeleted: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            state.posts = state.posts.filter((post) => post._id !== id);
        },
        commentAdded: (state, action: PayloadAction<{ id: string, comment: Comment[]}>) => {
            const { id, comment } = action.payload;
            const postIndex = state.posts.findIndex((p: Post) => p._id === id);
            if (postIndex !== -1) {
                state.posts[postIndex].comment = [...comment]
            }
        },
        commentUserAdded: (state, action: PayloadAction<{ id: string, comment: Comment[]}>) => {
            const { id, comment } = action.payload;
            const postIndex = state.postUser.findIndex((p: Post) => p._id === id);
            if (postIndex !== -1) {
                state.postUser[postIndex].comment = [...comment]
            }
        },
        commentReceived: (state, action: PayloadAction<{ id: string, comment: Comment[]}>) => {
            const { id, comment } = action.payload;
            const postIndex = state.posts.findIndex((p: Post) => p._id === id);
            if (postIndex !== -1) {
                state.posts[postIndex].comment = [...comment]
            }
        },
        postLiked: (state, action: PayloadAction<{id:string, likeArr: string[] }>) => {
            const { id,likeArr } = action.payload;
            const post = state.posts.findIndex((p: Post) => p._id == id)
            if (post!== -1) {
                state.posts[post].like = likeArr;
            }
        },
        postUserLiked: (state, action: PayloadAction<{id:string, likeArr: string[] }>) => {
            const { id,likeArr } = action.payload;
            const post = state.postUser.findIndex((p: Post) => p._id == id)
            if (post!== -1) {
                state.postUser[post].like = likeArr;
            }
        }
    },
})
export const {
    isFetchingSuccess,
    isFetchingLoading,
    postLoading,
    postReceived,
    postsError,
    postAdded,
    postUserAdded,
    postDeleted,
    commentAdded,
    commentUserAdded,
    commentReceived,
    postLiked,
    postUserLiked,
    postsReset,
    postUserReceived,
    setReload
} = postSlice.actions;
export default postSlice.reducer;