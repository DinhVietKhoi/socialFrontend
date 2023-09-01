'use client'
import React, { useEffect, useRef, useState } from 'react'
import Post from './Post'
import '../sass/posts.scss'
import { getPosts, getPostsUser, resetPosts } from '@/redux/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import spin from '../assets/spin.gif'
import { postsReset } from '@/redux/postSlice'
interface Props {}

const Posts = ({ type }: any) => {
    const dispatch = useDispatch()
    const token = useSelector((state:any)=>state.auth.login.user.token)
    const id = useSelector((state:any)=>state.auth.login.user.userNew._id)
    useEffect(() => {
        postsReset()
        resetPosts(dispatch)
        if (type == 'all') {
            getPosts(dispatch, id, token, 0)
        } else {
            getPostsUser(dispatch, token,type, 0)
        }
    }, [])
    

    const isFetching = useSelector((state: any) => state.posts.isFetching)
    const posts = useSelector((state: any) => state.posts)
    const [visible, setVisible] = useState(5)
    
    const [shouldLoadMore, setShouldLoadMore] = useState(false);
    const listRef: any = useRef(null);
    const handleVisible = () => {
        setVisible(visible+5)
    }
    const handleLoadMore = () => {
        setShouldLoadMore(true);
        
    }
    useEffect(() => {
        if (shouldLoadMore && !isFetching) {
            handleVisible();
            setShouldLoadMore(false);
            if (type == 'all') {
                getPosts(dispatch, id, token, visible)
            }
            else {
                let id = type;
                getPostsUser(dispatch, token,type, visible)
            }
        }
        else if(isFetching){
            setShouldLoadMore(false);
        }
    }, [shouldLoadMore]);
    return (
        <div className='posts'>
            <div className='posts__container' ref={listRef}>
                
                {
                    type == 'all' ?
                        (
                            posts.posts.length >0?
                            posts.posts.map((e: any) => (
                                <Post
                                    key={e._id}
                                    data={e}
                                    type={type}
                                />
                            )):<h3>Không có bài đăng!!</h3>
                        )
                        
                        :
                        (
                            posts.postUser.length >0?
                            posts.postUser.map((e: any) => (
                                <Post
                                    key={e._id}
                                    data={e}
                                    type={type}
                                />
                        ))
                        : <h3>Không có bài đăng!!</h3>
                        )
                        
                }
                
                <div className="posts__load" onClick={handleLoadMore}>
                    {
                        !isFetching ? <span>Xem thêm</span> :
                            <Image
                                src={spin}
                                width={30}
                                height={30}
                                alt='spin load'
                        ></Image>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Posts