import { useState, useEffect } from 'react';
import apiService from '../lib/api/apiService';
import Nav from '../components/Nav';
import useUserInfo from '../lib/hooks/useUserInfo';
import { AuthProvider } from '../lib/context/authContext';


const Layout = ({ children }) => {

  const [user, setUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await apiService.getUserInfo();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
    })()
  }, [isLoggedIn]);


  


  return (
    <AuthProvider value={{user, setUser, setIsLoggedIn, isLoggedIn}} >
      <Nav />
      <main>
        {children}
      </main>
    </AuthProvider>
  )
}

export default Layout
