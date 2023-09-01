'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import '../sass/navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark, faChampagneGlasses, faHouse, faNewspaper, faPeopleGroup, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import AvatarHome from './AvatarHome';
import { getPosts, reloadPost, resetPosts } from '@/redux/apiRequest';

interface Props {}

const Navbar = () => {
    const path = usePathname();
    const isAuthenticated = useSelector((state:any)=>state.auth.login.isAuthenticated)
    const userCurrent = useSelector((state: any) => state.auth.login.user.userNew)
    
    const [checkShow, setCheckShow] = useState(false)
    useEffect(() => {
        setCheckShow(isAuthenticated)
        
    }, [isAuthenticated])
    const router = useRouter();
    const dispatch = useDispatch()
    const newFeed = () => {
        reloadPost(dispatch)
    }
    return (
        <div className='navbar col c-3 l-4 m-0'>
            <div className='navbar__container'>
                <ul>
                    <li>
                        <AvatarHome
                            id={ userCurrent._id }
                            link={userCurrent!==null?userCurrent.avatar:''}
                            name={userCurrent!==null?userCurrent.fullname:''}
                            width={30}
                            height={30}
                        />
                    </li>
                    <li >
                        <Link href='/' onClick={newFeed}>
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>New Feeds</span>
                        </Link>
                    </li>
                    <li >
                        <Link href='/'>
                            <FontAwesomeIcon icon={faUserGroup} />
                            <span>Tìm bạn bè</span>
                        </Link>
                    </li>
                    <li >
                        <Link href='/'>
                            <FontAwesomeIcon icon={faPeopleGroup} />
                            <span>Nhóm</span>
                        </Link>
                    </li>
                    <li >
                        <Link href='/'>
                            <FontAwesomeIcon icon={faBookmark} />
                            <span>Đã lưu</span>
                        </Link>
                    </li>
                    <li >
                        <Link href='/'>
                            <FontAwesomeIcon icon={faChampagneGlasses} />
                            <span>Kỷ niệm</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
