import React from "react";
import { useEffect, useState } from "react";

const useUserPosts = (url) => {

  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type' : 'application/json',
          'authorization' : `Bearer ${accessToken}`
        },
      })
      const fetchedPosts = await res.json();
      setPosts(fetchedPosts);
    } catch(error) {
      console.error('ERROR')
    }
  }
  useEffect(()=> {
    fetchPosts()
  }, []);


  return { posts }
}

export default useUserPosts;

// apiService.getUserPosts = async () => {
//   const accessToken = localStorage.getItem('accessToken');
//   try {
//     const url = `${BASE_URL}/posts`;
//     const res = await fetch(url, {
//       method: 'GET',
//       credentials: 'include',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//         'authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const posts = await res.json();
//     return posts;
//   } catch (e) {
//     console.error(e);
//     return [];
//   }
