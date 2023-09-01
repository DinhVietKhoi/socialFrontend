import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import '../sass/avatarHome.scss'
import avatarNF from '../assets/avatarNF.jpg'
import Link from 'next/link';

interface AvatarProps{
    id: string;
    link: string;
    name: string;
    width: number;
    height: number;
}
const AvatarHome = ({ id, link, name, width, height }: AvatarProps) => {
    const [checkLink, setCheckLink] = useState<any>(null)
    useEffect(() => {
        if (link == "" || link == undefined) {
            setCheckLink(false)
        }
        else {
            setCheckLink(true)
        }
    }, [])
    return <Link href={`/user/${id}`} className='avatarHome'>
        <Image src={checkLink?link:avatarNF}
            width={width}
            height={height}
            alt="Picture of the author"
        />
        {
            name !== '' && <span>{name}</span>
        }
    </Link>
}

export default AvatarHome