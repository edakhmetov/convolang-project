const BASE_URL = 'http://localhost:3001';

type registerForm = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  learningLanguages: string,
  nativeLanguages: string,
};

type loginForm = {
  username: string,
  password: string,
};

type createPostForm = {
  content: string,
};

type createCommentForm = {
  content: string
}

const register = async (formData: registerForm) => {
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

const login = async (formData: loginForm) => {
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

const logout = async () => {
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

const createPost = async (formData: createPostForm) => {
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

const getUserPosts = async () => {
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

const getNativeSpeakers = async () => {
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

const getLearningSpeakers = async () => {
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

const followUser = async (id: number) => {
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

const unfollowUser = async (id: number) => {
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

const getUserInfo = async (id?: number ) => {
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


const getPost = async (id: number) => {
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

const createComment = async (formData: createCommentForm, id: number)=> {
  const accessToken = localStorage.getItem('accessToken')
  try {
    const url = `${BASE_URL}/comment/${id}`;
      await fetch(url, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type' : 'application/json',
        'authorization' : `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData)
    });
    } catch(e) {
    console.error(e)
  }
}


const apiService = {
  login,
  register,
  logout,
  followUser,
  unfollowUser,
  createPost,
  getPost,
  getUserInfo,
  getUserPosts,
  getLearningSpeakers,
  getNativeSpeakers,
  createComment
  }
  


export default apiService;