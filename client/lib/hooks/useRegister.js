import React from 'react';
import {useState, useEffect} from'react';

const useRegister = (url, formData) => {

  const registerUser = async () => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      return data
    } catch (error) {
      console.errror('ERROR')
      return error
    }
  }

  return  {  }


} 

export default useRegister;


// apiService.register = async (formData) => {
//   try {
//     const res = await fetch(`${BASE_URL}/register`, {
//       method: 'POST',
//       credentials: 'include',
//       mode: 'cors',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     const data = await res.json();
//     console.log('from the register api', data);
//     return data;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };