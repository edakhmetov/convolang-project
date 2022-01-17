import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../lib/context/authContext';
import navStyles from '../styles/Nav.module.css';
import { useRouter } from 'next/router';


// now, the JWT token is accessible from the localstorage, use useEffect to send request on each page and to confirm that JWT is valid and user is signed in

const Nav = () => {
  const router = useRouter();
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);

  // console.log('in the nav', user);

  const logout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ token: accessToken }),
    });
    const data = await res.json();
    // console.log('data from logout', data);
    localStorage.removeItem('accessToken');
    setUser(null);
    setIsLoggedIn(false);
    router.push('/');
  }

  const renderLinks = () => {
    if (!user) {
      return (
        <ul>
          <li>
            <Link href='/register'>Register</Link>
          </li>
          <li>
            <Link href='/login'>Login</Link>
          </li>
        </ul>
      )
    } else {
      return (
        <>
          <ul>
            <li>
              <Link href='/home'>Home</Link>
            </li>
            <li>
              <Link href='/chats'>Chats</Link>
            </li>
            <li>
              <Link href='/discover'>Discover</Link>
            </li>
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          </ul>
          <button onClick={logout}>Logout</button>
        </>
      )
    }
  }

  return (
    <nav>
      <h1>
        <Link href='/'>Convolang</Link>
      </h1>
      {renderLinks()}
    </nav>
  )
}

export default Nav
