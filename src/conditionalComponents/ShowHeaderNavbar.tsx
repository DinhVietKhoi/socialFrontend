'use client'
import React, { useEffect, useState } from 'react'
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { useSelector } from 'react-redux';

interface Props {}

const ShowHeaderNavbar = () => {
    const isAuthenticated = useSelector((state:any)=>state.auth.login.isAuthenticated)

    const pathName = usePathname();
    const [checkShow, setCheckShow] = useState(false)
    useEffect(() => {
            setCheckShow(isAuthenticated)
            
    }, [isAuthenticated])
    return (
          checkShow&& pathName!=='/auth'&&pathName!=='/auth/register'&&<>
              <Header></Header>
              {/* <Navbar></Navbar> */}
            </>
    )
}

export default ShowHeaderNavbar