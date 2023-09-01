import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { NextPage } from "next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,faLock, faPen
} from "@fortawesome/free-solid-svg-icons";
import '../sass/registerForm.scss'
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {useRouter} from 'next/navigation'
import { register } from '@/redux/apiRequest';

const RegisterForm = () => {
    const router = useRouter()

    const dispatch = useDispatch()
    const schema = Yup.object().shape({
        password: Yup.string()
            .required("Cần nhập mật khẩu!")
            .matches(/^[a-zA-Z0-9]*$/,"Có chứa ký tự không hợp lệ!")
            .min(6, "Độ dài mật khẩu từ 6 đến 15!")
            .max(15, "Độ dài mật khẩu từ 6 đến 15!"),
        username: Yup.string()
            .required("Cần nhập tài khoản!")
            .matches(/^[a-zA-Z0-9]*$/,"Có chứa ký tự không hợp lệ!")
            .min(6, "Độ dài tài khoản từ 6 đến 15!")
            .max(15, "Độ dài tài khoản từ 6 đến 15!"),
        fullname: Yup.string()
            .required("Cần nhập tên của bạn!")
            .min(2, "Độ dài tên từ 2 đến 30!")
            .max(30, "Độ dài tên từ 2 đến 30!"),
    });
    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            register(values,router)
            
        },
    });
    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return <>
        <form className="register-form col"onSubmit={handleSubmit} method="POST">
            <div className='register-form_input_group'>
                <FontAwesomeIcon icon={faPen} />
                <input
                    type="text"
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    id="fullname"
                    placeholder='Nhập họ và tên...'
                />
                {errors.fullname && touched.fullname && <span>{errors.fullname}</span>}
            </div>
            
            <div className='register-form_input_group'>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    id="username"
                    placeholder='Nhập tài khoản...'
                />
                {errors.username && touched.username && <span>{errors.username}</span>}
            </div>
            
            <div className='register-form_input_group'>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    placeholder='Nhập mật khẩu...'
                />
                {errors.password && touched.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Register</button>
            <div className='register-form__gr'>
                <span>Already have account? </span>
                <Link href="/auth">Login</Link>
            </div>
        </form>
    </>
}

export default RegisterForm