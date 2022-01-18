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
    console.log('from the register api', data);
    return data;
  } catch (e) {
    console.log(e);
    // console.log(data);
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
    // console.log('from the api', res);
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    // setIsLoggedIn(true);
    return data;
  } catch (e) {
    console.log(e);
    // console.log(data);
    return e;
  }
};

apiService.logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ token: accessToken }),
    });
    const data = await res.json();
  } catch (e) {
    console.error(e);
  }
}

apiService.getLoggedUser = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error();
    const res = await fetch('http://localhost:3001/me', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`,
      },
    });
    const user = await res.json();
    return user;
  } catch (e) {
    // console.error(e);
    return null;
  }
}

apiService.createPost = async (formData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

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
        'authorization': `Bearer ${accessToken}`,
      },
    });
    const posts = await res.json();
    return posts;
  } catch (e) {
    console.error(e);
    return [];
  }
};

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
        'authorization': `Bearer ${accessToken}`,
      },
    });
    const users = await res.json();
    // console.log('nativespeaker api', users);
    return users;
  } catch (e) {
    console.error(e);
    return [];
  }
};

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
        'authorization': `Bearer ${accessToken}`,
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
        'authorization': `Bearer ${accessToken}`
      },
    });
    const data = await res.json();
    // console.log(data);
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
        'authorization': `Bearer ${accessToken}`
      },
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (e) {
    console.log('error unfollow', e);
    return e;
  }
};

apiService.getFollowingPosts = async () => {
  try {
    const url = `${BASE_URL}/followingPosts`;
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`,
      },
    });
    const posts = await res.json();
    // console.log(posts);
    return posts;
  } catch (e) {
    console.error(e);
    return []
  }
}

export default apiService;