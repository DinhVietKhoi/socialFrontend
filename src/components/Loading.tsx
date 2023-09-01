import Image from 'next/image'
import React from 'react'
import logoCat from "src/assets/logoCat.png"
import spin1 from "src/assets/spin1.gif"

import '@/sass/loading.scss'
const loading = () => {
    return <div className='loading'>
        <Image src={logoCat}
            width={100}
            height={100}
            alt="Picture of the author"
        />
        <Image src={spin1}
            width={100}
            height={100}
            alt="Picture of the author"
        />
        <div className="image-shadow"></div>
    </div>
}

export default loading