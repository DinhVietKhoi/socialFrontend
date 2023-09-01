'use client';
import LoginForm from '@/components/LoginForm';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import hocLogined from '@/HOC/hocLogined';
import loginbg from 'src/assets/login-bg.jpg'
import catIcon from "src/assets/catIcon.png"
import logoCat from "src/assets/logoCat.png"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../sass/loginPage.scss'

interface Props { }

const LoginPage = () => {
    return <>
        <main className='login'>
            <ToastContainer />
            <div className='login__container container row'>
                <div className='login__body col c-6 l-10 m-12'>
                    <div className='login__tittle'>
                        <Image
                            src={catIcon}
                            width={144}
                            height={144}
                            alt="Picture of the author"
                        />
                        <h1>...Login...</h1>
                    </div>
                    <LoginForm></LoginForm>
                </div>
            </div>
        </main>
    </>
}


// export default LoginPage
export default hocLogined(LoginPage) 

