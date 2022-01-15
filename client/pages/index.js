import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Convolang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
      </main>
    </div>
  )
}
