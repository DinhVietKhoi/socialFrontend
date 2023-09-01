import Link from 'next/link'
import React from 'react'

interface Props {}

const notfound = () => {
    return <div className=''>
      Trang bị lỗi, xin vui lòng quay lại trang chủ!
      <Link href="/">go home</Link>
  </div>
}

export default notfound