import { useState, useEffect } from 'react';
import apiService from '../lib/api/apiService';
import Layout from '../lib/layout/Layout';
import { AuthProvider } from '../lib/context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await apiService.getUserInfo();
      user && setUser(user);
    })();
  }, []);

  return (
    <AuthProvider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
