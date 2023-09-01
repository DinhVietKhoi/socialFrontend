'use client'
import { getUser } from "@/redux/apiRequest";
import { RootState } from "@/redux/store";
import { redirect, useRouter, usePathname } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const hocLogined = <T extends object>(WrappedComponent: ComponentType<T>) => {
    const Wrapper = (props: T) => {
        const [isNoLoggin, setIsNoLoggin] = useState(false);
        const router = useRouter();
        const dispatch = useDispatch();
        const path = usePathname()
        let token: string | null
        let id: string | null
        if (typeof localStorage !== 'undefined') {
            token = localStorage.getItem("token")
            id = localStorage.getItem("userID")
        }
        useEffect(() => {
            setIsNoLoggin(false)
            const checkNoLoggin = async () => {
                if (token && id ) {
                    try {
                        await getUser(dispatch, id, token);
                        router.push('/');
                    } catch (error) {
                        setIsNoLoggin(true);
                    }
                }
                else {
                    setIsNoLoggin(true);
                }
            };
            checkNoLoggin();
        }, []);
        return (
            <>
                {
                    isNoLoggin ? <WrappedComponent {...props} /> : null
                }
            </>
        )
    };
    return Wrapper;
};
export default hocLogined;