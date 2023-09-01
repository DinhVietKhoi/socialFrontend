'use client'

import { useSelector} from 'react-redux'
import hocPersisten from '@/HOC/hocPersisten'
import '../sass/home.scss'
import CreatePost from '@/components/CreatePost'
import Posts from '@/components/Posts'
import Navbar from '@/components/Navbar'
import ListFriend from '@/components/ListFriend'
function Home() {
  const userCurrent = useSelector((state: any) => state.auth.login.user.userNew)
  const reload = useSelector((state: any) => state.posts.reload)
  return (
    <div className='home container'>
      <div className='home__container row'>
        <Navbar></Navbar>
        <div className='home__newsfeed col c-6 l-8 m-12'>
          <CreatePost
            type='all'
          ></CreatePost>
          <Posts key={reload} type='all'></Posts>
        </div>
        <ListFriend></ListFriend>
      </div>
    </div>
  );
}

// export default Home;
export default hocPersisten(Home);