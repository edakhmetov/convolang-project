import { useState, useEffect } from 'react';

import Nav from '../components/Nav';
import { AuthProvider } from '../lib/context/authContext';

const Layout = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // access JWT from the localstorage
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;
    (async () => {
      const res = await fetch('http://localhost:3001/me', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (!data.error) {
        console.log(data);
        setUser(data)
        setIsLoggedIn(true);
      };
    })()

  }, [isLoggedIn])

  return (
    <AuthProvider value={{user, setUser, setIsLoggedIn}} >
      <Nav />
      <div>
        <main>
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}

export default Layout
