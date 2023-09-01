'use client'
import React, { useEffect, useState } from 'react'
import AvatarHome from './AvatarHome'
import '../sass/createPost.scss'
import { faFaceSmile, faImage, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {convertToKb} from '../helpers/bytetoKB'
import {createPost, logout} from '../redux/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { replaceComment } from '@/helpers/replaceComment'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
const CreatePost = ({type }: any) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const token = useSelector((state:any)=>state.auth.login.user.token)
    const postedBy = useSelector((state: any) => state.auth.login.user.userNew._id)
    const idUser = useSelector((state: any) => state.auth.login.user.userNew);
    
    const [infoImage, setInfoImage] = useState<any>(null)
    const [content,setContent] = useState<string>('')
    
    const [imageUpload,setImageUpload] = useState<File|null>(null)
    const isFetching = useSelector((state: any) => state.posts.isFetching)
    const addPhotos = (e: any) =>{
        const file = e.target.files[0];
        if (file && file.size < 1000*1024) {
            if (file.type.slice(0, 5) !== 'image' ) {
                return;
            }
            setFileToBase(file);
            setImageUpload(file)
        }
        else {
            toast.error('Dung lượng ảnh không hợp lệ! (Y/c: <1MB)', {
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

    const setFileToBase = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setInfoImage(reader.result);
            reader.abort();
        }
    }

    const removePhotos = () => {
        setInfoImage(null)
        setImageUpload(null)
    }
    const handleCreatePost = () => {
        if (!isFetching && content !== '') {
            if (token == null || postedBy == null) {
                return logout(dispatch,router)
            }
            createPost(dispatch, postedBy, token, replaceComment(content), infoImage, type)
            removePhotos()
            setContent('')
        }
    }
    return <div className='create-post'>
        <div className='create-post__input'>
            <AvatarHome
                id={idUser._id}
                link={idUser.avatar}
                name=""
                width={40}
                height={40}
            ></AvatarHome>
            <textarea
                value={content}
                onChange={e=>setContent(e.target.value)}
                placeholder='Bạn đang nghĩ gì thế ?'
            ></textarea>
        </div>
        <div className='create-post__controls'>
            <div className='create-post__elements'>
                <label className='element'>
                    <FontAwesomeIcon icon={faImage} />
                    <span>Photos</span>
                    <input type='file' hidden onChange={addPhotos} accept="image/*" ></input>
                </label>
            </div>
            <button className='create-post__submit' onClick={handleCreatePost}>Post</button>
        </div>
        <div className='create-post__fileUpload'>
            {
                imageUpload && <>
                    <span>{imageUpload?.name}</span>
                    <span>{convertToKb(imageUpload?.size)}Kb</span>
                    <div onClick={removePhotos} className='remove-file'>
                    <FontAwesomeIcon icon={faXmark} />
                    </div>
                </>
            }
        </div>
    </div>
}

export default CreatePost