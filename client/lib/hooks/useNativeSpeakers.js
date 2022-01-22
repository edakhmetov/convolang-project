import React from "react";
import { useState, useEffect } from "react";


const useNativeSpeakers = (url) => {

  const [ nativeSpeakers, setNativeSpeakers ] = useState(null);

  const fetchNativeSpeakers = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type' : 'application/json',
          'authorization' : `Bearer ${accessToken}`
        }
      })
      const fetched = await res.json();
      console.log(fetched)
      setNativeSpeakers(fetched);
    } catch(error) {  
      console.error('ERROR')
      return []
    }
  };

  useEffect(()=> {
    fetchNativeSpeakers();
  }, []);


  return { nativeSpeakers }
 }

 export default useNativeSpeakers;