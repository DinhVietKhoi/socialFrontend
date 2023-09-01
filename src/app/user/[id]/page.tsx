'use client'
import hocPersisten from '@/HOC/hocPersisten'
import React, { useEffect, useRef, useState } from 'react'
import '@/sass/userPage.scss'
import { getUserId, udFollow, updateAbout, updateAvatar, updateCoverPicture } from '@/redux/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import avatarDefault from '@/assets/avatarNF.jpg'
import backgroundDefault from '@/assets/backgroundNF.jpg'
import { convertTime } from '@/helpers/convertTime'
import CreatePost from '@/components/CreatePost'
import Posts from '@/components/Posts'
import { checkMyAccout } from '@/helpers/checkMyAccount'
import { checkFollow } from '@/helpers/checkFollow'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AvatarEditor from 'react-avatar-editor'
import AvatarHome from '@/components/AvatarHome'
import spin from '@/assets/spin.gif'
interface Props {}

const page = ({ params }: any) => {
    const token = useSelector((state: any) => state.auth.login.user.token)
    const MyUser = useSelector((state:any)=>state.auth.login.user)
    const idUser = useSelector((state: any) => state.auth.login.user.userNew);
    const userCurrent = useSelector((state: any) => state.user.userCurrent)
    const isFetching = useSelector((state: any) => state.user.isFetching)
    const isFetchingPost = useSelector((state: any) => state.posts.isFetching)
    const isFetchingAuth = useSelector((state: any) =>state.auth.login.isFetching)
    const dispatch = useDispatch()
    const [userCheck,setUserCheck] = useState<any>(null)
    useEffect(() => {
        getUserId(dispatch, params.id, token)

    }, [])
    const [about,setAbout] = useState('')

    useEffect(() => {
        setUserCheck(null)
        if (idUser._id == params.id) {
            setUserCheck(MyUser)
            setAbout(MyUser?.userNew.about)
        }
        else {
            setUserCheck(userCurrent)
            setAbout(userCurrent?.userNew.about)
        }
    }, [userCurrent, MyUser])

    const [buttonUpdate, setButtonUpdate] = useState('Sửa')
    const aboutText = useRef<HTMLTextAreaElement|null>(null)
    const handleUpdateButton = () => {
        if (buttonUpdate === 'Sửa') {
            if (aboutText.current !== null) {
                const length = aboutText.current.value.length;
                aboutText.current.setSelectionRange(length, length);
                aboutText.current.focus();
            }
            setButtonUpdate('Lưu')
        }
        else {
            updateAbout(dispatch, token, idUser, about)
            setButtonUpdate('Sửa')
            window.scrollTo(0, 0)
        }
    }
    const [infoImage, setInfoImage] = useState<any>(null)
    const [imageUpload,setImageUpload] = useState<File|null>(null)
    const [submitAvatar, setSubmitAvatart] = useState<boolean>(false)
    const [submitCoverPicture, setSubmitCoverPicture] = useState<boolean>(false)
    const [submitScaleImage, setSubmitScaleImage] = useState<number>(1)
    const handleFileInputClick = (e: any) => {
        e.target.value = '';
    };
    const addPhotos = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.slice(0, 5) !== 'image' ) {
                return;
            }
            setFileToBase(file);
            setImageUpload(file)
            setSubmitAvatart(true)
        }
    }
    const addPhotosCover = (e: any) =>{
        const file = e.target.files[0];
        if (file) {
            if (file.type.slice(0, 5) !== 'image' ) {
                return;
            }
            setFileToBase(file);
            setImageUpload(file)
            setSubmitCoverPicture(true)
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
        setSubmitAvatart(false)
        setSubmitCoverPicture(false)
        setSubmitScaleImage(1)
    }

    const editorRef = useRef<any>(null)
    const editorRefCover = useRef<any>(null)
    
    const handleSave = (a: string) => {
        if (!isFetching) {
            
            removePhotos()
            if (a == 'avatar') {
                updateAvatar(dispatch,token,idUser,editorRef?.current?.getImageScaledToCanvas().toDataURL())
            }
            else {
                updateCoverPicture(dispatch,token,idUser,editorRefCover?.current?.getImageScaledToCanvas().toDataURL())
            }
        }
    }
    const handleUnSave = () => {
        removePhotos()
    }
    const [changeInfo, setChangeInfo] = useState<number>(1)
    const handleChangeInfo = (a: number) => {
        setChangeInfo(a)
    }
    const [changeInfoImage, setChangeInfoImage] = useState<string>('avatar')
    const handleChangeInfoImage = (a: string) => {
        setChangeInfoImage(a)
    }

    const handleAboutChange = () => {
        if (
            aboutText.current!==null
        ) {
            setAbout(aboutText.current?.value);
        }
    }
    const handleAboutKey = (e:any) => {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    }
    const handleFollow = (type: string) => {
        udFollow(dispatch,token,idUser._id,params.id,type)
    }
    // console.log(typeof submitScaleImage)
    return (
        <div className='user container'>
            {
                userCheck !== null && <div className='user__container'>
                    <div className='user__header'>
                        
                        <div className='user-header__image'>
                            <Image
                                src={userCheck.userNew.coverPicture == '' ? backgroundDefault : userCheck.userNew.coverPicture}
                                width={700}
                                height={300}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='user-header__info'>
                            <div className='user-header__group'>
                            <div className='avatar'>
                                <label>
                                    <Image src={userCheck.userNew.avatar == '' ? avatarDefault : userCheck.userNew.avatar}
                                            width={150}
                                            height={150}
                                            alt="Picture of the author"
                                        />
                                    {
                                        checkMyAccout(userCheck.userNew._id, idUser._id) &&
                                        <>
                                            <div className='overflow'>
                                                <FontAwesomeIcon icon={faCamera} />
                                            </div>
                                            <input
                                                onClick={handleFileInputClick}
                                                type='file'
                                                hidden
                                                onChange={addPhotos}
                                                accept="image/*"
                                            ></input>
                                        </>
                                    }
                                    
                                </label>
                            </div>
                            <div className='info-group'>
                                <h3>{userCheck.userNew.fullname}</h3>
                                <span>{userCheck.userNew.following.length} bạn bè</span>
                                <div className='info-friend'>
                                    {
                                        userCheck.userNew.following.map((follow: any,index: number) => [
                                            index<6&&<div key={follow._id} className='item'>
                                                <AvatarHome
                                                    link={follow.followBy.avatar}
                                                    name=''
                                                    id={follow.followBy._id}
                                                    width={30}
                                                    height={30}
                                                />
                                            </div>
                                        ])   
                                    }
                                </div>
                            </div>
                            </div>
                            
                            <ul className='user-header-info__group'>
                                <li>
                                {
                                !checkMyAccout(userCheck.userNew._id, idUser._id) ? (
                                    checkFollow(idUser._id,userCheck.userNew.followers) ? <span onClick={()=>handleFollow('unfollow')} style={isFetchingPost?{ pointerEvents: 'none'}:{ pointerEvents: 'auto'}}>Đang theo dõi</span>:<span onClick={()=>handleFollow('follow')} style={isFetchingPost?{ pointerEvents: 'none'}:{ pointerEvents: 'auto'}}>Theo dõi</span>
                                        ) :
                                        
                                            <label>
                                                Đổi ảnh bìa
                                                <input
                                                    onClick={handleFileInputClick}
                                                    type='file'
                                                    hidden
                                                    onChange={addPhotosCover}
                                                    accept="image/*"
                                                ></input>
                                                
                                                
                                            </label>
                                    }
                                    {
                                                
                                        submitCoverPicture && <div>
                                            <div className='overlay'></div>
                                            <div className='coverPicture__overlay'>
                                                <AvatarEditor
                                                    ref={editorRefCover}
                                                    image={infoImage}
                                                    width={650}
                                                    height={300}
                                                    borderRadius={0}
                                                    border={50}
                                                    color={[255, 255, 255, 0.9]} // RGBA
                                                    scale={submitScaleImage}
                                                />
                                                <input type="range" value={submitScaleImage} onChange={(e: any)=>setSubmitScaleImage(Number(e.target.value))} id="volume" name="volume" min="0.5" max="1.5" step="0.1"></input>
                                                <div className='avatar-test__button'>
                                                    <span onClick={handleUnSave}>Huỷ</span>
                                                    <span onClick={()=>handleSave('coverPicture')}>Chấp nhận</span>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                </li>
                                <li>
                                    <strong>Tham gia {convertTime(userCheck.userNew.createdAt)}</strong>
                                </li>    
                            </ul>
                        </div>
                        
                        <div className='user-header__navbar'>
                            <ul>
                                <li className={changeInfo==1?'active':''} onClick={()=>handleChangeInfo(1)}>
                                    Thông tin
                                </li>
                                <li className={changeInfo==3?'active':''} onClick={()=>handleChangeInfo(3)}>
                                    Friend ({userCheck.userNew.following.length})
                                </li> 
                                <li className={changeInfo==4?'active':''} onClick={()=>handleChangeInfo(4)}>
                                    Ảnh ({userCheck.userNew.listImage.length})
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='user__body row'>
                        
                        {
                            changeInfo == 1
                                ?
                                <div className='user-body__about box col c-6 l-12'>
                                    <h3>Giới thiệu <span>(Được phép nhập: {200-about.length} ký tự)</span></h3>
                                
                                    <textarea
                                        style={buttonUpdate==='Sửa'?{ pointerEvents: 'none',whiteSpace: 'pre-wrap' }:{ pointerEvents: 'auto',whiteSpace: 'pre-wrap' }} 
                                        ref={aboutText}
                                        value={about}
                                        onChange={handleAboutChange}
                                        onKeyDown={(e)=>handleAboutKey(e)}
                                        maxLength={200}
                                        placeholder='...'
                                        wrap="soft"
                                    />
                                    {
                                        checkMyAccout(userCheck.userNew._id, idUser._id) && (!isFetching ?
                                            <button onClick={handleUpdateButton}>{buttonUpdate}</button> :
                                            <button>........</button>)
                                    }
                                </div>
                                :
                                changeInfo == 2
                                    ?
                                    <div className='user-body__follower box col c-6 l-12'>
                                        <h3>Bạn bè: </h3>
                                        <div className='box-body'>
                                        {
                                                userCheck.userNew.following.length > 0 ?
                                                userCheck.userNew.following.map((follow: any) => [
                                                    <div key={follow._id}>
                                                        <AvatarHome
                                                            link={follow.followBy.avatar}
                                                            name={follow.followBy.fullname}
                                                            id={follow.followBy._id}
                                                            width={45}
                                                            height={45}
                                                        />
                                                    </div>
                                                ]) :
                                                    <span>Không có dữ liệu hiển thị</span>
                                        }
                                        
                                        </div>
                                        
                                    </div>
                                    : 
                                    changeInfo == 3
                                    ?
                                    <div className='user-body__following box col c-6 l-12'>
                                            <h3>Bạn bè:</h3>
                                            <div className='box-body'>
                                            {
                                                userCheck.userNew.following.length > 0 ?
                                                        userCheck.userNew.following.map((follow: any) => [
                                                            <div key={follow._id}>
                                                                <AvatarHome
                                                                    link={follow.followBy.avatar}
                                                                    name={follow.followBy.fullname}
                                                                    id={follow.followBy._id}
                                                                    width={45}
                                                                    height={45}
                                                                />
                                                            </div>
                                                        ]) :
                                                    <span>Không có dữ liệu hiển thị</span>
                                        }
                                            </div>
                                        </div>
                                        :
                                    <div className='user-body__avatarUpload box col c-6 l-12'>
                                            <ul className={changeInfoImage}>
                                                <li onClick={()=>handleChangeInfoImage('avatar')}>Ảnh đại diện ({userCheck.userNew.listImage.filter((e: any)=>e.type=='avatar').length})</li>
                                                <li onClick={()=>handleChangeInfoImage('post')}>Ảnh bài đăng ({userCheck.userNew.listImage.filter((e: any)=>e.type=='post').length})</li>
                                                <li onClick={()=>handleChangeInfoImage('coverPicture')}>Ảnh bìa ({userCheck.userNew.listImage.filter((e: any)=>e.type=='coverPicture').length})</li>
                                            </ul>
                                            <div className='box-body row'>
                                                {
                                                    !
                                                    userCheck !== null && userCheck.userNew.listImage.map((user: any) => [
                                                        
                                                        changeInfoImage==user.type&& <div key={user._id} className='box-avatar col c-4'>
                                                            <div className='image'>
                                                                <Image
                                                                    width={100}
                                                                    height={150}
                                                                    src={user.url}
                                                                    alt="image"
                                                                ></Image>
                                                            </div>
                                                        </div>
                                                        
                                                    ])
                                                }
                                                
                                            </div>
                                    </div>
                        }
                        
                        <div className='user-body__post col c-6 l-12'>
                        
                            {
                                checkMyAccout(userCheck.userNew._id, idUser._id) &&
                                <CreatePost
                                    type={params.id}
                                ></CreatePost>
                            }
                            {
                                !isFetching&&<Posts type={params.id}></Posts>
                            }
                            
                        </div>
                        
                    
                    </div>
                        
                </div>
            }
            {
                userCheck === null && !isFetching && <div>Người dùng không tồn tại quay lại trang <Link href='/'>Home</Link></div>
            }
            {
                submitAvatar && <div className='user__avatar-test'>
                    <div className='overlay'></div>
                    <div className='avatar-test__body'>
                        <AvatarEditor
                            ref={editorRef}
                            image={infoImage}
                            width={350}
                            height={350}
                            borderRadius={175}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={submitScaleImage}
                        />
                        <input type="range" value={submitScaleImage} onChange={(e: any) => setSubmitScaleImage(Number(e.target.value))} id="volume" name="volume" min="0.5" max="1.5" step="0.1"></input>
                        <div className='avatar-test__button'>
                            <span onClick={handleUnSave}>Huỷ</span>
                            <span onClick={()=>handleSave('avatar')}>Chấp nhận</span>
                        </div>
                    </div>
                </div>
            }
            </div>
    
    )
}

export default hocPersisten(page);
