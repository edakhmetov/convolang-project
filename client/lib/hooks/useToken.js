import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem('accessToken');
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
