'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import '../sass/listFriend.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark, faChampagneGlasses, faHouse, faNewspaper, faPeopleGroup, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import AvatarHome from './AvatarHome';
interface Props {}

const ListFriend = () => {
    const path = usePathname();
    const isAuthenticated = useSelector((state:any)=>state.auth.login.isAuthenticated)
    const userCurrent = useSelector((state: any) => state.auth.login.user.userNew)
    return (
        <div className='list-friend col c-3 l-0'>
            <div className='list-friend__container'>
                <h3>Danh sách bạn bè:</h3>
                <ul>
                    {
                        userCurrent && userCurrent.following.map((e:any) => [
                            <li key={e._id} >
                                <AvatarHome
                                    id={ e.followBy._id }
                                    link={e.followBy.avatar}
                                    name={e.followBy.fullname}
                                    width={30}
                                    height={30}
                                />
                            </li>
                        ])
                    }
                    
                </ul>
            </div>
        </div>
    )
}

export default ListFriend;
