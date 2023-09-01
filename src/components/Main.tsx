'use client'
import React, { ComponentType, ReactNode, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { resetPosts, resetUserCurrent } from '@/redux/apiRequest';
import Navbar from './Navbar';
import Loading from './Loading';
import ListFriend from './ListFriend';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [checkLoad, setLoad] = useState(true);
  let setCheck = setTimeout(() => {
    setLoad(false)
  },1000)
  useEffect(() => {
    clearTimeout(setCheck)
    setLoad(true)
    resetPosts(dispatch)
    resetUserCurrent(dispatch)
    window.scrollTo(0, 0)
    setCheck = setTimeout(() => {
      setLoad(false)
    },1000)
  }, [pathname])
  return <div className='main'>
        <ToastContainer />

    {
      checkLoad && <Loading></Loading>
    }
      {/* <Navbar></Navbar> */}
      {children}
      {/* <ListFriend></ListFriend> */}
  </div>
}

export default Main