'use client'
import React, { useEffect, useState } from 'react'
import '../sass/footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import hocPersisten from '@/HOC/hocPersisten'
import { useSelector } from 'react-redux'
interface Props {}

const Footer = () => {
    const isAuthenticated = useSelector((state:any)=>state.auth.login.isAuthenticated)
    const [checkShow, setCheckShow] = useState(false)
    useEffect(() => {
        setCheckShow(isAuthenticated)
        
    }, [isAuthenticated])
    return checkShow&&<div className='footer'>
        <FontAwesomeIcon icon={faHandHoldingHeart} />
        <span>Copyright © by Souls. </span>
        <FontAwesomeIcon icon={faHandHoldingHeart} />
    </div>
}

export default hocPersisten(Footer);
