'use client'
import axios from "axios";
import { loading, logIn, udAbout, udAvatar ,finish, udCoverPicture} from "./authSlice";
import {
    resetUser,
    getUserById,
    isFetchingSuccessUser,
    isFetchingLoadingUser,
    updatefollow,
    searchUsers,
} from "./userSlice";
import { AppDispatch } from '@/redux/store';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { toast } from "react-toastify";
import {
    commentAdded,
    commentReceived,
    isFetchingLoading,
    isFetchingSuccess,
    postAdded,
    postLiked,
    postLoading,
    postReceived,
    postUserReceived,
    postsError,
    postsReset,
    postUserAdded,
    commentUserAdded,
    postUserLiked,
    setReload
} from "./postSlice";
import { finished } from "stream";
interface Comment{
    text: string,
    createAt: Date,
    postedBy: string,
    postedByName: string,
    postedByAvatar: string
}

export const axiosConfig = axios.create({
    baseURL: 'https://meosocial.onrender.com', 
    timeout: 10000,
});
//Auth Slice
export const register = async (values: any,router: AppRouterInstance)=>{
    try {
        const res = await axiosConfig.post(`/v1/auth/register`, values)
        router.push("/auth");
        toast.success('Đăng ký thành công', {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        
    }
    catch (error: any) {
        // router.push("/auth");
        toast.error('Đăng ký thất bại!', {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}
export const login = async (user: any, dispatch: AppDispatch, router: any) => {
    try {
        const res = await axiosConfig.post(`v1/auth/login`, user)
        dispatch(logIn(res.data))
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userID', res.data.userNew._id);
        toast.success('Đăng nhập thành công!', {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        router.push("/");
    }
    catch (error: any) {
        toast.error('Đăng nhập thất bại!', {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export const logout = async (dispatch: AppDispatch, router: AppRouterInstance) => {
    await router.push('/auth')
    localStorage.clear();
}

export const getUser = async (dispatch: AppDispatch,id: string | null,token: string | null) => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // đính kèm token vào header
        },
    };
    try {
        const res = await axiosConfig.get(`/v1/users/${id}`, config)
        dispatch(logIn(res.data))
    }
    catch (error: any) {
        throw error;
    }
}

export const updateAvatar = async (dispatch: AppDispatch,token: string ,id: string, image: any)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };
    dispatch(isFetchingLoadingUser())
    dispatch(loading())
    try {
        const res = await axiosConfig.put('/v1/users/updateAvatar', {id, image}, config)
        const avatar = res.data;
            dispatch(udAvatar(avatar.avatar))
    }
    catch (error: any) {
        throw error;
    }
    finally {
        dispatch(isFetchingSuccessUser())
        dispatch(finish())
    }
}
export const updateCoverPicture = async (dispatch: AppDispatch,token: string ,id: string, image: any)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };
    dispatch(isFetchingLoadingUser())
    dispatch(loading())
    try {
        const res = await axiosConfig.put('/v1/users/updateCoverPicture', {id, image}, config)
        const coverPicture = res.data;
            dispatch(udCoverPicture(coverPicture.coverPicture))
    }
    catch (error: any) {
        throw error;
    }
    finally {
        dispatch(isFetchingSuccessUser())
        dispatch(finish())
    }
}
export const updateAbout = async (dispatch: AppDispatch,token: string ,id: string, content: string)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };
    dispatch(isFetchingLoadingUser())
    dispatch(loading())

    try {
        const res = await axiosConfig.put('/v1/users/updateAbout', {content, id}, config)
        const about = res.data;
            dispatch(udAbout(about.about))
    }
    catch (error: any) {
        throw error;
    }
    finally {
        dispatch(isFetchingSuccessUser())
    dispatch(finish())

    }
}

//Post Slice
export const getPosts = async (dispatch: AppDispatch, id:string|null ,token: string | null,postsLenght: any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };
    dispatch(postLoading())
    dispatch(isFetchingLoading())
    dispatch(loading())

    try {
        const res = await axiosConfig.get(`/v1/posts?skip=${postsLenght}`, config)
        const posts = res.data;
        dispatch(postReceived(posts))
    }
    catch (error: any) {
        dispatch(postsError(error.message));
        throw error;
    }
    finally {
        dispatch(isFetchingSuccess())
        dispatch(finish())
    }
}
export const reloadPost = async (dispatch: AppDispatch) => {
    dispatch(setReload());
}
export const resetPosts = (dispatch: AppDispatch) => {
    dispatch(postsReset())
}
export const getPostsUser = async (dispatch: AppDispatch, token: string|null, id: string|null, postsLenght: any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };
    dispatch(isFetchingLoading())
    dispatch(loading())

    try {
        const res = await axiosConfig.get(`/v1/posts/${id}?skip=${postsLenght}`, config)
        const postUser = res.data;
        dispatch(postUserReceived(postUser))
        
    }
    catch (error: any) {
        dispatch(postsError(error.message));
        throw error;
    }
    finally {
        dispatch(isFetchingSuccess())
        dispatch(finish())
    }
    
}
export const createPost = async (dispatch: AppDispatch,postedBy: string|null,token: string|null,content: string,image: any, type: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };
    dispatch(isFetchingLoading())
    dispatch(loading())

    try {
        const res = await axiosConfig.post('/v1/posts/create', {postedBy, content, image}, config)
        const post = res.data;
        if (type == 'all') {
            dispatch(postAdded(post))
            
        }
        else {
            dispatch(postUserAdded(post))
            
        }
        
    }
    catch (error: any) {
        dispatch(postsError(error.message));
        throw error;
    }
    finally {
        dispatch(isFetchingSuccess())
        dispatch(finish())
        
    }
}

export const addComment = async (dispatch: AppDispatch,token: string|null,idPost: string,comment: any, type: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        
    }
    dispatch(isFetchingLoading())

    try {
        const res = await axiosConfig.post(`/v1/posts/addComment/${idPost}`, comment, config)
        const commentResponse: Comment[] = res.data
        if (type == 'all') {
            dispatch(commentAdded({ id: idPost, comment: commentResponse }))

        }
        else {
            dispatch(commentUserAdded({ id: idPost, comment: commentResponse }))
        }
    }
    catch (err : any){
        dispatch(postsError(err.message));
        throw err;
    }
    finally {
        dispatch(isFetchingSuccess())
        
    }
}
export const likePost = async (dispatch: AppDispatch,token: string, id: string, idUser: string, type: string) => {

   
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        
    }
    dispatch(isFetchingLoading())

    try {
        const idU = {"idUser":idUser}
        const res = await axiosConfig.put(`/v1/posts/like/${id}`, idU, config)
        const likeArr: string[] = res.data
        if (type == 'all') {
            dispatch(postLiked({id, likeArr }))
        }
        else {
            dispatch(postUserLiked({id, likeArr }))

        }
    }
    catch (err : any){
        dispatch(postsError(err.message));
        throw err;
    }
    finally {
        dispatch(isFetchingSuccess())
        
    }
}

//user Slice
export const getUserId = async (dispatch: AppDispatch,id: string | null,token: string | null) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // đính kèm token vào header
        },
    };
    dispatch(isFetchingLoadingUser())
    try {
        const res = await axiosConfig.get(`/v1/users/${id}`, config)
        
        dispatch(getUserById(res.data ));
    }
    catch (error: any) {
    }
    finally {
        dispatch(isFetchingSuccessUser())
    }
}
export const getAllUser = async (dispatch: AppDispatch,token: string | null) => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // đính kèm token vào header
        },
    };
    try {
        const res = await axiosConfig.get(`/v1/users/`, config)
        // dispatch(getAllUser(res.data))
    }
    catch (error: any) {
        throw error;
    }
}
export const resetUserCurrent = (dispatch: AppDispatch) => {
    dispatch(resetUser())
}
export const udFollow = async (dispatch: AppDispatch,token:string,id:string,idUser:string,type:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        
    }
    dispatch(isFetchingLoading())

    try {
        let res: any;
        if (type == 'follow') {
            res = await axiosConfig.put(`/v1/users/follow`, {idUser,id},config)
        }
        else {
            res = await axiosConfig.put(`/v1/users/unfollow`, {idUser,id},config)
        }
        dispatch(updatefollow(res.data.followers));

    }
    catch (error: any) {
    }
    finally {
        dispatch(isFetchingSuccess())

    }
}

export const searchU = async (dispatch: AppDispatch,token:string,name:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        
    }
    dispatch(isFetchingLoading())
    try {
        let res = await axiosConfig.get(`/v1/users?name=${name}`,config)
        dispatch(searchUsers(res.data));

    }
    catch (error: any) {

    }
    finally {
        dispatch(isFetchingSuccess())
    }
}