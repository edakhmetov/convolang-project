import { useState, useEffect } from 'react';
import apiService from '../api/apiService';
import Nav from './Nav';
import { AuthProvider } from '../context/AuthContext';

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
    })();
  }, [isLoggedIn]);

  return (
    <AuthProvider value={{ user, setUser, setIsLoggedIn, isLoggedIn }}>
      <Nav />
      <main>{children}</main>
    </AuthProvider>
  );
};

export default Layout;
