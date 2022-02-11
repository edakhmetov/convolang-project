import { useState, useEffect, FunctionComponent } from 'react';
import useFetch from '../lib/hooks/useFetch';
import Layout from '../lib/layout/Layout';
import { AuthProvider } from '../lib/context/AuthContext';
import '../styles/globals.css';
import User from '../lib/types/User';

type AppProps = {
  Component: FunctionComponent;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  const { response, isLoading } = useFetch('http://localhost:3001/profile');

  useEffect(() => {
    if (!isLoading) setUser(response);
  }, [isLoading]);

  return (
    <div>
      <AuthProvider value={{ user, setUser }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
