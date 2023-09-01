"use client"
import axios from "axios";
import { useRouter } from "next/navigation";

import { logIn, logOut } from '@/redux/authSlice';
import { useDispatch } from "react-redux"
import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { NextPage } from "next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {login} from '../redux/apiRequest'
import {
    faUser,faLock
  } from "@fortawesome/free-solid-svg-icons";
import '../sass/loginForm.scss'
import Link from 'next/link';

const LoginForm = () => {
    const router = useRouter()

    const dispatch = useDispatch()
    const schema = Yup.object().shape({
        password: Yup.string()
            .required("Cần nhập mật khẩu!"),
        username: Yup.string()
            .required("Cần nhập tài khoản!"),
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async(values, {resetForm }) => {
            resetForm();
            login(values, dispatch, router);
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return <>
        <form className="login-form col c-12"onSubmit={handleSubmit} method="POST">
            <div className='login-form_input_group'>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    id="username"
                    placeholder='Username'
                    autoComplete="off"
                />
                {errors.username && touched.username && <span>{errors.username}</span>}
            </div>
            
            <div className='login-form_input_group'>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    placeholder='Password'
                />
                {errors.password && touched.password && <span>{errors.password}</span>}
            </div>
            
            <button type="submit">Login</button>
            <div className='login-form__gr'>
                <span>Dont have account?</span>
                <Link href="/auth/register">Register</Link>
            </div>
        </form>
    </>
}

export default LoginForm