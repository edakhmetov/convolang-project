import React from 'react';
import {useState, useEffect} from 'react';

const useFetch = ( url ) => {

  const [ response, setResponse ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
 
  const fetchData = async () => {
    console.log('fetching data')
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('no access token');
     const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type' : 'application/json',
          'authorization' :`Bearer ${accessToken}`
        }
      });
      const data = await res.json()
      console.log('setting response')
       setResponse(data);
       setIsLoading(false);
    } catch (error) {
      console.error('ERROR')
      setError(true);
    }
  };
  useEffect(()=> {
    (async ()=> {
      await fetchData();
    })()
  }, []);

  return { response, error, isLoading } 
};

export default useFetch;


