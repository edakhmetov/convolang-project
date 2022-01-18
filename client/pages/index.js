import Head from 'next/head'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../lib/context/authContext'
import styles from '../styles/Home.module.css'
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';


const Home = () => {

  const { user, isLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log('from the index page', user);
  // }, [user]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Convolang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user && <main>
        <h1>
          Welcome to Convolang
        </h1>
        <h2>
          An app where you can learn languages through conversations with native speakers, share your thoughts and knowledge, and make new friends!
        </h2>
        <button>
          <Link href='/register'>
            Sign Up
          </Link>
        </button>
      </main>}
      {user && <div>
        <PostList user={user} />
      </div>}
    </div>
  )
}

export default Home