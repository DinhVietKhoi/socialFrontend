'use client'
import { getUser } from '@/redux/apiRequest';
import { RootState } from '@/redux/store';
import { useRouter, usePathname } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const hocPersisten = <T extends object>(WrappedComponent: ComponentType<T>) => {
    const Wrapper = (props: T) => {
        const [isLoggin, setIsLoggin] = useState(false);
        const router = useRouter();
        const dispatch = useDispatch();
        const path = usePathname()
        // const isAuthenticated = useSelector((state:any)=>state.auth.login.isAuthenticated)
        let token: string | null
        let id: string | null
        if (typeof localStorage !== 'undefined') {
            token = localStorage.getItem("token")
            id = localStorage.getItem("userID")
        }
        useEffect(() => {
            setIsLoggin(false)
            const checkLoggin = async () => {
                if (token && id) {
                    try {
                        await getUser(dispatch, id, token);
                        setIsLoggin(true);
                        // router.push('/');
                        
                    } catch (error) {
                        router.push('/auth');
                    }
                }
                else {
                    router.push('/auth');
                }
            };
            checkLoggin();
        }, []);
        return (
            <>
                {
                    isLoggin ? <WrappedComponent {...props} /> : null
                }
            </>
        )
    };
    return Wrapper;
};
export default hocPersisten;
