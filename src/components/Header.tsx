'use client'
import Image from 'next/image';

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import logoCat from "src/assets/logoCat.png"
import '../sass/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBell, faDoorOpen, faHouse, faMagnifyingGlass, faMessage } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, searchU } from '@/redux/apiRequest';
import AvatarHome from './AvatarHome';
import hocPersisten from '@/HOC/hocPersisten';
import spin from '@/assets/spin.gif'
import { debounce, throttle } from 'lodash';
const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const token = useSelector((state:any)=>state.auth.login.user.token)
    const userCurrent = useSelector((state: any) => state.auth.login.user.userNew)

    const handleLogout = () => {
        logout(dispatch, router)
    }
    const [name,setName] = useState('')
    const handleSearch = async () => {
        if (name != '') {
            await searchU(dispatch, token, name);
            console.log(1)
        }
    };
    
    const handleChange = (event: any) => {
        const name = event.target.value;
        setName(name);
    }
    return (<>
            <div className='header fixed'>
            <div className='header__group'>
                <div className='header__logo'>
                    <Link href="/">
                        <Image
                            src={logoCat}
                            width={48}
                            height={48}
                            alt="Picture of the author"
                        />
                    </Link>
                </div>
                {/* <div className='header__search'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch}/>
                    <input value={name} placeholder='Search...' onChange={handleChange}/>
                </div> */}
            </div>
            <div className='header__elements'>
                <div className='header__avatar'>
                    <AvatarHome
                        id={ userCurrent._id }
                        link={userCurrent!==null?userCurrent.avatar:''}
                        name={userCurrent!==null?userCurrent.fullname:''}
                        width={30}
                        height={30}
                    />
                </div>
                <div className='element header__home'>
                    <Link href="/">
                        <FontAwesomeIcon icon={faHouse} />
                    </Link>
                </div>
                
                {/* <div className='element header__messages'>
                    <FontAwesomeIcon icon={faMessage} />
                </div>
                <div className='element header__notifications'>
                    <FontAwesomeIcon icon={faBell} />
                </div> */}
                <div className='element header__logout' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faDoorOpen} />
                </div>

            </div>
            </div>
            <div className='header_fake'></div>
        </>
            
)}

export default hocPersisten(Navbar);
