import React from "react";
import { useState, useEffect } from "react";


const useLearningSpeakers = (url) => {

  const [ learningSpeakers, setLearningSpeakers ] = useState(null);

  const fetchLearningSpeakers = async () => {
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
      setLearningSpeakers(fetched);
    } catch(error) {  
      console.error('ERROR')
      return []
    }
  };

  useEffect(()=> {
    fetchLearningSpeakers();
  }, []);


  return { learningSpeakers }
 }

 export default useLearningSpeakers;






// apiService.getLearningSpeakers = async () => {
//   const accessToken = localStorage.getItem('accessToken');
//   try {
//     const url = `${BASE_URL}/learningSpeakers`;
//     const res = await fetch(url, {
//       method: 'GET',
//       credentials: 'include',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//         'authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const users = await res.json();
//     return users;
//   } catch (e) {
//     console.error(e);
//     return [];
//   }
// };