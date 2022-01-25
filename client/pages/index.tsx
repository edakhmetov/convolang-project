import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../lib/context/AuthContext';
import PostList from '../domains/posts/PostList';
import styles from '../styles/Home.module.css';
import User from '../lib/types/User';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Convolang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user && (
        <main className={styles.container}>
          <h1 className={styles.title}>Welcome to Convolang</h1>
          <h2 className={styles.description}>
            An app where you can learn languages through conversations with
            native speakers, share your thoughts and knowledge, and make new
            friends!
          </h2>
          <div className={styles.buttons}>
            <Link href="/register">
              <button className={styles.button}>Sign Up</button>
            </Link>
            <div className={styles.login}>
              Already have account?{' '}
              <Link href="/login">
                <div>Login</div>
              </Link>
            </div>
          </div>
        </main>
      )}
      {user && (
        <div>
          <PostList />
        </div>
      )}
    </div>
  );
};

export default Home;
