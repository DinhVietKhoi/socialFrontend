'use client';
import LoginForm from '@/components/LoginForm';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import 'src/sass/registerPage.scss'
import RegisterForm from '@/components/RegisterForm';
import hocLogined from '@/HOC/hocLogined';
import registerbg from 'src/assets/register-bg.jpg'
import logoCat from "src/assets/logoCat.png"
import catIcon from "src/assets/catIcon.png"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props { }
const RegisterPage = () => {
    return <>
        <main className='register'>
            <div className='register__container container row'>
                <div className='register__body col c-6 l-10 m-12'>
                    <div className='register__tittle'>
                        <Image
                            src={catIcon}
                            width={144}
                            height={144}
                            alt="Picture of the author"
                        />
                        <h1>...Register...</h1>
                    </div>
                    <RegisterForm></RegisterForm>
                </div>
            </div>
        </main>
    </>
}


export default hocLogined(RegisterPage) 


