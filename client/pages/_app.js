import { useState, useEffect } from 'react';
// import apiService from '../lib/api/apiService';
import useFetch from '../lib/hooks/useFetch';
import Layout from '../lib/layout/Layout';
import { AuthProvider } from '../lib/context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  const [ user, setUser ] = useState(null);
 
  const { response, error, isLoading } = useFetch('http://localhost:3001/profile');
 
        useEffect(()=> {
          if (!isLoading) setUser(response)
        }, [isLoading]);

  return (
    <div>
      {console.log('HELLO', user)}
    <AuthProvider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
    </div>
  );
}

export default MyApp;
