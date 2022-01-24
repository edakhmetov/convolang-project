import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import apiService from '../api/apiService';

import navStyles from '../../styles/Nav.module.css';

export default function NavLinks() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    await apiService.logout();
    localStorage.removeItem('accessToken');
    setUser(null);
    router.push('/');
  };

  if (!user) {
    return (
      <ul>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/discover">Discover</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={logout} className={navStyles.logoutBtn}>
            Logout
          </button>
        </li>
      </ul>
    );
  }
}
