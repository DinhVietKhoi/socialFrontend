'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from "next/navigation";
import Footer from '@/components/Footer';
import { useSelector } from 'react-redux';

interface Props {}

const ShowFooter = () => {
    const isAuthenticated = useSelector((state:any)=>state.auth.login.isAuthenticated)

    const pathName = usePathname();
    const [checkShow, setCheckShow] = useState(false)
    useEffect(() => {
            setCheckShow(isAuthenticated)
            
    }, [isAuthenticated])
    return (
            checkShow && pathName!=='/auth'&&pathName!=='/auth/register'&&
            <Footer></Footer>
    )
}

export default ShowFooter