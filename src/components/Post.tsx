'use client'
import React, { useCallback, useEffect, useState } from 'react'
import AvatarHome from './AvatarHome'
import '../sass/post.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faComment, faEllipsis, faHeart, faPaperPlane, faShareNodes, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, likePost, logout } from '@/redux/apiRequest';
import { convertTime } from '@/helpers/convertTime';
import { logOut } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';
import { checkLike } from '@/helpers/checkLike';
import Link from 'next/link';
import avatarNF from '../assets/avatarNF.jpg'

const Post = (data: any) => {
  const token = useSelector((state:any)=>state.auth.login.user.token)
  const idUser = useSelector((state:any)=>state.auth.login.user.userNew._id)
  const dispatch = useDispatch()
  const router = useRouter();
  const isFetching = useSelector((state: any) => state.posts.isFetching)
  const handleLike = () => {
    if (!isFetching) {
      likePost(dispatch,token,data.data._id,idUser,data.type)
    }
  }
  
  const [commentText, setCommentText] = useState('')
  const handleAddComment = (e: any) => {
    if (!isFetching) {
      if (e.keyCode == 13 && !e.shiftKey && commentText.trim() != '') {
        if (token == null || idUser == null) {
          return logout(dispatch,router)
        }
        e.preventDefault();
        addComment(dispatch, token, data.data._id, {text:commentText.trim(),postedBy:idUser}, data.type)
        setCommentText('')
      }
    }
    
  }
  const handleAddComment1 = () => {
    if (!isFetching) {
      if (token == null || idUser == null) {
        return logout(dispatch,router)
      }
      if (commentText.trim() != '') {
        addComment(dispatch, token, data.data._id, {text:commentText.trim(),postedBy:idUser}, data.type)
        setCommentText('')
      }
    }
    
  }
  return(
    data.data.postedBy&&<div className='post'>
    <div className='post__container'>
      <div className='post__header'>
        <div className='post__user'>
            <AvatarHome
              id={data.data.postedBy._id}
              link={data.data.postedBy.avatar}
              name=""
              width={35}
              height={35}
            ></AvatarHome>
            <div className='info-user'>
            <Link href={`/user/${data.data.postedBy._id}`}>{data.data.postedBy.fullname}</Link>
              <span>
                {convertTime(data.data.createdAt)}
              </span>
          </div>
        </div>
        <div className='post__setting'>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <div className='post__body'>
        <span>
          {data.data.content}
        </span>
        {
            data.data.image &&
            <Image src={data.data.image.url}
                    width={350}
                    height={400}
                    alt="Picture of the author"
                />
        }
      </div>
      <div className='post__footer'>
        <div className='post__actions'>
          <div className='post__likeIcon action'>
            <FontAwesomeIcon icon={faHeart} />
            <span>{data.data.like.length}</span>
          </div>
          <div className='post__commentIcon action'>
            <FontAwesomeIcon icon={faComment} />
            <span>{data.data.comment.length}</span>
          </div>
        </div>
        <div className='post__control'>
          <div className='post-control__header'>
              <div className={`${checkLike(data.data.like, idUser)?'item active':'item'}`} onClick={handleLike}>
              <FontAwesomeIcon icon={faHeart} />
              <span>Thả tym</span>
            </div>
            <div className='item'>
              <FontAwesomeIcon icon={faComment} />
              <span>Bình luận</span>
            </div>
          </div>
            <div className='post-control__body active'>
              <div className='post__comment'>
                <AvatarHome
                  id={data.data.postedBy._id}
                  link={data.data.postedBy.avatar}
                  name=""
                  width={35}
                  height={35}
                ></AvatarHome>
                <div className='input-comment'>
                  <textarea value={commentText} onKeyUp={handleAddComment} onChange={e=>setCommentText(e.target.value) } placeholder='Leave a comment...'></textarea>
                  <FontAwesomeIcon onClick={handleAddComment1} icon={faPaperPlane} />
                </div>
              </div>
              {
                <div className='post__listComment'>
                
                {
                    data.data.comment && [...data.data.comment].reverse().map((cmt: any) =>
                      <div key={cmt._id} className='item-comment'>
                        <AvatarHome
                          id={cmt.postedBy._id}
                          link={cmt.postedBy.avatar}
                          name=""
                          width={35}
                          height={35}
                        ></AvatarHome>
                      <div className='item-comment__content'>
                        <div className='info'>
                          <Link href={`/user/${cmt.postedBy._id}`}>{cmt.postedBy.fullname}</Link>
                          <span>{convertTime(cmt.created)}</span>
                        </div>
                        <div className='content'>
                          <p>
                            {
                              `${cmt.text}`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
              }
            </div>
            
        </div>
      
      </div>
    </div>
    </div>
  )
}

export default Post