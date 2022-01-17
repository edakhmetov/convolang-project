const apiService = {};

apiService.register = async (formData) => {
  try {
    const res = await fetch('http://localhost:3001/register', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log('from the register api', data);
    return data;
  } catch(e) {
    console.log(e);
    // console.log(data);
    return e;
  }
};

apiService.login = async (formData) => {
  try {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    console.log('from the api', res);
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    setIsLoggedIn(true);
    return data;
  } catch(e) {
    console.log(e);
    // console.log(data);
    return e;
  }
};

export default apiService;