import React from 'react';
import {useState, useEffect} from 'react';

const useUserInfo = ( url ) => {

  const fetchUser = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
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
      const user = await res.json()
       return user;
    } catch (error) {
      console.error('ERROR')
      return null;
    }
  };

  useEffect(()=> {
    fetchUser();
  });

  return { user } 
};

export default useUserInfo;




// apiService.getUserInfo = async (id) => {
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) throw new Error('no access token');
//     const url = id === undefined ? `${BASE_URL}/profile` : `${BASE_URL}/user/${id}`;
//     const res = await fetch(url, {
//       method: 'GET',
//       credentials: 'include',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//         'authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const user = await res.json();
//     return user;
//   } catch (e) {
//     console.error('no access token');
//     return null;
//   }
// };
