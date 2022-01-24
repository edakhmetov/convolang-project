const BASE_URL = 'http://localhost:3001';
const apiService = {};

apiService.register = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

apiService.login = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

apiService.logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ token: accessToken }),
    });
    await res.json();
  } catch (e) {
    console.error(e);
  }
};
//COMBINED WITH GETUSERINFO()
// apiService.getLoggedUser = async () => {
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) throw new Error();
//     const res = await fetch(`${BASE_URL}/profile`, {
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
//     console.error(e);
//     return null;
//   }
// }

apiService.createPost = async (formData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

//hookified
apiService.getUserPosts = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const url = `${BASE_URL}/posts`;
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const posts = await res.json();
    return posts;
  } catch (e) {
    console.error(e);
    return [];
  }
};
//hookified
apiService.getNativeSpeakers = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const url = `${BASE_URL}/nativeSpeakers`;
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const users = await res.json();
    return users;
  } catch (e) {
    console.error(e);
    return [];
  }
};
//hookified
apiService.getLearningSpeakers = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const url = `${BASE_URL}/learningSpeakers`;
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const users = await res.json();
    return users;
  } catch (e) {
    console.error(e);
    return [];
  }
};

apiService.followUser = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/follow/${id}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('error follow', e);
    return e;
  }
};

apiService.unfollowUser = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/unfollow/${id}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('error unfollow', e);
    return e;
  }
};

//NOT BEING USED 1/20/22
// apiService.getMyPosts = async () => {
//   try {
//     const url = `${BASE_URL}/myPosts`;
//     const accessToken = localStorage.getItem('accessToken');
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
//     return []
//   }
// };
//hookfieid, minus id param
apiService.getUserInfo = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error('no access token');
    const url =
      id === undefined ? `${BASE_URL}/profile` : `${BASE_URL}/user/${id}`;
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const user = await res.json();
    return user;
  } catch (e) {
    console.error('no access token');
    return null;
  }
};

apiService.getPost = async (id) => {
  try {
    const url = `${BASE_URL}/posts/${id}`;
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const post = await res.json();
    return post;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default apiService;
